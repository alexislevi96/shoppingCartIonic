import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeDiscountPage } from './code-discount.page';

const routes: Routes = [
  {
    path: '',
    component: CodeDiscountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeDiscountPageRoutingModule {}
