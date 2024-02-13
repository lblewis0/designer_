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
    private readonly _store: Store<{dataStore: DataStoreService}>
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._store.select(state => state.dataStore.currentUser!.token).pipe(first(), exhaustMap(token => {
      if(token) {
        const clone = request.clone({setHeaders: {Authorization: 'Bearer ' + token}});
        return next.handle(clone);
      }
      return next.handle(request);
    }))
  }
}
