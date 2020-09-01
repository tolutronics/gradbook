import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatedetailPage } from './matedetail.page';

const routes: Routes = [
  {
    path: '',
    component: MatedetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatedetailPageRoutingModule {}
