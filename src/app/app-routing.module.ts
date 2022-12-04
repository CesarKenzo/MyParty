import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';

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
  {
    path:'login',
    component: LoginPageComponent
  },
  {
    path:'signup',
    component: SignupPageComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
