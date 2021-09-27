import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../product.model'; 
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderProductList = [];

  client: string = "";
  productsSelectedList=[];

  productSelectedCard;
  productSelectedDetail;
  total = 0;
  constructor(public _cart: CartService,
              public router: Router,
              public http: HttpClient) { }

  changeQuantity(number, id){
    this.productSelectedCard = this._cart.getProduct(id);

    this.productSelectedDetail= this.productsSelectedList.filter( p => {
      return p.id == id;
    })[0];

    if(this.productSelectedDetail.quantity + number != 0 && 
      this.productSelectedDetail.quantity + number <= this.productSelectedCard.quantity){
      
      this.productSelectedDetail.quantity += number;
      this.total += this.productSelectedDetail.price * number;
    }
  }
  selectCard(id){
    var pro = this.productsSelectedList.filter(p => {
      return p.id == id;
    });
    if(pro.length == 0){
      let product = JSON.parse(JSON.stringify(this._cart.getProduct(id)));
      product.quantity = 1;
      this.productsSelectedList.push(product);
      this.total += product.price;
    }
  }
  deletedProductOrder(id){
    this.productsSelectedList = this.productsSelectedList.filter(product => {
      if(product.id == id){
        this.total -= product.price * product.quantity;
      }
      return product.id != id;
    })
  }

  sendOrder(){
    if(this.client.length > 0 && this.productsSelectedList.length > 0){
      var order = {
        client: this.client,
        total: this.total,
        products: this.productsSelectedList  
      }
      this.createOrder(order).subscribe(data =>{
        console.log(data);
      }, error =>{
        console.log(error.message);
      });

      // this.orderProductList.push(order);
      this.productsSelectedList = [];
      this.productSelectedCard = "";
      this.productSelectedDetail = "";
      this.total = 0;
      this.client = "";
      // Funcion que suma al total del carrito
      // y que descuente la cantidad de productos que envio
      this._cart.sendProductAndCollect(order.total, order.products);
      
      this.router.navigate(['/order-list']);
      this._cart.presentToast(`Your order was sent`,'success');
    }else{
      this._cart.presentToast('There are no products in the order or no client','danger');
    }
  }
  
  createOrder(order){
    return this.http.post('http://localhost:5000/api/order/create-order', order);
  }
  getOrders(){
    return this.http.get('http://localhost:5000/api/order/');
  }
  deletedOrder(id: String){
    return this.http.delete('http://localhost:5000/api/order/delete-order'+ id);
  }

}
