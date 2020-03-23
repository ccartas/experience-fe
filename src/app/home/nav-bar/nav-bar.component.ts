import { Component, OnInit } from '@angular/core';
import { NavigationEntry } from 'src/app/common/models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  navigationConfiguration: NavigationEntry[] = [
    {
      label: 'Home',
      navigationPath: '/home',
      selected: false
    },
    {
      label: 'About',
      navigationPath: '/about',
      selected: false
    }
  ]

  constructor(private router: Router) { }

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
    this.router.navigate([navigationPath])
  }


}
