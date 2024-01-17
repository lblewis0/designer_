import { Component } from '@angular/core';
import { ProjectService } from '../../shared/services/project/project.service';

@Component({
  selector: 'app-context-home-project',
  templateUrl: './context-home-project.component.html',
  styleUrl: './context-home-project.component.scss'
})
export class ContextHomeProjectComponent {
  constructor(public _projectService: ProjectService){}

  onContextMouseLeave(){
    console.log("ContextMenuComponent.onContextMouseLeave()");
    this._projectService.desactivateContext();
  }

  renameProject(){
    console.log("ContextMenuComponent.renameProject()")
    this._projectService._context!.isActive = false;
    this._projectService._projects![this._projectService._context!.projectId].isEditable = true;
  }

  deleteProject(){
    console.log("ContextMenuComponent.renameProject()");
    this._projectService._context!.isActive = false;
    this._projectService._deleteWarning = true;
  }

}
