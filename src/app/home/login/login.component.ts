import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { validateFormGroup } from './../../common/utils/utils';
import { ExperienceService } from 'src/app/common/experience.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private experienceService: ExperienceService) { 
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

    } else {
      this.experienceService.loginUser(this.loginForm.value['USERNAME'], this.loginForm.value['PASSWORD']).subscribe(res => {
        
      })
    }
  }

}
