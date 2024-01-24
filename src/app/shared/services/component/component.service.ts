import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponentContext } from '../../models/models/componentContext';
import { ComponentTree } from '../../models/models/componentTree';
import { ProjectDTO } from '../../models/DTO/projectDTO';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../authentification/session.service';
import { ProjectService } from '../project/project.service';
import { ComponentTreeElement } from '../../models/models/componentTreeElement';
import { FolderDTO } from '../../models/DTO/folderDTO';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  public _context: ComponentContext | undefined;
  public _contextComponent: ComponentTreeElement | undefined;

  public _projectTree: ComponentTree = {
    elements: []
  }

  constructor(
    private readonly http: HttpClient,
    public _sessionService: SessionService,
    public _projectService: ProjectService) {
    }

  activeContext(top: number, left: number, idComponent: number, type: string, component: ComponentTreeElement){
    let context: ComponentContext = {
      isActive: true,
      top: top,
      left: left,
      componentId: idComponent,
      type: type
    }

    this._context = context;
    this._contextComponent = component;
    console.log("");
    console.log("ComponentService.activeContext()");
    console.log(this._context);
    console.log(this._contextComponent);

  }

  desactivateContext()
  {
    let context: ComponentContext = {
      isActive: false,
      top: 0,
      left: 0,
      componentId: this._context!.componentId,
      type: this._context!.type
    }
    this._context = context;
    this._contextComponent = undefined;
    console.log("")
    console.log("ComponentService.desactivateContext()");
    console.log(this._context);
    console.log(this._contextComponent);
  }

  initComponentTree(){

    //crée un ComponentTreeElement à partir du MainFolder;
    //récupérer un FolderDTO depuis getMainFolderByProjectId();
    //checker si ce FolderDTO à des enfants;
    //si oui, crée un ComponentTreeElement avec le resultat des enfants;
    //puis push le resultat dans this._projectTree.elements[0];

    let mainFolder = this.getMainFolderByProjectId();

    let children = this.getFoldersByParentFolderId(mainFolder as FolderDTO, 0);

    if(children !== undefined && children?.length > 0)
    {
        
    }


  }

  getMainFolderByProjectId() : FolderDTO | undefined
  {
    let dto: ProjectDTO | undefined = this._projectService.getActiveProject();

    if(dto !== undefined)
    {
      console.log("")
      console.log("ComponentService.getFolderByProjectId(dto: ProjectDTO)");
      console.log("Http request: https://localhost:7241/api/Folder/getFolderByProjectId, dto");
      console.log(dto);

      let folder: FolderDTO | undefined = undefined;
  
      this.http.post<ProjectDTO>("https://localhost:7241/api/Folder/getFolderByProjectId", dto)
      .subscribe((result: any) => {
        folder = result;
        console.log(folder);
      });

      return folder;
    }  

    return undefined;
    
  }

  getFoldersByParentFolderId(folder: FolderDTO, indent: number) : ComponentTreeElement[] | undefined {
    console.log("")
    console.log("ComponentService.getFoldersByParentFolderId(folder: FolderDTO)");
    console.log("Http request: https://localhost:7241/api/Folder/getFoldersByParentFolder, folder");
    console.log(folder);

    //Je dois convertir chaque element de la liste en ComponentTreeElement
    let list: FolderDTO[] | undefined = undefined
    let newList: ComponentTreeElement[] | undefined = undefined;
  
    this.http.post<FolderDTO>("https://localhost:7241/api/Folder/getFoldersByParentFolder", folder)
    .subscribe((result: any) => {
        console.log("Http request response: success");
        console.log(result);
        list = result;

        if(list !== undefined)
        {
          for(let i=0; i < list.length; i++)
          {
            let folder: FolderDTO = list[i];
          }
        } 
    });

    return list;
  }

  addFolder() : void {

    let date: Date = new Date();

    let newComponent: ComponentTreeElement = {
      id: 0,
      name: "new folder",
      creationDate: date.toISOString(),
      lastUpdateDate: date.toISOString(),
      projectId: this._contextComponent!.projectId,
      parentFolderId: this._contextComponent!.id,
      isEditable: true,
      isSelected: true,
      isExpanded: false,
      indent: this._contextComponent!.indent + 1,
      type: "folder",
      children: []
    }

    let newFolder: FolderDTO = {
      id: 0,
      name: newComponent.name,
      creationDate: newComponent.creationDate,
      lastUpdateDate: newComponent.lastUpdateDate,
      projectId: newComponent.projectId,
      parentFolderId: newComponent.parentFolderId,
      isEditable: newComponent.isEditable,
      isSelected: newComponent.isSelected,
      isExpanded: newComponent.isExpanded
    }

    let mainFolder: FolderDTO = {
      id: this._projectTree.elements[0].id,
      name: this._projectTree.elements[0].name,
      creationDate: this._projectTree.elements[0].creationDate,
      lastUpdateDate: this._projectTree.elements[0].lastUpdateDate,
      projectId: this._projectTree.elements[0].projectId,
      parentFolderId: this._projectTree.elements[0].parentFolderId,
      isEditable: this._projectTree.elements[0].isEditable,
      isSelected: this._projectTree.elements[0].isSelected,
      isExpanded: this._projectTree.elements[0].isExpanded
    }

    this.desactivateContext();

    console.log("")
    console.log("ComponentService.addFolder(dto: FolderDTO)");
    console.log("Http request: https://localhost:7241/api/Folder/createFolder, dto");
    console.log(newFolder);
  
    this.http.post<FolderDTO>("https://localhost:7241/api/Folder/createFolder", newFolder)
    .subscribe((result: any) => {
        console.log("Http request response: success");
    });

  }

  addComponent() : void {
    console.log("");
    console.log("ComponentService.addComponent()");
  }
}
