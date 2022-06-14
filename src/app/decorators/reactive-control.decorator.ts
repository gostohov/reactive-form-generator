import {AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';
import {ControlState} from '../models/control-state';

export type ControlConfig<T> = [ControlState<T>, (ValidatorFn | ValidatorFn[] | AbstractControlOptions)?, (AsyncValidatorFn | AsyncValidatorFn[])?];

export const CONTROL_DECORATOR: unique symbol = Symbol('__controlDecorator');

function registerControl<T>(target: Object, propertyKey: string | symbol, config: ControlConfig<T> = [undefined]): void {
  const _controls = Reflect.getOwnMetadata(CONTROL_DECORATOR, target) || {};
  if (!_controls[propertyKey]) {
    _controls[propertyKey] = new FormControl(...config);
  }
  Reflect.defineMetadata(CONTROL_DECORATOR, _controls, target);
}

export function Control<T>(config?: ControlConfig<T>): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    registerControl(target, propertyKey, config);
  }
}
