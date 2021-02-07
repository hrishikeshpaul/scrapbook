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
import { NavbarComponent } from './modules/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AlbumListComponent } from './modules/album-list/album-list.component';
import { SearchComponent } from './modules/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UIState } from './stores/ui.state';
import { UserState } from './stores/user.state';
import { HomeComponent } from './modules/home/home.component';
import { StarredComponent } from './modules/starred/starred.component';
import { AlbumComponent } from './components/album/album.component';
import {DataState} from './stores/data.state';
import { InfoComponent } from './components/info/info.component';
import { AlbumState } from './stores/album.state';
import { UploadComponent } from './components/upload/upload.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [AppComponent, LandingComponent, RootComponent, FooterComponent, NavbarComponent, SidenavComponent, AlbumListComponent, SearchComponent, ProfileComponent, HomeComponent, StarredComponent, AlbumComponent, InfoComponent, UploadComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([UIState, UserState, DataState, AlbumState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsLoggerPluginModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    NgxDropzoneModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
