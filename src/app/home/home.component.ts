import { Component, OnInit } from '@angular/core';
import { UserData } from '../common/models/models';
import { LocalStorageService } from '../common/local-storage.service';
import { UserDataService } from '../common/user-data.service';
import { ExperienceService } from '../common/experience.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayUserModal: boolean = false;
  displayAddExperienceModal: boolean = false;
  constructor(private localStorageService: LocalStorageService,
              private userDataService: UserDataService,
              private experienceService: ExperienceService) { 
    
  }

  ngOnInit(): void {
    this.localStorageService.getData('userData').then((data: UserData) => {
      if(data) this.userDataService.storeUserData(data);
      
    })
  }

  handleModalToggle(display: boolean) {
    this.displayUserModal = display;
  }

  handleUserLoggedIn(userData: UserData) {
    this.displayUserModal = false;
    console.log(this.displayUserModal);
  }

  toggleAddExperience(event) {
    this.displayAddExperienceModal = !this.displayAddExperienceModal;
  }
}
