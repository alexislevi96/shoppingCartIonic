import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/Services/cart.service';
import { EditPage } from '../edit/edit.page';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  
  constructor(public _cart: CartService,
              public modal: ModalController) { 
    this._cart.filterProducts = this._cart.products;
  }

  async editQuantityProduct(id, description, price){
    const modal = await this.modal.create({
      component: EditPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'id': id,
        'description': description,
        'price': price
      }
    });
    return await modal.present();
  }
  
  ngOnInit() {
    this._cart.filterProducts = this._cart.products;
  }

}
