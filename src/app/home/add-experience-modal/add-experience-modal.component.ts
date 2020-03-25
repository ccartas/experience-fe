import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExperienceService } from 'src/app/common/experience.service';

@Component({
  selector: 'app-add-experience-modal',
  templateUrl: './add-experience-modal.component.html',
  styleUrls: ['./add-experience-modal.component.css']
})
export class AddExperienceModalComponent implements OnInit {
  experienceForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private experienceService: ExperienceService) { 
    this.experienceForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
  }

  addExperience(event) {
    this.experienceService.addExperience({
      startingPoint: 'romana',
      destination: 'universitate',
      transportationType: 'metrou',
      duration: '30',
      satisfactionLevel: 'happy'
    }).subscribe(res => {
      console.log(res);
    })
  }

}
