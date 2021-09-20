import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-code-discount',
  templateUrl: './code-discount.page.html',
  styleUrls: ['./code-discount.page.scss'],
})
export class CodeDiscountPage implements OnInit {

  constructor(public _cart: CartService) { }

  ngOnInit() {
  }

}
