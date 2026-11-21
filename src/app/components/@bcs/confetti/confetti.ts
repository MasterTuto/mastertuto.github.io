import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
  shape: 0 | 1;
}

/** Roles the confetti is painted with, read from the current theme. */
const ROLES = ['accent', 'tertiary', 'success', 'primary', 'secondary'];
const DURATION = 2600;

/**
 * Celebration burst for wins. Dependency-free canvas overlay that paints with the page's own role
 * colors, ignores pointer events, is hidden from assistive tech and does nothing under
 * `prefers-reduced-motion` or on the server.
 */
@Injectable({ providedIn: 'root' })
export class BcsConfetti {
  private document = inject(DOCUMENT);

  fire(origin?: HTMLElement | null): void {
    const view = this.document.defaultView;
    if (!view || view.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = this.document.createElement('canvas');
    canvas.className = 'bcs-confetti';
    canvas.setAttribute('aria-hidden', 'true');
    const ratio = view.devicePixelRatio || 1;
    canvas.width = view.innerWidth * ratio;
    canvas.height = view.innerHeight * ratio;
    this.document.body.appendChild(canvas);
    const context = canvas.getContext('2d');
    if (!context) return canvas.remove();
    context.scale(ratio, ratio);

    const style = view.getComputedStyle(origin ?? this.document.documentElement);
    const colors = ROLES.map((role) => style.getPropertyValue(`--color-${role}`).trim())
      .filter(Boolean)
      .map((channels) => `rgb(${channels})`);
    const box = origin?.getBoundingClientRect();
    const cx = box ? box.left + box.width / 2 : view.innerWidth / 2;
    const cy = box ? box.top + box.height / 3 : view.innerHeight / 3;

    const pieces: Piece[] = Array.from({ length: 140 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 9;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        size: 6 + Math.random() * 6,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)] ?? '#888',
        shape: Math.random() > 0.5 ? 1 : 0,
      };
    });

    const start = view.performance.now();
    const frame = (now: number) => {
      const elapsed = now - start;
      context.clearRect(0, 0, view.innerWidth, view.innerHeight);
      context.globalAlpha = Math.max(0, 1 - elapsed / DURATION);
      for (const piece of pieces) {
        piece.vy += 0.32;
        piece.vx *= 0.985;
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.rotation += piece.spin;
        context.save();
        context.translate(piece.x, piece.y);
        context.rotate(piece.rotation);
        context.fillStyle = piece.color;
        if (piece.shape) context.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
        else {
          context.beginPath();
          context.arc(0, 0, piece.size / 3, 0, Math.PI * 2);
          context.fill();
        }
        context.restore();
      }
      if (elapsed < DURATION) view.requestAnimationFrame(frame);
      else canvas.remove();
    };
    view.requestAnimationFrame(frame);
  }
}
