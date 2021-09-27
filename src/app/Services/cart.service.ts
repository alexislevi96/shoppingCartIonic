import { Injectable } from '@angular/core';
import { Product } from '../product.model'; 
import {  ModalController, ToastController } from '@ionic/angular';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  totalDiscount=-1;
  codeDiscount="";
  codePorcent="00";
  codeApply="";
  products: any = [];
  // products: Product[] = [
  //   {
  //     _id: 1,
  //     code: "3S42JN43",
  //     description: "Hamburguesa",
  //     price: 400,
  //     quantity: 5,
  //     type: "fast-food-outline"
  //   },
  //   {
  //     _id: 2,
  //     code: "56D42N67",
  //     description: "Ropero",
  //     price: 10400,
  //     quantity: 1,
  //     type: "briefcase-outline"
  //   },
  //   {
  //     _id: 3,
  //     code: "66F2N67",
  //     description: "Chicle",
  //     price: 3,
  //     quantity: 30,
  //     type: "fast-food-outline"
  //   },
  // ];

  // filterProducts: Product[] = this.products;
  filterProducts: any = [];
  subscription: any;
  constructor(public toast: ToastController,
              public modal: ModalController,
              public router: Router,
              public http: HttpClient) { 
    this.total += 0;
    this.getProductsList();
    this.filterProducts = this.products;
    this.subscription = this.refresh.subscribe(()=>{
      this.getProductsList();
    });
  }
  filterProductsType($type){
    console.log($type.target.value);
    if($type.target.value == "all"){
      this.filterProducts = this.products;
    }else{
      // this.filterProducts = this.products.filter(product => {
      //   return product.type == ($type.target.value+"");
      // })
      this.getProductsType($type.target.value).subscribe(data => {
        this.filterProducts = data;
      }, error =>{
        console.log(error.message);
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
    // this.total = 0;
    // this.products.forEach(product => {
    //   this.total += product.price * product.quantity;
    // });
    // return this.total;
    return this.total;
  }
  getProduct(id){
    // const product = this.products.filter(p => {
    //   return p._id == id;
    // })
    // if(product.length > 0){
    //   return product[0];
    // }
    return 0;
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
        // _id: this.totalId,
        code: this.code,
        description :this.description,
        price: parseInt(this.price),
        quantity: this.quantity,
        type: this.type
      }
      // this.products.push(product);
      // this.total += product.price;
      this.createProduct(product).subscribe( data => {
        console.log(data);
      }, error => {
        this.presentToast(error.message,'danger');
      })
      this.clearForm();
      this.presentToast('Your pruduct item have been saved!','success');
    }
  }
  editQuantityProduct(_id, quantity){
    if(quantity > 0){
      var product;
      this.getProductId(_id).subscribe(data =>{
        product = data;
        product.quantity = quantity;
      }, error =>{
        console.log(error.message);
      });
      this.updateProduct(_id, product).subscribe(data =>{
        console.log(data);
      }, error =>{
        console.log(error);
      });
      // this.products.forEach( p => {
      //   if(p.id == id){
      //     p.quantity = quantity;
      //   }
      // });
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

  deletedProductCart(_id){
    
    this.deletedProduct(_id).subscribe(data =>{
      console.log(data);
      this.presentToast('Your pruduct item have been deleted!','danger');
    }, error =>{
      console.log(error.message);
    })
    // this.products = this.products.filter(product => {
    //   return product.id != id;
    // })
    // this.filterProducts = this.products;
  }

  verifyCode(code){
    var elementPorcent = document.querySelector('.porcent');
    if(code=="diproach"){
      console.log(elementPorcent);
      elementPorcent.removeAttribute('class');
      elementPorcent.classList.add("porcent-50","porcent");
      this.codePorcent = "50";
    }else if(code=="20off"){
      console.log(elementPorcent);
      elementPorcent.removeAttribute('class');
      elementPorcent.classList.add("porcent-20", "porcent");
      this.codePorcent = "20";
    }else{
      elementPorcent.removeAttribute('class');
      elementPorcent.classList.add("porcent");
      this.codePorcent = "00";
    }
  }
  getDiscount(){
    // this.totalDiscount = this.total - ((parseInt(this.codePorcent) * this.total) / 100);
    return this.totalDiscount;
  }

  addCode(code){
    if(this.codeDiscount.length > 0){
      console.log(this.codeDiscount.length );
      this.presentToast('Not Code','danger');
    }else{
      console.log(code.value, code.value.length);
      if(code.value=="diproach" || code.value=="20off"){
        // this.getDiscount();
        // this.totalDiscount = this.total - ((parseInt(this.codePorcent) * this.total) / 100);
        this.codeApply = this.codePorcent;
        // this.codePorcent = "00";
        this.router.navigate(['/home']);
        this.presentToast(`Your code was applied! Total: $${this.totalDiscount}`,'success');
      }else{
        this.presentToast('No Code Validate','danger');
      }
    }
  }

  sendProductAndCollect(total,productsSend){
    this.total += total;
    // Falta restar cantidad de productos enviados
  }
  
  getProductsList(){
    this.getProducts().subscribe(data =>{
      console.log(data);
      this.products = data;
    }, error =>{
      console.log(error);
    })
  }
  
  getProductsTypeList(type: String){
    this.getProductsType(type).subscribe(data => {
      this.filterProducts = data;
    },error =>{
      console.log(error.message);
    })
  }
  
  private _refresh$ = new Subject<void>();

  get refresh(){
    return this._refresh$;
  }

  createProduct(product){
    return this.http.post('http://localhost:5000/api/product/create-product', product).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }
  getProducts(){
    return this.http.get<Product>('http://localhost:5000/api/product/');
  }
  getProductId(_id: String){
    return this.http.get<Product>('http://localhost:5000/api/product/fetch-product/'+ _id);
  }
  getProductsType(type: String){
    return this.http.get<Product>('http://localhost:5000/api/product/product-type/'+type).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );    
  }
  deletedProduct(_id: String){
    return this.http.delete<Product>('http://localhost:5000/api/product/delete-product/'+ _id).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }
  updateProduct(_id:String, product: Product){
    return this.http.put<Product>('http://localhost:5000/api/product/update-product/'+ _id, product);
  } 
}

