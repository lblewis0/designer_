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

  public _currentUser: TokenDTO | undefined;
  public _userId: number | undefined;

  constructor(private readonly http: HttpClient, private router: Router) 
  {   
    let json = localStorage.getItem("currentUser");
    if(json)
    {
      this._currentUser = JSON.parse(json);
    }
  }

  login(dto: LoginDTO) {

    console.log("SessionService.login(dto: LoginDTO)");
    console.log("Http request: https://localhost:7241/api/Authentification/login, dto");
    console.log(dto);

    this.http.post<TokenDTO>("https://localhost:7241/api/Authentification/login", dto)
    .subscribe((tokenDTO: TokenDTO) => {
      this._currentUser = tokenDTO;
      localStorage.setItem("currentUser", JSON.stringify(tokenDTO));
      console.log("Http request: success");
      console.log(tokenDTO);
    });

  }

  updateActiveProject(dto: TokenDTO){
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
    localStorage.removeItem("currentUser");
    this.router.navigate(["login"]);
  }
}
