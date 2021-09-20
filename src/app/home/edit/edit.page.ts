import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  @Input() id: string;
  @Input() description: string;
  @Input() price: string;

  constructor(public _cart: CartService,
              public modal: ModalController) { 
    this._cart.quantity = "";
  }

  ngOnInit() {
    this._cart.quantity = "";
  }
  closeModal(){
    this.modal.dismiss();
  }
}
