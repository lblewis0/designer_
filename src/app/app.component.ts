import { Component } from '@angular/core';
import { SessionService } from './shared/services/authentification/session.service';
import { TokenDTO } from './shared/models/DTO/tokenDTO';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'designer';

  connected!: boolean;
  currentUser!: TokenDTO | undefined;

  constructor(private readonly _sessionService: SessionService){
    this._sessionService.currentUser$.subscribe({
      next: (result: any) => {
        this.currentUser = result;
        this.connected = !!this.currentUser;
      }
    })
  }
}
