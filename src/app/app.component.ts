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

  projectContext!: ProjectContext | undefined;
  componentContext!: ComponentContext | undefined;

  constructor(
    private readonly _sessionService: SessionService,
    private readonly _projectService: ProjectService,
    private readonly _componentService: ComponentService){
    this._sessionService.currentUser$.subscribe({
      next: (result: any) => {
        this.currentUser = result;
        this.connected = !!this.currentUser;
      }
    })

    this._projectService.context$.subscribe({
      next: (result: any) => {
        this.projectContext = result;
      }
    })

    this._componentService.context$.subscribe({
      next: (result: any) => {
        this.componentContext = result;
      }
    })
  }

  onProjectContextMouseLeave(){
    console.log("AppComponent.onProjectContextMouseLeave()")
    this._projectService.desactivateContext();
  }

  onComponentContextMouseLeave(){
    console.log("AppComponent.onComponentContextMouseLeave()")
    this._componentService.desactivateContext();
  }
}
