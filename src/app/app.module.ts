import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './navigation/login/login.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './shared/shared/shared/shared.module';
import { ProjectsComponent } from './components/home/projects/projects.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContextHomeComponent } from './components/home/context-home/context-home.component';
import { ComponentsComponent } from './components/home/components/components.component';
import { ContextHomeComponentFileComponent } from './navigation/context-home-component-file/context-home-component-file.component';
import { ContextHomeComponentFolderComponent } from './navigation/context-home-component-folder/context-home-component-folder.component';
import { ContextHomeProjectComponent } from './navigation/context-home-project/context-home-project.component';
import { AutoFocusDirective } from './shared/directives/auto-focus.directive';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from './shared/services/authentification/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    ProjectsComponent,
    ContextHomeComponent,
    ComponentsComponent,
    ContextHomeComponentFileComponent,
    ContextHomeComponentFolderComponent,
    ContextHomeProjectComponent,
    AutoFocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
