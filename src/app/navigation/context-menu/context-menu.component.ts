import { Component } from '@angular/core';
import { ProjectService } from '../../shared/services/project/project.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent {

  constructor(private readonly _projectService: ProjectService){}

  onContextMouseLeave(){
    console.log("ContextMenuComponent.onContextMouseLeave()");
    this._projectService.desactivateContext();
  }

  renameProject(){
    console.log("ContextMenuComponent.onContextMouseLeave()")
  }

}
