import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectDTO } from '../../models/DTO/projectDTO';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDTO } from '../../models/DTO/userDTO';
import { TokenDTO } from '../../models/DTO/tokenDTO';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _projects: BehaviorSubject<ProjectDTO[] | undefined>
  private _contextActive: BehaviorSubject<Boolean>

  constructor(
    private readonly http: HttpClient
  ){  
    this._projects = new BehaviorSubject<ProjectDTO[] | undefined>(undefined);
    this._contextActive = new BehaviorSubject<Boolean>(false);
  }

  get projects(): ProjectDTO[] | undefined {
    return this._projects.value;
  }

  get projects$(): Observable<ProjectDTO[] | undefined>{
    return this._projects.asObservable();
  }

  get contextActive(): Boolean {
    return this._contextActive.value;
  }

  get contextActive$(): Observable<Boolean>{
    return this._contextActive.asObservable();
  }

  activateContext()
  {
    this._contextActive.next(true);
  }

  desactivateContext()
  {
    this._contextActive.next(false);
  }

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

    return this.http.post<TokenDTO>("https://localhost:7241/api/Project/getProjects", token)
    .pipe(tap((result: any) => {
      this._projects.next(result);
      console.log("Http request service: success");
      console.log(result);
    }));
  }
}
