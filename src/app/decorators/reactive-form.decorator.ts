import 'reflect-metadata';
import {FormBuilder} from '@angular/forms';
import {Type} from '@angular/core';
import {CONTROL_DECORATOR} from './reactive-control.decorator';
import {AbstractForm} from '../abstract/abstract-form';

function decorateProvider<T>(type: Type<T>): void {
  const _controls = Reflect.getOwnMetadata(CONTROL_DECORATOR, type.prototype);
  type.prototype.formGroup = new FormBuilder().group(_controls);
}

export function ReactiveForm() {
  return function<T extends AbstractForm<T>>(cls: new () => T): new () => T {
    decorateProvider(cls);
    return cls;
  }
}







