import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectService } from '../../project/project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectContextService {

  

  constructor(private readonly _projectService: ProjectService) { 
  }

}
