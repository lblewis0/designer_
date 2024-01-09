import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from '../../shared/models/DTO/loginDTO';
import { SessionService } from '../../shared/services/authentification/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  userNameValid: boolean = true;
  passwordValid: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _sessionService: SessionService
  ){
    this.loginForm = this._formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("LoginComponent.onSubmit()");
    if(this.loginForm.valid)
    {
      console.log("-this.loginForm.valid");
      let dto: LoginDTO = this.loginForm.value;
      
      this._sessionService.login(dto);

      this.userNameValid = this._sessionService.usernameValid;
      this.passwordValid = this._sessionService.passwordValid;
    }
    else
    {
      console.log("-!this.loginForm.valid");
    }

  }

}
