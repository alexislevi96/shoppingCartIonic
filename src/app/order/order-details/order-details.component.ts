import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {

  constructor(public _order: OrderService,
              public _cart: CartService) { }

  ngOnInit() {}

}
