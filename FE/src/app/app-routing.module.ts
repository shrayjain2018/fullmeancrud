import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemlistComponent } from './components/itemlist/itemlist.component';

const routes: Routes = [
  { path: '', component: ItemlistComponent },
  { path: 'list', component: ItemlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
