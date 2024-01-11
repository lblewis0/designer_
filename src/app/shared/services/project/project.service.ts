import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectDTO } from '../../models/DTO/projectDTO';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDTO } from '../../models/DTO/userDTO';
import { TokenDTO } from '../../models/DTO/tokenDTO';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private readonly http: HttpClient
  ){  } 

  createProject(dto: ProjectDTO)
  {
    console.log("ProjectService.createProject(dto: ProjectDTO)");
    console.log("Http request: https://localhost:7241/api/Project/createProject, dto");
    console.log(dto);

    return this.http.post<ProjectDTO>("https://localhost:7241/api/Project/createProject", dto);
  }

  getProjects(token: TokenDTO | undefined)
  {
    console.log("ProjectService.getProjects(token: TokenDTO)");
    console.log("Http request: https://localhost:7241/api/Project/getProjects, token");
    console.log(token);

    return this.http.post<TokenDTO>("https://localhost:7241/api/Project/getProjects", token);
  }
}
