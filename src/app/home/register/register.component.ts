import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { validateFormGroup } from './../../common/utils/utils';
import { NotificationService } from 'src/app/common/notification/notification.service';
import { User } from 'src/app/common/models/models';
import { ExperienceService } from 'src/app/common/experience.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private experienceService: ExperienceService) { 
    this.registerForm = this.formBuilder.group({
      FIRST_NAME: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ]
      }),
      LAST_NAME: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ]
      }),
      EMAIL: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      PASSWORD: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(6)
        ]
      })
    });
  }

  ngOnInit(): void {

  }

  registerUser() {
    const invalidFields = validateFormGroup(this.registerForm);
    if(invalidFields.length) {
      this.notificationService.showNotification({
        notificationTitle: 'ERROR',
        notificationBody: invalidFields.map(field => field[0]).join(", "),
        notificationType: 'ERR',
        display: true
      });
    } else {
      const user: User = {
        firstName: this.registerForm.value['FIRST_NAME'],
        lastName: this.registerForm.value['LAST_NAME'],
        username: this.registerForm.value['EMAIL'],
        password: this.registerForm.value['PASSWORD']
      }
      this.experienceService.registerUser(user).subscribe((res: any) => {
        if(res) {
          this.notificationService.showNotification({
            notificationTitle: 'SUCCESS',
            notificationBody: res.message,
            notificationType: 'SUCC',
            display: true
          });
        }
      }, (err) => {
        this.notificationService.showNotification({
          notificationTitle: 'ERROR',
          notificationBody: 'Internal Server Error',
          notificationType: 'ERR',
          display: true
        });
      })
    }
  }

}
