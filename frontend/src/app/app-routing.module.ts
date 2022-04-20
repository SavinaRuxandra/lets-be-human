import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './views/create-post/create-post.component';
import { HomeComponent } from './views/home/home.component';
import { RegisterCharityOrganizationComponent } from './views/register/register-charity-organization/register-charity-organization.component';
import { MainPageComponent } from './views/main-page/main-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'register-charity-organization', component: RegisterCharityOrganizationComponent },
  { path: 'create-post', component: CreatePostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
