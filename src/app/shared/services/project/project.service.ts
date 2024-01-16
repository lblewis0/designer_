import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectDTO } from '../../models/DTO/projectDTO';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDTO } from '../../models/DTO/userDTO';
import { TokenDTO } from '../../models/DTO/tokenDTO';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProjectContext } from '../../models/models/projectContext';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public _projects: ProjectDTO[] | undefined;
  public _context: ProjectContext | undefined;

  constructor(
    private readonly http: HttpClient
  ){  
    
  }

  activateContext(top: number, left: number, idProject: number)
  {
    let context: ProjectContext = {
      isActive: true,
      top: top,
      left: left,
      projectId: idProject
    }

    this._context = context;
    console.log("ProjectService.activateContext()");
    console.log(this._context);
  }

  desactivateContext()
  {
    let context: ProjectContext = {
      isActive: false,
      top: 0,
      left: 0,
      projectId: this._context!.projectId
    }

    this._context = context;
    console.log("ProjectService.desactivateContext()");
    console.log(this._context);
  }

  createProject(dto: ProjectDTO)
  {
    console.log("ProjectService.createProject(dto: ProjectDTO)");
    console.log("Http request: https://localhost:7241/api/Project/createProject, dto");
    console.log(dto);

    this.http.post<ProjectDTO>("https://localhost:7241/api/Project/createProject", dto);
  }

  getProjects(token: TokenDTO | undefined)
  {
    console.log("ProjectService.getProjects(token: TokenDTO)");
    console.log("Http request: https://localhost:7241/api/Project/getProjects, token");
    console.log(token);

    this.http.post<TokenDTO>("https://localhost:7241/api/Project/getProjects", token)
    .subscribe((result: any) => {
      this._projects = result;
      console.log("Http request service: success");
      console.log(this._projects);
    });
  }
}
