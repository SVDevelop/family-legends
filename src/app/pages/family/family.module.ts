import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyRoutingModule } from './family-routing.module';
import { FamilyComponent } from './family.component';
import { FamilyNewComponent } from '../../components/family-new/family-new.component';
import { FamilySetComponent } from '../../components/family-set/family-set.component';


@NgModule({
  declarations: [FamilyComponent, FamilyNewComponent, FamilySetComponent],
  imports: [
    CommonModule,
    FamilyRoutingModule
  ],
  exports: [FamilyNewComponent, FamilySetComponent]
})
export class FamilyModule { }
