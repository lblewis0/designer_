import { Component } from '@angular/core';
import { ComponentService } from '../../shared/services/component/component.service';
import { ComponentTreeElement } from '../../shared/models/models/componentTreeElement';

@Component({
  selector: 'app-context-home-component-folder',
  templateUrl: './context-home-component-folder.component.html',
  styleUrl: './context-home-component-folder.component.scss'
})
export class ContextHomeComponentFolderComponent {

  constructor(private _componentService: ComponentService){}

  onContextMouseLeave(){
    console.log("");
    console.log("ContextHomeComponentFolder.onContextMouseLeave()");
    this._componentService.desactivateContext();
  }

  addFolder(){
    console.log("");
    console.log("ContextHomeComponentFolder.addFolder()");
    this._componentService.addFolder();
  }

  renameFolder(){
    console.log("");
    console.log("ContextHomeComponentFolder.renameFolder()");
    this._componentService.updateIsEditable();
  }

  addComponent(){
    console.log("");
    console.log("ContextHomeComponentFolder.addComponent()");
    this._componentService.addComponent();
  }

}
