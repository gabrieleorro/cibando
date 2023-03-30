import { Component } from '@angular/core';
import { faUserTie, faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  faUserTie = faUserTie;
  faAt = faAt;
  faKey = faKey;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    ripetiPassword: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.requiredTrue),
  });

  onSubmit() {
    console.log(this.form.value);
  }

}
