import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from "@angular/common/http";


import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LandingComponent } from './modules/landing/landing.component';
import { RootComponent } from './modules/root/root.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


@NgModule({
  declarations: [AppComponent, LandingComponent, RootComponent, FooterComponent, NavbarComponent, SidenavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsLoggerPluginModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
