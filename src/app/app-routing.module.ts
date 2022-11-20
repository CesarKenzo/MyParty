import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'event-list',
    pathMatch: 'full'
  },
  {
    path: 'event/:id',
    component: EventPageComponent
  },
  {
    path: 'shop', 
    component: ShopPageComponent
  },
  {
    path: 'shop/:id', 
    component: ShopPageComponent
  },  
  {
    path: 'marketplace',
    component: MarketplaceComponent
  }, 
  {
    path:'event-list',
    component: EventListComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
