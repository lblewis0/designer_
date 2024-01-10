import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../../models/DTO/loginDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  login(dto: LoginDTO){
    return this.http.post("https://localhost:7241/api/Authentification/login", dto);
  }
}
