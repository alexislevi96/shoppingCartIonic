import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  
  constructor(public _cart: CartService) { 
    this._cart.filterProducts = this._cart.products;
  }
  
  ngOnInit() {
    this._cart.filterProducts = this._cart.products;
  }

}
