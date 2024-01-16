import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponentContext } from '../../models/models/componentContext';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  private _context: BehaviorSubject<ComponentContext | undefined>

  constructor() { 
    this._context = new BehaviorSubject<ComponentContext | undefined>(undefined);
  }

  get context(): ComponentContext | undefined{
    return this._context.value;
  }

  get context$(): Observable<ComponentContext | undefined>{
    return this._context.asObservable();
  }

  activeContext(top: number, left: number, idComponent: number, type: string){
    let context: ComponentContext = {
      isActive: true,
      top: top,
      left: left,
      componentId: idComponent,
      type: type
    }

    this._context.next(context);
    console.log("ComponentService.activeContext()");
    console.log(this.context)
  }

  desactivateContext()
  {
    let context: ComponentContext = {
      isActive: false,
      top: 0,
      left: 0,
      componentId: this._context.value!.componentId,
      type: this._context.value!.type
    }
    this._context.next(context);
    console.log("ComponentService.desactivateContext()");
    console.log(this.context);
  }
}
