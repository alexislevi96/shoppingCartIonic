import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor(public _cart: CartService,
              public _order: OrderService) { 
    this._cart.getTotal();
  }

  ngOnInit() {
    this._cart.getTotal();
  }

}
