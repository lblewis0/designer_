import { Component } from '@angular/core';

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
}
