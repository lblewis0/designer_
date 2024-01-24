import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectDTO } from '../../models/DTO/projectDTO';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDTO } from '../../models/DTO/userDTO';
import { TokenDTO } from '../../models/DTO/tokenDTO';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProjectContext } from '../../models/models/projectContext';
import { Project } from '../../models/models/project';
import { SessionService } from '../authentification/session.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public _projects: ProjectDTO[] | undefined;
  public _context: ProjectContext | undefined;
  public _deleteWarning: Boolean = false;

  constructor(
    private readonly http: HttpClient,
    public _sessionService: SessionService
  ){}

  activateContext(top: number, left: number, idProject: number)
  {
    let context: ProjectContext = {
      isActive: true,
      top: top,
      left: left,
      projectId: idProject
    }

    this._context = context;
    console.log("")
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
    console.log("")
    console.log("ProjectService.desactivateContext()");
    console.log(this._context);
  }

  createProject(dto: ProjectDTO)
  {
    console.log("")
    console.log("ProjectService.createProject(dto: ProjectDTO)");
    console.log("Http request: https://localhost:7241/api/Project/createProject, dto");
    console.log(dto);

    this.http.post<ProjectDTO>("https://localhost:7241/api/Project/createProject", dto).subscribe({
      next: (result: any) => {
        console.log("Http request service: success");
        this.getProjects(this._sessionService._currentUser);
        this._sessionService._currentUser!.userDTO = result;
        console.log(result);
      }
    });

  }

  getProjects(token: TokenDTO | undefined)
  {
    console.log("")
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

  getActiveProject() : ProjectDTO | undefined
  {
    console.log("")
    console.log("ProjectService.getActiveProject()");
    if(this._projects !== undefined)
    {
      let project: ProjectDTO | undefined = undefined;

      for(let i=0; i < this._projects.length; i++)
      {
        let indProject = this._projects[i];

        if(indProject.id === this._sessionService._currentUser?.userDTO.activeProjectId)
        {
          project = indProject;
        }
      }

      return project
    }
    else
    {
      return undefined;
    }
  }

  renameProject(dto: ProjectDTO)
  {
    console.log("")
    console.log("ProjectService.renameProject(dto: ProjectDTO)");
    console.log("Http request: https://localhost:7241/api/Project/renameProject, dto");
    console.log(dto);

    this.http.post<ProjectDTO>("https://localhost:7241/api/Project/renameProject", dto).subscribe({
      next: (result: any) => {
        console.log("Http request service: success");
        this.getProjects(this._sessionService._currentUser);
      }
    });
  }

  deleteProject(dto: ProjectDTO)
  {
    console.log("")
    console.log("ProjectService.deleteProject(dto: ProjectDTO)");
    console.log("Http request: https://localhost:7241/api/Project/deleteProject, dto");
    console.log(dto);

    this.http.post<ProjectDTO>("https://localhost:7241/api/Project/deleteProject", dto).subscribe({
      next: (result: any) => {
        console.log("Http request service: success");
        this.getProjects(this._sessionService._currentUser);
      }
    });
  }
}
