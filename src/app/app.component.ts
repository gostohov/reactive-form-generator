import {Component} from '@angular/core';
import {User} from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reactive-form-generator';

  constructor() {
    const user = new User();
    user.formGroup.valueChanges.subscribe();
    user.formGroup.controls.id.valueChanges.subscribe();
  }
}
