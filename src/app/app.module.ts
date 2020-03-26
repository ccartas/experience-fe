import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { ExperienceListComponent } from './home/experience-list/experience-list.component';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './home/about/about.component';
import { ModalComponent } from './common/modal/modal.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationComponent } from './common/notification/notification.component';
import { AddExperienceModalComponent } from './home/add-experience-modal/add-experience-modal.component';
import { AuthInterceptor } from './common/auth.interceptor';
import { LoaderComponent } from './common/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ExperienceListComponent,
    LandingComponent,
    AboutComponent,
    ModalComponent,
    LoginComponent,
    RegisterComponent,
    NotificationComponent,
    AddExperienceModalComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
