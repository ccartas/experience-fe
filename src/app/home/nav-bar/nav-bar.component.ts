import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavigationEntry, UserData } from 'src/app/common/models/models';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/common/user-data.service';
import { LocalStorageService } from 'src/app/common/local-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  navigationConfiguration: NavigationEntry[] = [
    {
      label: 'Home',
      navigationPath: 'landing',
      selected: false
    },
    {
      label: 'About',
      navigationPath: 'about',
      selected: false
    }
  ];
  

  @Output() displayUserModal: EventEmitter<boolean> = new EventEmitter();

  userData: UserData = null;

  constructor(private router: Router,
              private userDataService: UserDataService,
              private localStorageService: LocalStorageService) {
          this.userDataService.getUserData().subscribe(userData => {
            if(userData) {
              this.userData = {...userData}
            } else {
              this.userData = null;
            }
          })
   }

  ngOnInit(): void {
  }

  applyStyleForSelectedItem(isSelected) {
    const style = {};
    if(isSelected) {
      style['text-decoration'] = 'underline';
    }
    return style;
  }

  navigateTo(event, navigationPath, index) {
    this.navigationConfiguration.forEach(config => config.selected = false);
    this.navigationConfiguration[index].selected = true;
    this.router.navigate(['/home', {outlets: {home_outlet: navigationPath}}])
  }

  toggleUserModal() {
    this.displayUserModal.emit(true);
  }

  async logoutUser() {
    try {
      await this.localStorageService.clearStore();
      this.userDataService.storeUserData(null);
      this.router.navigate(['/home']);
    } catch(err) {
      console.log(err);
    }
  }


}
