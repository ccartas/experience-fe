import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/models';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User) {
    return this.httpClient.post(`${environment.backendURL}/register`, user)
  }

  loginUser(username, password) {
    return this.httpClient.post(`${environment.backendURL}/login`, {username, password });
  }
}
