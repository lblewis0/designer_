import { Component } from '@angular/core';
import { SessionService } from './shared/services/authentification/session.service';
import { TokenDTO } from './shared/models/DTO/tokenDTO';
import { RouterOutlet } from '@angular/router';
import { ProjectService } from './shared/services/project/project.service';
import { ProjectContext } from './shared/models/models/projectContext';
import { ComponentService } from './shared/services/component/component.service';
import { ComponentContext } from './shared/models/models/componentContext';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'designer';

  connected!: boolean;
  currentUser!: TokenDTO | undefined;

  componentContext!: ComponentContext | undefined;

  constructor(
    public _sessionService: SessionService,
    public _projectService: ProjectService,
    public _componentService: ComponentService){}

  onProjectContextMouseLeave(){
    console.log("AppComponent.onProjectContextMouseLeave()")
    this._projectService.desactivateContext();
  }

  onComponentContextMouseLeave(){
    console.log("AppComponent.onComponentContextMouseLeave()")
    this._componentService.desactivateContext();
  }
}
