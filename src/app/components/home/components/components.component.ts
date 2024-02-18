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

      let date = new Date();
      date.setHours(date.getHours() + 1);
      component.lastUpdateDate = this.dateMapper.dateToString(date);
      console.log(component);
      
      this._componentService.renameFolder(component);
      this.renameForm.get('componentName')?.setValue(null);

    }
    else{
      console.log("-!this.renameForm.valid");
      component.isEditable = false;
    }

  }


  onClickTreeElement(element: ComponentTreeElement) : void
  {
      this._componentService.updateIsSelected(element);   
  }

  onRightClickTreeElement(event: MouseEvent, componentId: number, type: string, component: ComponentTreeElement) : void {
    event.preventDefault();
    this._componentService.activeContext(event.clientY, event.clientX, componentId, type, component);
  }

}
