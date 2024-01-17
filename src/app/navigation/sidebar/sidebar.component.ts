import { Component } from '@angular/core';
import { TokenDTO } from '../../shared/models/DTO/tokenDTO';
import { SessionService } from '../../shared/services/authentification/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  buttons: any[] = [
    {
      route: '/home',
      selected: true
    },
    {
      route: '/test',
      selected: false
    },
    {
      route: '/colors',
      selected: false
    },
    {
      route: '/account',
      selected: false
    },
    {
      route: '/settings',
      selected: false
    },
    {
      route: '/test',
      selected: false
    }
  ]

  constructor(public _sessionService: SessionService){}

  onClickSidebarButtons(index: number) : void
  {
      for(let i=0; i < this.buttons.length; i++)
      {
        this.buttons[i].selected = false;
      }

      this.buttons[index].selected = true;
  }
  
}
