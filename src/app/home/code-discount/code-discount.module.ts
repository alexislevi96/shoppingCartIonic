import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeDiscountPageRoutingModule } from './code-discount-routing.module';

import { CodeDiscountPage } from './code-discount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodeDiscountPageRoutingModule
  ],
  declarations: [CodeDiscountPage]
})
export class CodeDiscountPageModule {}
