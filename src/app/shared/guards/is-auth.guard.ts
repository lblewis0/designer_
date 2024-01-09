import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/authentification/session.service';
import { inject } from '@angular/core';

export const isAuthGuard: CanActivateFn = (route, state) => {
  const sessionService: SessionService = inject(SessionService)
  const router: Router = inject(Router)

  if(sessionService.currentUser)
  {
    return true;
  }
  else
  {
    router.navigate(["login"]);
    return false;
  }
};
