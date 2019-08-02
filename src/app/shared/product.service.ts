import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  formData: Product;
  productList: Product[];
  constructor(private httpClient: HttpClient) { }

  readonly rootURL = "https://localhost:44339/api/";

  postProduct(formData: Product, fileToUpload: File) {
    let formToPost = new FormData();
    let requestToPost = JSON.stringify({
      Productname: formData.Productname,
      Price: formData.Price,
      Description: formData.Description,
      Image: fileToUpload.name
    })

    formToPost.append("product", requestToPost)
    formToPost.append("imagen", fileToUpload, fileToUpload.name);

    return this.httpClient.post(this.rootURL + "products", formToPost);
  }

  getProducts() {
    this.httpClient.get(this.rootURL + "Products")
      .toPromise()
      .then(
        res => {
          this.productList = res as Product[];
        }
      )
  }

  deleteProduct(id:number){
    return this.httpClient.delete(this.rootURL+"Products/"+id);
  }
}
