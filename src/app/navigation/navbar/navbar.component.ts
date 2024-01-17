import { Component } from '@angular/core';
import { SessionService } from '../../shared/services/authentification/session.service';
import { TokenDTO } from '../../shared/models/DTO/tokenDTO';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  route: string = 'Home/Projects';
  routeElement: string[] = this.route.split("/");

  constructor(public _sessionService: SessionService){}

  logout(){
    this._sessionService.logout();
  }
}
