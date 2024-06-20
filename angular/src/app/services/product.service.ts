import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products/product.model';
import { ProductDetails } from '../models/products/productDetails.model';
import { CreateUpdateProduct } from '../models/products/createUpdateProduct.model';
import { Lookup } from '../shared/models/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productApiUrl: string = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(`${this.productApiUrl}/GetProducts`);
  }

  getProduct(id: number): Observable<ProductDetails> {

    return this.http.get<ProductDetails>(`${this.productApiUrl}/GetProduct/${id}`);
  }

  getProductForEdit(id: number): Observable<CreateUpdateProduct> {

    return this.http.get<CreateUpdateProduct>(`${this.productApiUrl}/GetProductForEdit/${id}`);
  }

  createProduct(createUpdateProduct: CreateUpdateProduct): Observable<any> {

    return this.http.post(`${this.productApiUrl}/CreateProduct`, createUpdateProduct);
  }

  updateProduct(createUpdateProduct: CreateUpdateProduct): Observable<any> {

    return this.http.put(`${this.productApiUrl}/EditProduct/${createUpdateProduct.id}`, createUpdateProduct);
  }

  deleteProduct(id: number): Observable<any> {

    return this.http.delete(`${this.productApiUrl}/DeleteProduct/${id}`);
  }

  getProductLookup(): Observable<Lookup[]> {

    return this.http.get<Lookup[]>(`${this.productApiUrl}/GetProductLookup`);
  }

}
