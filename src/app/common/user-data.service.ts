import { Injectable } from '@angular/core';
import { UserData } from './models/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: BehaviorSubject<UserData> = new BehaviorSubject(null);

  constructor() { }

  storeUserData(userData: UserData) {
    this.userData.next(userData);
  }

  getUserData() {
    return this.userData.asObservable();
  }

  
}
