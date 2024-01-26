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
import { ComponentService } from '../component/component.service';
import { DataStoreService } from '../dataStore/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public _projects: ProjectDTO[] | undefined; //DependOn BehaviorSubject

  public _context: ProjectContext | undefined; //DependOn BehaviorSubject
  public _deleteWarning: Boolean = false; //DependOn BehaviorSubject

  constructor(
    private readonly http: HttpClient,
    public _sessionService: SessionService,
    public dataStore: DataStoreService
  ){
    this.dataStore.projects$.subscribe((value: ProjectDTO[] | undefined) => {
      this._projects = value;
    })
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
        this.getProjects(this.dataStore.currentUser);

        let _token = this.dataStore.currentUser!.token;
        let newUser: TokenDTO = {
          token: _token,
          userDTO: result
        }

        this.dataStore.setCurrentUser(newUser);
        console.log(result);
      }
    });

  }

  getProjects(token: TokenDTO | undefined)
  {
    console.log("ProjectService.getProjects(token: TokenDTO)");
    console.log("Http request: https://localhost:7241/api/Project/getProjects, token");
    console.log(token);

    this.http.post<TokenDTO>("https://localhost:7241/api/Project/getProjects", token)
    .subscribe((result: any) => {

      this.dataStore.setProjects(result);
      console.log("Http request service: success");
      console.log(this._projects);
    });

  }

  getActiveProject() : ProjectDTO | undefined
  {
    console.log("ProjectService.getActiveProject()");
    if(this._projects !== undefined)
    {
      let project: ProjectDTO | undefined = undefined;

      for(let i=0; i < this._projects.length; i++)
      {
        let indProject = this._projects[i];

        if(indProject.id === this.dataStore.currentUser?.userDTO.activeProjectId)
        {
          project = indProject;
        }
      }

      console.log(project);
      return project
    }
    else
    {
      console.log("--active project not found");
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
        this.getProjects(this.dataStore.currentUser);
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
        this.getProjects(this.dataStore.currentUser);
      }
    });
  }
}
