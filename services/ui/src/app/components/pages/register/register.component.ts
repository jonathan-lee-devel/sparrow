import {Component} from '@angular/core';
import {RegisterService} from '../../../services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTermsAndConditions: boolean = false;

  constructor(private registerService: RegisterService) {
  }

  doRegister() {
    this.registerService.doRegister(
        this.email,
        this.firstName,
        this.lastName,
        this.password,
        this.confirmPassword,
        this.acceptTermsAndConditions,
    );
  }
}
