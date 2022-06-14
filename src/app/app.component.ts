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
    user.formGroup.valueChanges.subscribe(console.warn);
    user.formGroup.controls.id.valueChanges.subscribe(console.warn);
    user.id = 2;
  }
}
