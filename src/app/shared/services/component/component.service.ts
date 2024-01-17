import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponentContext } from '../../models/models/componentContext';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  public _context: ComponentContext | undefined;

  constructor() {}

  activeContext(top: number, left: number, idComponent: number, type: string){
    let context: ComponentContext = {
      isActive: true,
      top: top,
      left: left,
      componentId: idComponent,
      type: type
    }

    this._context = context;
    console.log("ComponentService.activeContext()");
    console.log(this._context)
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
    console.log("ComponentService.desactivateContext()");
    console.log(this._context);
  }
}
