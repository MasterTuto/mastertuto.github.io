import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";

export type ButtonVariant = "cta";

@Component({
  selector: "a[myButton], button[myButton]",
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "buttonStyle()",
  }
})
export class ButtonComponent {
  variant = input.required<ButtonVariant>({
    alias: "myButton",
  });

  buttonStyle = computed(() => {
    switch (this.variant()) {
      case "cta":
        return "bg-primary text-primary-foreground rounded-xl px-6 py-3 border-2 border-primary-border shadow-[inset_1px_-1px_6px_0px_rgba(255,_255,_255,_0.05)] shadow-white/50 flex items-center gap-1";
      default:
        return "bg-white/10 px-3 py-1.5 text-sm transition-colors hover:bg-white/20 active:bg-white/30";
    }
  });
}
