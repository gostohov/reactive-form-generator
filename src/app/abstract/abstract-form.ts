import {IFormGroup} from '../models/i-form-group';

export abstract class AbstractForm<T extends object> {
  formGroup: IFormGroup<T>;
}
