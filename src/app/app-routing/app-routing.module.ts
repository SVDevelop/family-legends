import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from '../auth/auth.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';

import { CanActivateService } from '../services/can-activate.service';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: '', pathMatch: 'full', redirectTo: 'feed'},
  { path: '404', component: NotFoundComponent},

  { path: 'family', loadChildren: () => import('../pages/family/family.module').then(m => m.FamilyModule) },
  { path: 'feed', loadChildren: () => import('../pages/feed/feed.module').then(m => m.FeedModule), canActivate:[CanActivateService] },
  { path: 'places', loadChildren: () => import('../pages/places/places.module').then(m => m.PlacesModule), canActivate:[CanActivateService] },
  { path: 'person', loadChildren: () => import('../pages/person/person.module').then(m => m.PersonModule), canActivate:[CanActivateService] },
  { path: 'event', loadChildren: () => import('../pages/event/event.module').then(m => m.EventModule), canActivate:[CanActivateService] },
  { path: 'profile-edit', loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfileModule), canActivate:[CanActivateService]  },

  {path: '**', redirectTo: '/404'}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
