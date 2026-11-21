import { InjectionToken } from "@angular/core"
import { Observable } from "rxjs"
import { DialogOpenParams } from "./dialog.service"

type Values<T> = T[keyof T]

export type Brand<T> = { __brand: T }

export type PickTyped<T, PV extends Record<string, any>> = Values<{
  [K in keyof T as T[K] extends PV ? K : never]: T[K]
}>;

export type BrandDialogOutput<T> = Brand<'__dialogOutput'> & T
export type DialogOutput<T> = Omit<PickTyped<T, Brand<'__dialogOutput'>>, '__brand'>

export type BrandDialogParams<T> = Brand<'__dialogData'> & T
export type DialogData<T> = Omit<PickTyped<T, Brand<'__dialogData'>>, '__brand'>

export type OpenDialog<T> = Observable<DialogOutput<T>>

export interface DialogRef<T> {
  onClosed$: Observable<DialogOutput<T>>;
  close: (data: DialogOutput<T>) => void;
}

export interface DialogController<T> {
  open: (data: DialogData<T>, config?: DialogOpenParams<T>['config']) => OpenDialog<T>;
  close: (data: DialogOutput<T>) => void;
}

export class Dialog<Params, Output> {
  params!: BrandDialogParams<Params>
  output!: BrandDialogOutput<Output>
}

export const DIALOG_DATA = new InjectionToken<DialogData<any>>('__dialogData');
export const DIALOG_REF = new InjectionToken<DialogRef<any>>('__dialogRef');
