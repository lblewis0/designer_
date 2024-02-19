import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { exhaustMap, first, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DataStoreService } from '../dataStore/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor{

  constructor(
    private _store: DataStoreService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = JSON.parse(localStorage.getItem("currentUser")!);
    
    if(user) {
      const clone = request.clone({setHeaders: {Authorization: 'Bearer ' + user.token}});
      return next.handle(clone);
    }
    return next.handle(request);
    
  }
}
