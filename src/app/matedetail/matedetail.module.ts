import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatedetailPageRoutingModule } from './matedetail-routing.module';

import { MatedetailPage } from './matedetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatedetailPageRoutingModule
  ],
  declarations: [MatedetailPage]
})
export class MatedetailPageModule {}
