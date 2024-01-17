import { Component } from '@angular/core';
import { ComponentService } from '../../shared/services/component/component.service';

@Component({
  selector: 'app-context-home-component-file',
  templateUrl: './context-home-component-file.component.html',
  styleUrl: './context-home-component-file.component.scss'
})
export class ContextHomeComponentFileComponent {

  constructor(private _componentService: ComponentService){}

  onContextMouseLeave(){
    console.log("ContextHomeComponentFile.onContextMouseLeave()");
    this._componentService.desactivateContext();
  }

}
