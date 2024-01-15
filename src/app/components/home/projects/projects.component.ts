import { Component, ElementRef } from '@angular/core';
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
  projects!: ProjectDTO[] | undefined;

  colElement: string[] = ['#scroll1','#scroll2','#scroll3','#scroll4'];

  hoverIndex: number | null = null;

  activeIndex: number | null = null;

  constructor(
    private _formBuilder: FormBuilder, 
    private _projectService: ProjectService,
    private _sessionService: SessionService,
    private el: ElementRef
  ){
    this.projectForm = this._formBuilder.group({
      projectName: [null, [Validators.required]]
    });

    this._sessionService.currentUser$.subscribe({
      next: (result: any) => {
        this.currentUser = result;
        this.userId = this.currentUser?.userDTO?.id;
      }
    });

    this.getProjects();

    this._projectService.projects$.subscribe({
      next: (result: any) => {
        this.projects = result;
      }
    })  
  }

  addProject()
  {
    console.log("");
    console.log("ProjectComponent.addProject()");
    if(this.projectForm.valid)
    {
      console.log("-this.projectForm.valid");
      let dto: ProjectDTO = {
        id: 0,
        name: "",
        creationDate: "",
        lastUpdateDate: "",
        userId: 0
      }

      let dateCreation = new Date();

      dto.id = 0;
      dto.creationDate = dateCreation.toISOString();
      dto.lastUpdateDate = dateCreation.toISOString();
      dto.userId = this.userId; 

      this._projectService.createProject(dto).subscribe({
        next: (result: any) => {
          console.log("Http request: success");
          this.getProjects()
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

  getProjects(){
    console.log("");
    console.log("ProjectComponent.getProjects()");
    this._projectService.getProjects(this.currentUser as TokenDTO).subscribe({
      next: (result: any) => {
        console.log("Http request component: success");
        this.projects = result;
        console.log(this.projects);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  updateActiveProject(id: number){
    console.log("");
    console.log("ProjectComponent.updateActiveProject(id)");

    let token: TokenDTO | undefined = this._sessionService.currentUser;

    token!.userDTO.activeProjectId = id;

    this._sessionService.updateActiveProject(token as TokenDTO).subscribe({
      next: (result: any) => {
        console.log("Http request component: success");
      },
      error: (error: any) => {
        console.log(error);
      }
    })

  }

  scrollEvent(elementScroll: string) : void
  {
    let scrollColumn = this.el.nativeElement.querySelector(elementScroll);

    for(let i=0; i < this.colElement.length; i++)
    {
      let appliedColumn = this.el.nativeElement.querySelector(this.colElement[i]);

      if(appliedColumn !== scrollColumn)
      {
        appliedColumn.scrollTop = scrollColumn.scrollTop;
      }
    }

  }

  onProjectRightClick(event: MouseEvent, projectIndex: number) : void {
    event.preventDefault();
    let id = this.projects![projectIndex].id;
    this._projectService.activateContext(event.clientY, event.clientX, projectIndex);
  }

  onMouseEnter(index: number) : void
  {
    this.hoverIndex = index;
  }

  onMouseLeave(index: number) : void
  {
    this.hoverIndex = null;
  }

  onMouseDown(index: number) : void
  {
    this.activeIndex = index;
  }

  onMouseUp(index: number) : void
  {
    this.activeIndex = null;
  }
}
