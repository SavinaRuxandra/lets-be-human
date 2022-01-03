import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './views/start/start.component';
import { TransferComponent } from './views/transfer/transfer.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'transfer', component: TransferComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
