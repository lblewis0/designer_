import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { ComponentContext } from '../../models/models/componentContext';
import { ComponentTree } from '../../models/models/componentTree';
import { ProjectDTO } from '../../models/DTO/projectDTO';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../authentification/session.service';
import { ProjectService } from '../project/project.service';
import { ComponentTreeElement } from '../../models/models/componentTreeElement';
import { FolderDTO } from '../../models/DTO/folderDTO';
import { MapperDTOService } from '../mapper/mapper-dto.service';
import { ErrorMessageDTO } from '../../models/DTO/errorMessageDTO';
import { ComponentDTO } from '../../models/DTO/componentDTO';
import { DataStoreService } from '../dataStore/data-store.service';
import { projectTree } from '../../models/models/projectTree';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  public _context: ComponentContext | undefined;
  public _contextComponent: ComponentTreeElement | undefined;
  public isInit: Boolean = false;

  public _projectTree: ComponentTree | undefined = {
    elements: []
  } //DependOn BehaviorSubject

  constructor(
    private readonly http: HttpClient,
    public _sessionService: SessionService,
    public _projectService: ProjectService,
    private _mapper: MapperDTOService,
    public dataStore: DataStoreService) {

      this.dataStore.projects$.subscribe((value: ProjectDTO[] | undefined) => {
      })

      this.dataStore.projectTree$.subscribe((value: ComponentTree | undefined) => {
        this._projectTree = value;
      })

      this.dataStore.activeProject$.subscribe((value: ProjectDTO | undefined) => {
        this.initComponentTree();
      })

      let projTree: ComponentTree = {
        elements: []
      };

      this.dataStore.setProjectTree(projTree);
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

  async initComponentTree(){

    if(this.isInit === false)
    {
      console.log("");
      console.log("ComponentService.initComponentTree()");
      console.log("mainFolder:");
      let mainFolder: FolderDTO | undefined = await this.getMainFolderByProjectId()

      //Le main folder existe
      if(mainFolder !== undefined)
      {
        let mainComponent = this._mapper.folderDTOToElementTree(mainFolder, 0);
        mainComponent = await this.findFolderChildren(mainComponent);
        mainComponent = await this.findComponentChildren(mainComponent);

        let tempProjectTree: ComponentTree | undefined = this.dataStore.projectTree;

        if(tempProjectTree !== undefined)
        {
          tempProjectTree!.elements = [];
          tempProjectTree!.elements.push(mainComponent);
        }

        this.dataStore.projectTree$.next(tempProjectTree);
        console.log(this.dataStore.projectTree);
      
      }

      this.isInit = true;
    }
    
    
    
  }

  async getMainFolderByProjectId() : Promise<FolderDTO | undefined>
  {
    let dto: ProjectDTO | undefined = this._projectService.getActiveProject();

    if(dto !== undefined)
    {
      console.log("ComponentService.getFolderByProjectId(dto: ProjectDTO)");
      console.log("Http request: https://localhost:7241/api/Folder/getFolderByProjectId, dto");
      console.log(dto);
 
      return await firstValueFrom(this.http.post<FolderDTO>("https://localhost:7241/api/Folder/getFolderByProjectId", dto))
    }
    else
    {
      return undefined;
    }  
    
  }

  async getFoldersByParentFolder(folder: FolderDTO) : Promise<FolderDTO[] | undefined> {
    console.log("")
    console.log("ComponentService.getFoldersByParentFolderId(folder: FolderDTO)");
    console.log("Http request: https://localhost:7241/api/Folder/getFoldersByParentFolder, folder");
    console.log(folder);

    let response = await firstValueFrom(this.http.post<FolderDTO[]>("https://localhost:7241/api/Folder/getFoldersByParentFolder", folder))
    .then((data : any) => { return data })
    .catch((error) => {
      console.log(error.errorMessage);
    })

    return response;

  }

  async getComponentsByParentFolder(folder: FolderDTO) : Promise<ComponentDTO[] | undefined> {
    console.log("")
    console.log("ComponentService.getComponentsByParentFolder(folder: FolderDTO)");
    console.log("Http request: https://localhost:7241/api/Component/getComponentsByParentFolder, folder");
    console.log(folder);

    let list: ComponentDTO[] | undefined = undefined

    let response =  await firstValueFrom(this.http.post<ComponentDTO[]>("https://localhost:7241/api/Component/getComponentsByParentFolder", folder))
    .then((data : any) => { return data })
    .catch((error) => {
      console.log(error.errorMessage);
    })

    return response;
  }

  async addFolder() : Promise<void> {

    console.log("")
    console.log("ComponentService.addFolder()");

    console.log("addFolder from:");
    let parentComponent: ComponentTreeElement = this._contextComponent!;
    console.log(parentComponent);
    
    let date: Date = new Date();
  
    let newFolder: FolderDTO = {
      id: 0,
      name: "new folder",
      creationDate: date.toISOString(),
      lastUpdateDate: date.toISOString(),
      projectId: this._contextComponent!.projectId,
      parentFolderId: this._contextComponent!.id,
      isEditable: true,
      isSelected: true,
      isExpanded: false,
    }

    console.log("new FolderDTO():");
    console.log(newFolder);

    console.log("ComponentService.addFolder(newFolder: FolderDTO)");
    console.log("Http request: https://localhost:7241/api/Folder/createFolder, newFolder");
    console.log(newFolder);

    let apiResponse: FolderDTO | undefined = await this.addFolderAPIRequest(newFolder);
    if(apiResponse != undefined)
    {
      let returnComponent = this._mapper.folderDTOToElementTree(apiResponse, this._contextComponent!.indent + 1);
      returnComponent.isEditable = true;
      console.log("new ComponentTreeElement():");
      console.log(returnComponent);

      let returnParentComponent = this._contextComponent;
      returnParentComponent!.children.push(returnComponent);
      returnParentComponent!.isExpanded = true;
      returnParentComponent!.lastUpdateDate = returnComponent.lastUpdateDate;

      //Changement du componentTreeElement parent en front
      this.dataStore.setComponentTreeElementById(returnParentComponent!.id, returnParentComponent!);
      let parentFolder = this._mapper.elementTreeToFolderDTO(returnParentComponent!);
      //Changement du componentTreeElement parent en back
      this.updateLastUpdateDate(parentFolder);

      //Changement de tous les componentTreeElement ancêtre
      let ancestorIdList: number[] = this.dataStore.getComponentTreeParentsId(returnParentComponent!.id);
      for(let i=0; i < ancestorIdList.length; i++)
      {
        let findId = ancestorIdList[i];
        let ancestorComponent = this.dataStore.getComponentTreeElementById(findId);

        ancestorComponent.lastUpdateDate = returnComponent.lastUpdateDate;

        this.dataStore.setComponentTreeElementById(ancestorComponent.id, ancestorComponent);
        let ancestorFolder = this._mapper.elementTreeToFolderDTO(ancestorComponent);
        this.updateLastUpdateDate(ancestorFolder)
      }

      //Changement du projet actif
      let activeProject: ProjectDTO | undefined = this._projectService.getActiveProject();
      activeProject!.lastUpdateDate = returnComponent.lastUpdateDate;

      this._projectService.updateLastUpdateProject(activeProject as ProjectDTO);
      
      this.desactivateContext();
    }
  
  }

  async addFolderAPIRequest(folder: FolderDTO) : Promise<FolderDTO | undefined> {
    console.log("")
    console.log("ComponentService.addFolderAPIRequest(folder: FolderDTO)");

    let response = await firstValueFrom(this.http.post<FolderDTO[]>("https://localhost:7241/api/Folder/createFolder", folder))
    .then((result : any) => { 
      console.log("Http request response: FolderDTO()");
      console.log(result);
      
      return result })
    .catch((error) => {
      console.log(error.errorMessage);
      return undefined;
    })

    return response;

  }

  addComponent() : void {
    console.log("");
    console.log("ComponentService.addComponent()");
  }

  async findFolderChildren(treeElement: ComponentTreeElement) : Promise<ComponentTreeElement> {

    if(treeElement.type === "folder")
    {
      let folder: FolderDTO = this._mapper.elementTreeToFolderDTO(treeElement);
      let folderChildren: FolderDTO[] | undefined = undefined;

      folderChildren = await this.getFoldersByParentFolder(folder);


      //Le dossier a bien des dossiers enfants
      if(folderChildren !== undefined)
      {
        for(let i=0; i < folderChildren.length; i++)
        {
          let newComponent = this._mapper.folderDTOToElementTree(folderChildren[i], treeElement.indent + 1);
          newComponent = await this.findFolderChildren(newComponent);
          newComponent = await this.findComponentChildren(newComponent);
          treeElement.children.push(newComponent);
        }
      }
    }
    return treeElement;
  }

  async findComponentChildren(treeElement: ComponentTreeElement) : Promise<ComponentTreeElement> {
    if(treeElement.type === "folder")
    {
      let folder: FolderDTO = this._mapper.elementTreeToFolderDTO(treeElement);
      let componentChildren: ComponentDTO[] | undefined = undefined;

      componentChildren = await this.getComponentsByParentFolder(folder);

      //Le dossier a bien des components enfants
      if(componentChildren !== undefined)
      {
        for(let i=0; i < componentChildren.length; i++)
        {
          let newComponent = this._mapper.componentDTOToElementTree(componentChildren[i], treeElement.indent + 1);
          treeElement.children.push(newComponent);
        }
      }
    }
    return treeElement;
  }

  updateLastUpdateDate(folder: FolderDTO)
  {
    console.log("")
    console.log("ComponentService.updateLastUpdateDate(folder: FolderDTO)");
    console.log(folder);

    this.http.post<FolderDTO>("https://localhost:7241/api/Folder/updateLastUpdateDate", folder).subscribe({
      next: (result: any) => {
        console.log("Http request service: success");
      }
    });
  }
}
