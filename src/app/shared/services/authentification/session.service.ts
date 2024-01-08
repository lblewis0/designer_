import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginDTO } from '../../models/DTO/loginDTO';
import { HttpClient } from '@angular/common/http';
import { TokenDTO } from '../../models/DTO/tokenDTO';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _currentUser: BehaviorSubject<TokenDTO | undefined>

  constructor(
    private readonly http: HttpClient,
    private router: Router) {
    this._currentUser = new BehaviorSubject<TokenDTO | undefined>(undefined);
  }

  get currentUser(): TokenDTO | undefined {
    return this._currentUser.value;
  }

  get currentUser$() : Observable<TokenDTO | undefined>{
    return this._currentUser.asObservable();
  }

  login(dto: LoginDTO) : void {

    console.log("SessionService.login(dto: LoginDTO)");
    console.log("Http request: https://localhost:7043/api/Authentification/login, dto");
    console.log(dto);

    this.http.post("https://localhost:7043/api/Authentification/login", dto).subscribe({
      next: (result: any) => {
        let resultDTO: TokenDTO = result;
        this._currentUser.next(resultDTO);
        console.log(resultDTO);
      },
      error: (error) => {
        console.log(error);
      }
    })

    this.router.navigate(["home"]);

  }

  logout() : void {
    this._currentUser.next(undefined);
    this.router.navigate(["login"]);
  }
}
