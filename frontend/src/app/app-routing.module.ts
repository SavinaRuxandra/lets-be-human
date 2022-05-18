import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './views/create-post/create-post.component';
import { HomeComponent } from './views/home/home.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { SinglePostComponent } from './views/single-post/single-post.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'post/:id', component: SinglePostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
