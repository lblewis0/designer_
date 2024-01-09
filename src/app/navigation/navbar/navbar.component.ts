import { Component } from '@angular/core';
import { SessionService } from '../../shared/services/authentification/session.service';
import { TokenDTO } from '../../shared/models/DTO/tokenDTO';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  connected!: boolean;
  status!: string;
  username!: string | undefined;
  currentUser!: TokenDTO | undefined;

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
}
