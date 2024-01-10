import { Component } from '@angular/core';
import { ProjectService } from '../../../shared/services/project/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectDTO } from '../../../shared/models/DTO/projectDTO';
import { SessionService } from '../../../shared/services/authentification/session.service';
import { TokenDTO } from '../../../shared/models/DTO/tokenDTO';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  projectForm!: FormGroup;

  userId!: number | undefined;
  currentUser!: TokenDTO | undefined;

  constructor(
    private _formBuilder: FormBuilder, 
    private _projectService: ProjectService,
    private _sessionService: SessionService
  ){
    this.projectForm = this._formBuilder.group({
      projectName: [null, [Validators.required]]
    });

    this._sessionService.currentUser$.subscribe({
      next: (result: any) => {
        this.currentUser = result;
        this.userId = this.currentUser?.userDTO?.id;
      }
    })
  }

  addProject()
  {
    console.log("ProjectComponent.addProject()");
    if(this.projectForm.valid)
    {
      console.log("-this.projectForm.valid");
      let dto: ProjectDTO = {
        name: "",
        creationDate: "",
        lastUpdateDate: "",
        userId: 0
      }
      let dateCreation = new Date();

      dto.name = this.projectForm.get('projectName')?.value;
      dto.creationDate = dateCreation.toISOString();
      dto.lastUpdateDate = dateCreation.toISOString();
      dto.userId = this.userId;

      this._projectService.createProject(dto).subscribe({
        next: (result: any) => {
          console.log("Http request: success");
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
    else{
      console.log("-!this.projectForm.valid");
    }
  }
}
