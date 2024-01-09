import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDTO } from '../../models/DTO/loginDTO';
import { HttpClient } from '@angular/common/http';
import { TokenDTO } from '../../models/DTO/tokenDTO';
import { Router } from '@angular/router';
import { ErrorMessageDTO } from '../../models/DTO/errorMessageDTO';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _currentUser: BehaviorSubject<TokenDTO | undefined>

  usernameValid: boolean = true;
  passwordValid: boolean = true;

  constructor(private readonly http: HttpClient, private router: Router) 
  {
    this._currentUser = new BehaviorSubject<TokenDTO | undefined>(undefined);
    
    let json = localStorage.getItem("currentUser");
    if(json)
    {
      this._currentUser.next(JSON.parse(json));
    }
  }

  get currentUser(): TokenDTO | undefined {
    return this._currentUser.value;
  }

  get currentUser$() : Observable<TokenDTO | undefined>{
    return this._currentUser.asObservable();
  }

  login(dto: LoginDTO) {

    console.log("SessionService.login(dto: LoginDTO)");
    console.log("Http request: https://localhost:7043/api/Authentification/login, dto");
    console.log(dto);

    return this.http.post("https://localhost:7043/api/Authentification/login", dto).subscribe({
      next: (result: any) => {
        let resultDTO: TokenDTO = result;
        this._currentUser.next(resultDTO);
        this.usernameValid = true;
        this.passwordValid = true;
        localStorage.setItem("currentUser", JSON.stringify(resultDTO));
        console.log(resultDTO);
      },
      error: (error) => {
        let errorMesssage: ErrorMessageDTO = error;
        if(errorMesssage.message === "userNotFound"){
          this.usernameValid = false;
        }

        if(errorMesssage.message === "wrongPassword"){
          this.passwordValid = false;
        }
        console.log(error);
      }
    })

    this.router.navigate(["home"]);
  }

  logout() : void {
    this._currentUser.next(undefined);
    localStorage.removeItem("currentUser");
    this.router.navigate(["login"]);
  }
}
