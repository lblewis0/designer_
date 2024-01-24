import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDTO } from '../../models/DTO/loginDTO';
import { HttpClient } from '@angular/common/http';
import { TokenDTO } from '../../models/DTO/tokenDTO';
import { Router } from '@angular/router';
import { ErrorMessageDTO } from '../../models/DTO/errorMessageDTO';
import { ComponentService } from '../component/component.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public _currentUser: TokenDTO | undefined;
  public _userId: number | undefined;
  public _isConnected!: Boolean;
  public _usernameValid = true;
  public _passwordValid = true;

  constructor(private readonly http: HttpClient, private router: Router) 
  {   
    let json = localStorage.getItem("currentUser");
    if(json)
    {
      this._currentUser = JSON.parse(json);
      this._isConnected = true;
      this._userId = this._currentUser?.userDTO.id;
    }
  }

  login(dto: LoginDTO) {

    console.log("")
    console.log("SessionService.login(dto: LoginDTO)");
    console.log("Http request: https://localhost:7241/api/Authentification/login, dto");
    console.log(dto);

    this.http.post<TokenDTO>("https://localhost:7241/api/Authentification/login", dto)
    .subscribe({
      next: (tokenDTO: TokenDTO) => {
        this._currentUser = tokenDTO;
        this._isConnected = true;
        this._userId = tokenDTO.userDTO.id;
        this._usernameValid = true;
        this._passwordValid = true;
        localStorage.setItem("currentUser", JSON.stringify(tokenDTO));
        console.log("Http request: success");
        console.log(tokenDTO);
        this.router.navigate(["home"]);
      },
      error: (error: any) => {
        let errorMessage: ErrorMessageDTO = error.error;
        console.log("Http error: " + errorMessage.message);

          this._usernameValid = true;
          this._passwordValid = true;
          
          if(errorMessage.message === "userNotFound"){
          this._usernameValid = false;
          }

          if(errorMessage.message === "wrongPassword"){
          this._passwordValid = false;
          }

      }   
    });

  }

  updateActiveProject(dto: TokenDTO){
    console.log("")
    console.log("SessionService.updateActiveProject(dto: TokenDTO)");
    console.log("Http request: https://localhost:7241/api/User/updateActiveProject, dto");
    console.log(dto);

    this._currentUser = dto;

    this.http.post<TokenDTO>("https://localhost:7241/api/User/updateActiveProject", dto)
    .subscribe((result: any) => {
      console.log("Http request service: success");
    });
  }

  logout() : void {
    this._currentUser = undefined;
    this._isConnected = false;
    this._userId = undefined;
    localStorage.removeItem("currentUser");
    this.router.navigate(["login"]);
  }
}
