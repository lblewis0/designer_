import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './navigation/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { isAuthGuard } from './shared/guards/is-auth.guard';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "home", canActivate: [isAuthGuard], component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
