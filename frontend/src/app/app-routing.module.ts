import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './views/post/post.component';
import { StartComponent } from './views/start/start.component';
import { TransferComponent } from './views/transfer/transfer.component';

const routes: Routes = [
  { path: '', redirectTo: '/post', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'post', component: PostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
