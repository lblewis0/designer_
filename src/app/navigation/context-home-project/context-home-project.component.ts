import { Component } from '@angular/core';
import { ProjectService } from '../../shared/services/project/project.service';

@Component({
  selector: 'app-context-home-project',
  templateUrl: './context-home-project.component.html',
  styleUrl: './context-home-project.component.scss'
})
export class ContextHomeProjectComponent {
  constructor(private readonly _projectService: ProjectService){}

  onContextMouseLeave(){
    console.log("ContextMenuComponent.onContextMouseLeave()");
    this._projectService.desactivateContext();
  }

  renameProject(){
    console.log("ContextMenuComponent.onContextMouseLeave()")
  }

}
