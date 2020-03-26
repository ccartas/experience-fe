import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from './models/models';
import { LocalStorageService } from './local-storage.service';
import { UserDataService } from './user-data.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private userData: UserData = null;
  constructor(private userDataService: UserDataService) {
    this.userDataService.getUserData().subscribe((data: UserData) => {
      this.userData = data ? {...data} : null;
      console.log(this.userData)
    })
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = request.clone({
      headers: this.userData ? request.headers.append('Authorization', `Bearer ${this.userData.token}`) : request.headers
    });
    return next.handle(newRequest);
  }
}
