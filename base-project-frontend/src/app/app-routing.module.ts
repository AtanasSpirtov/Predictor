import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {LoggedUserGuard} from "./guard/logged-user.guard";
import {AnonymousUserGuard} from "./guard/anonymous-user.guard";
import {IndexComponent} from "./index/index.component";
import {CreateRequestComponent} from "./create-request/create-request.component";
import {
  ViewPredictionRequestResponseComponent
} from "./view-prediction-request-response/view-prediction-request-response.component";

const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [AnonymousUserGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AnonymousUserGuard] },
  { path: 'home', component: HomeComponent, canActivate: [LoggedUserGuard] },
  { path: 'home/create-request', component: CreateRequestComponent, canActivate: [LoggedUserGuard] },
  { path: 'home/view_request', component: ViewPredictionRequestResponseComponent, canActivate: [LoggedUserGuard] }, // Define route with parameter
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
