import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationMessage } from './notification-message';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject: Subject<NotificationMessage> = new Subject<NotificationMessage>();

  constructor() { }

  showNotification(notification: NotificationMessage) {
    this.hideNotification();
    this.notificationSubject.next(notification);
  }

  hideNotification() {
      this.notificationSubject.next({
        notificationTitle: '',
        notificationBody: '',
        notificationType: '',
        display: false
      });
  }


  getNotificationDataAsObservable() {
    return this.notificationSubject.asObservable();
  }

  
}
