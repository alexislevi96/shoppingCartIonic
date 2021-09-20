import { Injectable } from '@angular/core';
import { Product } from '../product.model'; 
import {  ModalController, ToastController } from '@ionic/angular';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  code:any="";
  description:any="";
  price:any="";
  quantity:any="";
  type = "fast-food-outline";
  totalId=2;
  total = 0;
  codeDiscount=""
  products: Product[] = [
    {
      id: 1,
      code: "3S42JN43",
      description: "Hamburguesa",
      price: 400,
      quantity: 1,
      type: "fast-food-outline"
    },
    {
      id: 2,
      code: "56D42N67",
      description: "Ropero",
      price: 10400,
      quantity: 1,
      type: "briefcase-outline"
    },
  ];

  filterProducts: Product[] = this.products;

  constructor(public toast: ToastController,
              public modal: ModalController) { 
    this.total += 10800;
  }
  filterProductsType($type){
    console.log($type.target.value);
    if($type.target.value == "all"){
      this.filterProducts = this.products;
    }else{
      this.filterProducts = this.products.filter(product => {
        return product.type == ($type.target.value+"");
      })
    }
  }
  async presentToast(message,color) {
    const toast = await this.toast.create({
      message,
      duration: 2000,
      // position: 'top',
      color,
    });
    toast.present();
  }
  
  getTotal(){
    this.total = 0;
    this.products.forEach(product => {
      this.total += product.price * product.quantity;
    });
    return this.total;
  }

  clearForm(){
    this.code = "";
    this.description = "";
    this.price = "";
    this.quantity = "";
    this.type = "fast-food-outline"
  }

  addProductCart(){
    if(this.code == "" ||
       this.price == "" ||
       this.description == "" ||
       this.quantity == ""){
       this.presentToast('All fields are required!','danger');    
    }else if(parseInt(this.quantity) == 0 || parseInt(this.price) == 0){
      this.presentToast('The quantity or price cannot be 0!','danger');
    }else{
      this.totalId += 1;
      const product = {
        id: this.totalId,
        code: this.code,
        description :this.description,
        price: parseInt(this.price) * parseInt(this.quantity),
        quantity: this.quantity,
        type: this.type
      }
      this.products.push(product);
      this.total += product.price;
      console.log(this.products);
      this.clearForm();
      this.presentToast('Your pruduct item have been saved!','success');
    }
  }
  editQuantityProduct(id, quantity){
    if(quantity > 0){
      this.products.forEach( p => {
        if(p.id == id){
          p.quantity = quantity;
        }
      });
      this.quantity = "";
      this.closeModal();
      this.presentToast('Your pruduct item have been actualize!','success');
    }else{
      this.presentToast('The quantity cannot be 0!','danger');
    }
  }
  closeModal(){
    this.modal.dismiss();
  }

  deletedProductCart(id){
    this.presentToast('Your pruduct item have been deleted!','danger');
    this.products = this.products.filter(product => {
      return product.id != id;
    })
    this.filterProducts = this.products;
  }

  addCode(){

  }
}
