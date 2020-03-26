import { Component, OnInit } from '@angular/core';
import { ExperienceService } from 'src/app/common/experience.service';
import { UserDataService } from 'src/app/common/user-data.service';
import { Experience } from 'src/app/common/models/models';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})
export class ExperienceListComponent implements OnInit {

  experiences: Experience[] = [];
  headers = [
    "Punct Plecare",
    "Destinatie",
    "Mijloc de transport",
    "Durata",
    "Grad Satisfactie"
  ];

  constructor(private experienceService: ExperienceService,
              private userDataService: UserDataService) { 
    
  }

  ngOnInit(): void {
    this.experienceService.getAllExperiences().subscribe(res => {
      this.experiences = [...res];
    })
  }

}
