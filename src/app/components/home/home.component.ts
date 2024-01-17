import { Component } from '@angular/core';
import { ProjectService } from '../../shared/services/project/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  test: Boolean = false;

  constructor(
    public _projectService: ProjectService
  ){

  }
}
