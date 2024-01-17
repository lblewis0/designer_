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

  constructor(
    private _formBuilder: FormBuilder,
    public _sessionService: SessionService
  ){
    this.loginForm = this._formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    
    console.log("");
    console.log("LoginComponent.onSubmit()");
    if(this.loginForm.valid)
    {
      console.log("-this.loginForm.valid");
      let dto: LoginDTO = this.loginForm.value;
      
      this._sessionService.login(dto);
    }
    else
    {
      console.log("-!this.loginForm.valid");
    }

  }

}
