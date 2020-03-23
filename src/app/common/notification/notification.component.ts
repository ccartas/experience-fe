import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { NotificationMessage } from './notification-message';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notificationData: NotificationMessage = {
    notificationTitle: '',
    notificationBody: '',
    notificationType: '',
    display: false
  };

  constructor(private notificationService: NotificationService) {
    this.notificationService.getNotificationDataAsObservable().subscribe(notification => {
        this.notificationData = {...notification};
    });
  }

  applyNotificationStyle() {
    const style = {};
    if(this.notificationData.display) {
      style['right'] = '10px';
    } else {
      style['right'] = '-300px';
    }
    switch(this.notificationData.notificationType) {
      case 'ERR':
        style['background'] = '#f8b7bd';
        break;
      case 'WARN':
        style['background'] = '#ffe399';
        break;
      case 'SUCC':
        style['background'] = '#b7d8b7';
        break;
    }
    return style;
  }

  dismissNotification() {
    this.notificationService.hideNotification();
  }
  ngOnInit(): void {
    
  }

}
