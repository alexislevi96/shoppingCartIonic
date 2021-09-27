import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(public _cart: CartService) {
    this._cart.getProductsList();
  }
  ngOnInit(){
    this._cart.getProductsList();
  }

}
