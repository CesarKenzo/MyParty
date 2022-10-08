import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventPageComponent } from './components/event-page/event-page.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'event',
    pathMatch: 'full'
  },
  {
    path: 'event',
    component: EventPageComponent
  },
  {
    path: 'shop', 
    component: ShopPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
