import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDTO } from '../../models/DTO/loginDTO';
import { HttpClient } from '@angular/common/http';
import { TokenDTO } from '../../models/DTO/tokenDTO';
import { Router } from '@angular/router';
import { ErrorMessageDTO } from '../../models/DTO/errorMessageDTO';
import { ComponentService } from '../component/component.service';
import { DataStoreService } from '../dataStore/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public _currentUser: TokenDTO | undefined; //dependOn BehaviorSubject
  public _userId: number | undefined; //dependOn BehaviorSubject
  public _isConnected!: Boolean; //dependOn BehaviorSubject

  public _usernameValid = true;
  public _passwordValid = true;

  constructor(
    private readonly http: HttpClient, 
    private router: Router,
    public dataStore: DataStoreService) 
  { 
    this.dataStore.currentUser$.subscribe((value: TokenDTO | undefined) => {
      this._currentUser = value;
    });

    this.dataStore.userId$.subscribe((value: number | undefined) => {
      this._userId = value;
    });

    this.dataStore.isConnected$.subscribe((value: Boolean) => {
      this._isConnected = value;
    });

    let json = localStorage.getItem("currentUser");
    if(json)
    {
      let user = JSON.parse(json);
      this.dataStore.setCurrentUser(user);
      this.dataStore.setUserId(user.id);
      this.dataStore.setIsConnected(true);
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

        this.dataStore.setCurrentUser(tokenDTO); 
        this.dataStore.setUserId(tokenDTO.userDTO.id);
        this.dataStore.setIsConnected(true);

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

    this.dataStore.setCurrentUser(dto);

    this.http.post<TokenDTO>("https://localhost:7241/api/User/updateActiveProject", dto)
    .subscribe((result: any) => {
      console.log("Http request service: success");
    });
  }

  logout() : void {
    this.dataStore.setCurrentUser(undefined);
    this.dataStore.setUserId(undefined);
    this.dataStore.setIsConnected(false);
    localStorage.removeItem("currentUser");
    this.router.navigate(["login"]);
  }
}
