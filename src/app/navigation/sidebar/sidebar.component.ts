import { Component } from '@angular/core';
import { TokenDTO } from '../../shared/models/DTO/tokenDTO';
import { SessionService } from '../../shared/services/authentification/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  connected!: boolean;
  status!: string;
  username!: string | undefined;
  currentUser!: TokenDTO | undefined;

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

  constructor(private readonly _sessionService: SessionService){
    this._sessionService.currentUser$.subscribe({
      next: (result: any) => {
        this.currentUser = result;
        this.connected = true;
        this.status = "Connected";
        this.username = this.currentUser?.userDTO?.username;
      }
    });

  }

  logout(){
    this._sessionService.logout();
    this.currentUser = undefined;
    this.connected = false;
    this.status = "Disconnected";
    this.username = undefined;
  }

  onClickSidebarButtons(index: number) : void
  {
      for(let i=0; i < this.buttons.length; i++)
      {
        this.buttons[i].selected = false;
      }

      this.buttons[index].selected = true;
  }
  
}
