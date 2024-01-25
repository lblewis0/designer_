import { Injectable } from '@angular/core';
import { ComponentTreeElement } from '../../models/models/componentTreeElement';
import { FolderDTO } from '../../models/DTO/folderDTO';
import { ComponentDTO } from '../../models/DTO/componentDTO';

@Injectable({
  providedIn: 'root'
})
export class MapperDTOService {

  constructor() { }

  elementTreeToFolderDTO(element: ComponentTreeElement) : FolderDTO {
    let folder: FolderDTO = {
      id: element.id,
      name: element.name,
      creationDate: element.creationDate,
      lastUpdateDate: element.lastUpdateDate,
      projectId: element.projectId,
      parentFolderId: element.parentFolderId,
      isEditable: element.isEditable,
      isSelected: element.isSelected,
      isExpanded: element.isExpanded
    }

    return folder;
  }

  folderDTOToElementTree(folder: FolderDTO, indent: number) : ComponentTreeElement {
    let element: ComponentTreeElement = {
      id: folder.id,
      name: folder.name,
      creationDate: folder.creationDate,
      lastUpdateDate: folder.lastUpdateDate,
      projectId: folder.projectId,
      parentFolderId: folder.parentFolderId,
      isEditable: folder.isEditable,
      isSelected: folder.isSelected,
      isExpanded: folder.isExpanded,
      indent: indent,
      type: 'folder',
      children: []
    }

    return element;

  }

  elementTreeToComponentDTO(element: ComponentTreeElement) : ComponentDTO 
  {
    let component: ComponentDTO = {
      id: element.id,
      name: element.name,
      creationDate: element.creationDate,
      lastUpdateDate: element.lastUpdateDate,
      projectId: element.projectId,
      parentFolderId: element.parentFolderId,
      isEditable: element.isEditable,
      isSelected: element.isSelected,
      isExpanded: element.isExpanded
    }

    return component;
  }

  componentDTOToElementTree(component: ComponentDTO, indent: number) : ComponentTreeElement {
    let element: ComponentTreeElement = {
      id: component.id,
      name: component.name,
      creationDate: component.creationDate,
      lastUpdateDate: component.lastUpdateDate,
      projectId: component.projectId,
      parentFolderId: component.parentFolderId,
      isEditable: component.isEditable,
      isSelected: component.isSelected,
      isExpanded: component.isExpanded,
      indent: indent,
      type: 'component',
      children: []
    }

    return element;
  }
}
