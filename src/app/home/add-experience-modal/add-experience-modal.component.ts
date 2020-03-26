import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExperienceService } from 'src/app/common/experience.service';

@Component({
  selector: 'app-add-experience-modal',
  templateUrl: './add-experience-modal.component.html',
  styleUrls: ['./add-experience-modal.component.css']
})
export class AddExperienceModalComponent implements OnInit {
  experienceForm: FormGroup;
  @Output() toggleExperienceForm: EventEmitter<boolean> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private experienceService: ExperienceService) { 
    this.experienceForm = this.formBuilder.group({
      startingPoint: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(4)
        ]
      }),
      destination: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(4)
        ]
      }),
      transportationType: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      duration: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      satisfactionLevel: new FormControl('', {
        validators: [
          Validators.required
        ]
      })
    });
  }

  ngOnInit(): void {
  }

  addExperience(event) {
    this.experienceService.addExperience({...this.experienceForm.value}).subscribe(res => {
      console.log(res);
      this.toggleExperienceForm.emit(false);
    })
  }
  cancelAddExperience(event) {
    this.toggleExperienceForm.emit(false);
  }
}
