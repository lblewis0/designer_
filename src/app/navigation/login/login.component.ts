import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from '../../shared/models/DTO/loginDTO';
import { SessionService } from '../../shared/services/authentification/session.service';
import { TokenDTO } from '../../shared/models/DTO/tokenDTO';
import { Router } from '@angular/router';
import { ErrorMessageDTO } from '../../shared/models/DTO/errorMessageDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  usernameValid: boolean = true;
  passwordValid: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _sessionService: SessionService,
    private _router: Router
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
      
      this._sessionService.login(dto).subscribe({
        next: (result: TokenDTO) => {
          this.usernameValid = true;
          this.passwordValid = true;
          this._router.navigate(["home"]);
        },
        error: (error: any) => {
          let errorMesssage: ErrorMessageDTO = error.error;
          console.log("Http error: " + errorMesssage.message);

          this.usernameValid = true;
          this.passwordValid = true;
          
          if(errorMesssage.message === "userNotFound"){
          this.usernameValid = false;
          }

          if(errorMesssage.message === "wrongPassword"){
          this.passwordValid = false;
          }
        }
      });

    }
    else
    {
      console.log("-!this.loginForm.valid");
    }

  }

}
