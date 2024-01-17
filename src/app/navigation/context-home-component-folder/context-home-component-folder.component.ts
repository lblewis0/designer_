import { Component } from '@angular/core';
import { ComponentService } from '../../shared/services/component/component.service';

@Component({
  selector: 'app-context-home-component-folder',
  templateUrl: './context-home-component-folder.component.html',
  styleUrl: './context-home-component-folder.component.scss'
})
export class ContextHomeComponentFolderComponent {

  constructor(private _componentService: ComponentService){}

  onContextMouseLeave(){
    console.log("ContextHomeComponentFolder.onContextMouseLeave()");
    this._componentService.desactivateContext();
  }

}
