import {AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';
import {ControlState} from '../models/control-state';

export type ControlConfig<T> = [ControlState<T>, (ValidatorFn | ValidatorFn[] | AbstractControlOptions)?, (AsyncValidatorFn | AsyncValidatorFn[])?];

export const CONTROL_DECORATOR: unique symbol = Symbol('__controlDecorator');

function registerControl<T>(
  target: Object, propertyKey: string | symbol, config: ControlConfig<T> = [undefined]
): AbstractControl {
  const controls = Reflect.getOwnMetadata(CONTROL_DECORATOR, target) || {};
  if (!controls[propertyKey]) {
    controls[propertyKey] = new FormControl(...config);
  }
  Reflect.defineMetadata(CONTROL_DECORATOR, controls, target);
  return controls[propertyKey];
}

function definePropertyAccessors<T>(target: Object, propertyKey: string | symbol, control: AbstractControl): void {
  const getter = () => control.value;
  const setter = (value) => control.setValue(value);
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

export function Control<T>(config?: ControlConfig<T>): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const control = registerControl(target, propertyKey, config);
    definePropertyAccessors(target, propertyKey, control);
  }
}
