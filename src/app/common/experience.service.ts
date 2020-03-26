import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { User, UserData, Experience } from './models/models';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private unsecuredHttpClient: HttpClient;

  constructor(private httpClient: HttpClient,
              private httpBackend: HttpBackend) { 
  this.unsecuredHttpClient = new HttpClient(this.httpBackend);              
              }

  registerUser(user: User) {
    return this.unsecuredHttpClient.post(`${environment.backendURL}/register`, user)
  }

  loginUser(username, password) {
    return this.unsecuredHttpClient.post<UserData>(`${environment.backendURL}/login`, {username, password });
  }

  addExperience(experience: Experience) {
    return this.httpClient.post(`${environment.backendURL}/experience`, experience);
  }
  getAllExperiences() {
    return this.unsecuredHttpClient.get<Experience[]>(`${environment.backendURL}/experience`);
  }
}
