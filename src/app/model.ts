import {ReactiveForm} from './decorators/reactive-form.decorator';
import {Control} from './decorators/reactive-control.decorator';
import {Validators} from '@angular/forms';
import {AbstractForm} from './abstract/abstract-form';

@ReactiveForm()
export class User extends AbstractForm<User> {
  @Control([1, [Validators.required]])
  id: number;

  @Control()
  firstName: string;

  @Control()
  lastName: string;

  @Control()
  birthdayDate: Date;
}
