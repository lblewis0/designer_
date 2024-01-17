import { Component } from '@angular/core';
import { ProjectService } from '../../../shared/services/project/project.service';

@Component({
  selector: 'app-context-home',
  templateUrl: './context-home.component.html',
  styleUrl: './context-home.component.scss'
})
export class ContextHomeComponent {

  constructor(
    public _projectService: ProjectService
  ){}

  onCancel()
  {
    this._projectService._deleteWarning = false;
  }

  onDelete()
  {
    this._projectService._deleteWarning = false;
    this._projectService.deleteProject(this._projectService._projects![this._projectService._context!.projectId]);
  }
}
