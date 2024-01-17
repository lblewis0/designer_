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

  colElement: string[] = ['#scroll1','#scroll2','#scroll3','#scroll4'];
  hoverIndex: number | null = null;
  activeIndex: number | null = null;

  constructor(
    private _formBuilder: FormBuilder, 
    public _projectService: ProjectService,
    public _sessionService: SessionService,
    private el: ElementRef
  ){
    this.projectForm = this._formBuilder.group({
      projectName: [null, [Validators.required]]
    });

    this.getProjects();
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
        userId: 0,
        isEditable: false
      }

      let dateCreation = new Date();

      dto.id = 0;
      dto.name = this.projectForm.get('projectName')?.value;
      dto.creationDate = dateCreation.toISOString();
      dto.lastUpdateDate = dateCreation.toISOString();
      dto.userId = this._sessionService._userId; 

      this._projectService.createProject(dto);
      this.projectForm.get('projectName')?.setValue(null);
    }
    else{
      console.log("-!this.projectForm.valid");
    }

  }

  getProjects(){
    console.log("");
    console.log("ProjectComponent.getProjects()");
    this._projectService.getProjects(this._sessionService._currentUser as TokenDTO);
  }

  updateActiveProject(id: number){
    console.log("");
    console.log("ProjectComponent.updateActiveProject(id)");

    let token: TokenDTO | undefined = this._sessionService._currentUser;

    token!.userDTO.activeProjectId = id;

    this._sessionService.updateActiveProject(token as TokenDTO);

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
    let id = this._projectService._projects![projectIndex].id;
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
