import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { validateFormGroup } from './../../common/utils/utils';
import { ExperienceService } from 'src/app/common/experience.service';
import { NotificationService } from 'src/app/common/notification/notification.service';
import { NotificationMessage } from 'src/app/common/notification/notification-message';
import { LocalStorageService } from 'src/app/common/local-storage.service';
import { UserDataService } from 'src/app/common/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() onUserLoggedIn: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private experienceService: ExperienceService,
              private notificationService: NotificationService,
              private localStorageService: LocalStorageService,
              private userDataService: UserDataService) { 
    this.loginForm = this.formBuilder.group({
      USERNAME: new FormControl('', {
        validators: [
          Validators.required,
        ]
      }),
      PASSWORD: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(6)
        ]
      })
    })
  }

  ngOnInit(): void {
  }

  loginUser() {
    const invalidFields = validateFormGroup(this.loginForm);
    if(invalidFields.length) {
      const notificationBody = invalidFields.map(field => field[0]).join(", ");
      const notificationMessage: NotificationMessage = {
        notificationTitle: 'ERROR',
        notificationBody,
        notificationType: 'ERR',
        display: true 
      };
      this.notificationService.showNotification(notificationMessage);
    } else {
      this.experienceService.loginUser(this.loginForm.value['USERNAME'], this.loginForm.value['PASSWORD']).subscribe(userData => {
        if(userData) {
          this.localStorageService.storeData('userData', userData).then(() => {
            this.notificationService.showNotification({
              notificationTitle: 'SUCCESS',
              notificationBody: 'User logged in successfully',
              notificationType: 'SUCC',
              display: true
            })
            this.userDataService.storeUserData(userData);
            this.onUserLoggedIn.emit(true);
          })
        }
      })
    }
  }

}
