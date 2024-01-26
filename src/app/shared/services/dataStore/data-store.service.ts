import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenDTO } from '../../models/DTO/tokenDTO';
import { ProjectDTO } from '../../models/DTO/projectDTO';
import { ProjectContext } from '../../models/models/projectContext';
import { ComponentTree } from '../../models/models/componentTree';
import { projectTree } from '../../models/models/projectTree';
import { ComponentTreeElement } from '../../models/models/componentTreeElement';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  //SESSION SERVICE VARIABLES
  public currentUser : TokenDTO | undefined;
  public userId: number | undefined;
  public isConnected!: Boolean;

  public currentUser$: BehaviorSubject<TokenDTO | undefined> = new BehaviorSubject<TokenDTO | undefined>(undefined);
  public userId$: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  public isConnected$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  //PROJECT SERVICE VARIABLES
  public projects: ProjectDTO[] | undefined;
  public projects$: BehaviorSubject<ProjectDTO[] | undefined> = new BehaviorSubject<ProjectDTO[] | undefined>(undefined);
  public activeProject$: BehaviorSubject<ProjectDTO | undefined> = new BehaviorSubject<ProjectDTO | undefined>(undefined);

  //COMPONENT SERVICE VARIABLES
  public projectTree: ComponentTree | undefined;
  public projectTree$: BehaviorSubject<ComponentTree | undefined> = new BehaviorSubject<ComponentTree | undefined>(undefined);
  public projectTreeMainFolderLoaded$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor() {}

  //SESSION SERVICE VARIABLES SETTERS
  setCurrentUser(user : TokenDTO | undefined)
  {
    this.currentUser = user
    this.currentUser$.next(this.currentUser);
  }

  setUserId(id: number | undefined)
  {
    this.userId = id;
    this.userId$.next(this.userId);
  }

  setIsConnected(state: Boolean)
  {
    this.isConnected = state;
    this.isConnected$.next(this.isConnected);
  }

  //PROJECT SERVICE VARIABLES SETTERS
  setProjects(projects: ProjectDTO[] | undefined)
  {
    this.projects = projects;
    this.projects$.next(this.projects);

  }

  //PROJECT SERVICE VARIABLES SETTERS
  setProjectTree(projectTree: ComponentTree | undefined)
  {
    this.projectTree = projectTree;
    this.projectTree$.next(this.projectTree);

  }
}
