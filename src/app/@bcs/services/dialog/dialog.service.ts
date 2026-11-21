import { Subject } from "rxjs";
import { ApplicationRef, ComponentRef, createComponent, EmbeddedViewRef, EnvironmentInjector, inject, Injectable, Injector, Type } from "@angular/core";

import { DIALOG_DATA, DIALOG_REF, DialogData, DialogOutput, DialogRef, OpenDialog } from "./dialog.model";
import { CdkTrapFocus } from "@angular/cdk/a11y";


export type Unit = 'px';
export type UnitNumber = `${number}${Unit}`;

export interface DialogOpenParams<T> {
  data: DialogData<T>
  config: {
    height: string,
    width: string,
    margin: string,
  }
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private injector = inject(Injector);
  private environmentInjector = inject(EnvironmentInjector);
  private appRef = inject(ApplicationRef);
  private dialogs: Map<OpenDialog<any>, ComponentRef<any>> = new Map();

  open<T>(component: Type<T>, data: DialogOpenParams<T>): DialogRef<T> {
    const wrapper = this._buildDialogWrapper();
    const closeDialog$ = new Subject<DialogOutput<T>>();

    let componentRef: ComponentRef<any> | null = null;
    const dialogRef: DialogRef<T> = {
      onClosed$: closeDialog$,
      close: (data: DialogOutput<T>) => {
        closeDialog$.next(data);

        if (this.appRef.viewCount > 0 && componentRef?.hostView) {
          this.appRef.detachView(componentRef.hostView);
        }

        componentRef?.destroy();
        this.dialogs.delete(dialogRef.onClosed$);
        closeDialog$.complete();
        wrapper.remove();
      }
    }
    componentRef = createComponent(component, {
      environmentInjector: this.environmentInjector,
      elementInjector: Injector.create({
        providers: [
          { provide: DIALOG_REF, useValue: dialogRef },
          { provide: DIALOG_DATA, useValue: data.data },
        ],
        parent: this.injector,
      }),
      directives: [
        {
          type: CdkTrapFocus,
          bindings: []
        }
      ],

    });

    this.appRef.attachView(componentRef.hostView);

    const el = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    el.style.margin = data.config.margin;
    el.style.width = data.config.width;
    el.style.height = data.config.height;
    wrapper.appendChild(el);
    globalThis.window.document.body.appendChild(wrapper);

    return dialogRef;
  }

  close<T>(dialogRef: DialogRef<T>, data: DialogOutput<T>) {
    dialogRef.close(data);
  }

  private _buildDialogWrapper() {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.top = '0';
    wrapper.style.left = '0';
    wrapper.style.width = '100dvw';
    wrapper.style.height = '100dvh';
    wrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    wrapper.style.zIndex = '1000';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';

    return wrapper;
  }
}
