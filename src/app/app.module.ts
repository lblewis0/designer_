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
import { TestComponent } from './components/test/test.component';
import { ContextMenuComponent } from './navigation/context-menu/context-menu.component';
import { ContextHomeComponent } from './components/home/context-home/context-home.component';
import { ComponentsComponent } from './components/home/components/components.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    ProjectsComponent,
    TestComponent,
    ContextMenuComponent,
    ContextHomeComponent,
    ComponentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
