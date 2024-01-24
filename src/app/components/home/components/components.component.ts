import { Component } from '@angular/core';
import { liElement, sidebarUlModel } from '../../../shared/models/models/ulModels'
import { projectTree } from '../../../shared/models/models/projectTree';
import { ProjectTreeElement } from '../../../shared/models/models/projectTreeElement';
import { ComponentService } from '../../../shared/services/component/component.service';
import { ComponentTree } from '../../../shared/models/models/componentTree';
import { ComponentTreeElement } from '../../../shared/models/models/componentTreeElement';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss'
})
export class ComponentsComponent {

  projectTree: projectTree = {
    elements: [
      {
        id: 1,
        name: 'Folder 1',
        isSelected: false,
        isExpanded: false,
        iconPath: 'M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z',
        indent: 0,
        type: 'folder',
        childs: [
          {
            id: 2,
            name: 'File 1.1',
            isSelected: false,
            isExpanded: false,
            iconPath: 'M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z',
            indent: 1,
            type: 'file'
          },
          {
            id: 3,
            name: 'File 1.2',
            isSelected: false,
            isExpanded: false,
            iconPath: 'M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z',
            indent: 1,
            type: 'file'
          },
          {
            id: 4,
            name: 'File 1.3',
            isSelected: false,
            isExpanded: false,
            iconPath: 'M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z',
            indent: 1,
            type: 'file'
          }

        ]
      },
      {
        id: 5,
        name: 'Folder 2',
        isSelected: false,
        isExpanded: false,
        iconPath: 'M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z',
        indent: 0,
        type: 'folder',
        childs: [
          {
            id: 6,
            name: 'Folder 2.1',
            isSelected: false,
            isExpanded: false,
            iconPath: 'M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z',
            indent: 1,
            type: 'folder',
            childs: [
              {
                id: 7,
                name: 'File 2.1.1',
                isSelected: false,
                isExpanded: false,
                iconPath: 'M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z',
                indent: 2,
                type: 'file'
              },
              {
                id: 8,
                name: 'File 2.1.2',
                isSelected: false,
                isExpanded: false,
                iconPath: 'M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z',
                indent: 2,
                type: 'file'
              },
              {
                id: 9,
                name: 'File 2.1.3',
                isSelected: false,
                isExpanded: false,
                iconPath: 'M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z',
                indent: 2,
                type: 'file'
              },
    
            ]
          }

        ]
      }
    ]
  }

  constructor(
    public _componentService: ComponentService
  ) {  }

  onClickTreeElement(element: ProjectTreeElement) : void
  {
      //Ensuite je regarde à tous les autres li présent dans la sidebar
      //Et je change leur valeur en false
      if(this.projectTree.elements && this.projectTree.elements.length > 0)
      {
         for(let i = 0; i < this.projectTree.elements.length;i++)
         {
            console.log(this.projectTree.elements[i].name);
            
            this.projectTree.elements[i].isSelected = false;
          
            if(this.projectTree.elements[i].childs)
            {
               this.unSelect(this.projectTree.elements[i]);
            }
         }
      }

      //Je reçois en argument un liElement
      //Quoiqu'il arrive j'inverse sa valeur isSelected au click
      element.isSelected = true;

      if(element.isExpanded)
      {
        element.isExpanded = false;
      }
      else
      {
        element.isExpanded = true;
      }

      console.log(this.projectTree);
      
  }
    
  unSelect(element: ProjectTreeElement) : void
  {
      if(element.childs && element.childs.length > 0)
      {
         for(let i = 0; i < element.childs.length; i++)
         {
            console.log(element.childs[i].name);

            element.childs[i].isSelected = false;

            this.unSelect(element.childs[i]);
         }
      }
  }

  onRightClickTreeElement(event: MouseEvent, componentId: number, type: string, component: ComponentTreeElement) : void {
    event.preventDefault();
    this._componentService.activeContext(event.clientY, event.clientX, componentId, type, component);
  }

}
