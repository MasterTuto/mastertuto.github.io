import { inject, Type } from "@angular/core";


import { DialogService } from "../components/@my/dialogs/dialog.service";
import { DialogController, DialogData, DialogOutput, DialogRef } from "../components/@my/dialogs/dialog.model";
import { Subject } from "rxjs";



export const dialog = <T>(component: Type<T>): DialogController<T> => {
  const dialogService = inject(DialogService);

  let originalRef: DialogRef<T> | null = null;

  const onClosed$ = new Subject<DialogOutput<T>>();
  const dialogRef: DialogRef<T> = {
    onClosed$,
    close: (data: DialogOutput<T>) => {
      if (originalRef) {
        originalRef.close(data);
        onClosed$.next(data);
        onClosed$.complete();
        originalRef = null;
        return;
      }
    }
  }

  const dialogController: DialogController<T> = {
    open: (data: DialogData<T>) => {
      if (originalRef) {
        return originalRef.onClosed$;
      }
      originalRef = dialogService.open(component, {
        data,
        config: {
          height: '100dvh',
          width: '100dvw',
          margin: '0px',
        }
      });
      originalRef.onClosed$.subscribe(() => {
        originalRef = null;
        onClosed$.next(data);
        onClosed$.complete();
      });
      return originalRef.onClosed$;
    },

    ...dialogRef
  }

  return dialogController;
}
