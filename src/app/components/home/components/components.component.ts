import { Component } from '@angular/core';
import { liElement, sidebarUlModel } from '../../../shared/models/models/ulModels'
import { projectTree } from '../../../shared/models/models/projectTree';
import { ProjectTreeElement } from '../../../shared/models/models/projectTreeElement';
import { ComponentService } from '../../../shared/services/component/component.service';
import { ComponentTree } from '../../../shared/models/models/componentTree';
import { ComponentTreeElement } from '../../../shared/models/models/componentTreeElement';
import { DataStoreService } from '../../../shared/services/dataStore/data-store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapperDateService } from '../../../shared/services/mapper/mapper-date.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss'
})
export class ComponentsComponent {

  renameForm!: FormGroup;
  autofocus: Boolean = true;

  constructor(
    public _componentService: ComponentService,
    private _formBuilder: FormBuilder,
    public dataStore: DataStoreService,
    private dateMapper: MapperDateService
  ) {

    this.renameForm = this._formBuilder.group({
      componentName: [null, [Validators.required]]
    });
  }

  onRenameInputBlur(component: ComponentTreeElement){
  }

  renameComponent(component: ComponentTreeElement){
    console.log("");
    console.log("ComponentComponent.renameComponent()");

    if(this.renameForm.valid)
    {
      console.log("-this.renameForm.valid");
      component.isEditable = false;
      component.name = this.renameForm.get('componentName')?.value;
      component.lastUpdateDate = this.dateMapper.dateToString(new Date());

      console.log(component);

      this.dataStore.setComponentTreeElementById(component.id, component);
    }
    else{
      console.log("-!this.renameForm.valid");
      component.isEditable = false;
    }

  }


  onClickTreeElement(element: ProjectTreeElement) : void
  {
      //Ensuite je regarde à tous les autres li présent dans la sidebar
      //Et je change leur valeur en false
      if(this.dataStore.projectTree!.elements && this.dataStore.projectTree!.elements.length > 0)
      {
         for(let i = 0; i < this.dataStore.projectTree!.elements.length;i++)
         {
            // console.log(this.dataStore.projectTree!.elements[i].name);
            
            this.dataStore.projectTree!.elements[i].isSelected = false;
          
            if(this.dataStore.projectTree!.elements[i].children)
            {
               this.unSelect(this.dataStore.projectTree!.elements[i]);
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
      
  }
    
  unSelect(element: ComponentTreeElement) : void
  {
      if(element.children && element.children.length > 0)
      {
         for(let i = 0; i < element.children.length; i++)
         {
            element.children[i].isSelected = false;

            this.unSelect(element.children[i]);
         }
      }
  }

  onRightClickTreeElement(event: MouseEvent, componentId: number, type: string, component: ComponentTreeElement) : void {
    event.preventDefault();
    this._componentService.activeContext(event.clientY, event.clientX, componentId, type, component);
  }

}
