import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyComponent } from './family.component';
import { FamilyNewComponent } from '../../components/family-new/family-new.component';
import { FamilySetComponent } from '../../components/family-set/family-set.component';

const routes: Routes = [
  { path: 'new', component: FamilyNewComponent },
  { path: 'choose', component: FamilySetComponent },
  { path: '', component: FamilyComponent },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyRoutingModule { }
