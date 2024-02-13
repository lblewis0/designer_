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
  public activeProject: ProjectDTO | undefined;
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

  setProject(project: ProjectDTO)
  {
    for(let proj of this.projects!)
    {
      if(proj.id === project.id)
      {
        proj = project;
      }
    }
    this.projects$.next(this.projects);
  }

  setActiveProject(project: ProjectDTO)
  {
    console.log("DatastoreService.setActiveProject()");
    this.activeProject = project;
    this.activeProject$.next(this.activeProject);
    console.log(this.activeProject);
  }

  //COMPONENT SERVICE VARIABLES SETTERS AND GETTERS
  setProjectTree(projectTree: ComponentTree | undefined)
  {
    this.projectTree = projectTree;
    this.projectTree$.next(this.projectTree);
  }

  getComponentTreeElementById(id: number) {
    
    if(this.projectTree)
    {
      for(const rootElement of this.projectTree.elements)
      {
        const result: any = this.getComponentTreeElementByIdRecursive(id, rootElement);
        if(result){
          return result;
        }
      }
    }
    
  }

  getComponentTreeElementByIdRecursive(id: number, component: ComponentTreeElement) {

    if(component.id === id){
      return component;
    }

    for(const child of component.children){
      const result: any = this.getComponentTreeElementByIdRecursive(id, child);
      if(result){
        return result
      }
    }

    return undefined;

  }

  setComponentTreeElementById(id: number, inputComponent: ComponentTreeElement)
  {
    console.log("DataStoreService.setComponentTreeElementById(id: number, inputComponent: ComponentTreeElement)");
    
    if(this.projectTree)
    {
      for(const rootElement of this.projectTree.elements)
      {
        this.setComponentTreeElementByIdRecursive(id, rootElement, inputComponent);
      }

      console.log("DataStoreService.projectTree$.next(this.projectTree)")
      this.projectTree$.next(this.projectTree);
    }
  }

  setComponentTreeElementByIdRecursive(id: number, component: ComponentTreeElement, inputComponent: ComponentTreeElement) {

    if(component.id === id){
      component = inputComponent;
      console.log("ComponentTreeElement changed():");
      console.log(component);
      return;
    }

    for(const child of component.children){
      this.setComponentTreeElementByIdRecursive(id, child, inputComponent);
    }

  }

  getComponentTreeParentsId(id: number) : number[]
  {
    let ids: number[] = [];

    let component: ComponentTreeElement = this.getComponentTreeElementById(id);

    if(component.parentFolderId !== 0)
    {
      ids.push(component.parentFolderId);
      ids.push(...this.getComponentTreeParentsId(component.parentFolderId));
    }
    return ids;
  }


}
