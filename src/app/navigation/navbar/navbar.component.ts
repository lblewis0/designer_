import { Component } from '@angular/core';
import { SessionService } from '../../shared/services/authentification/session.service';
import { TokenDTO } from '../../shared/models/DTO/tokenDTO';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  status: string = "Disconnected";
  username: string = "Louis"

  firstname!: string;
  connectionStatus!: string;

  currentUser!: TokenDTO | undefined;

  constructor(private readonly _sessionService: SessionService){
    this._sessionService.currentUser$.subscribe({
      next: (result) => {
        this.currentUser = result;
      }
    })
  }
}
