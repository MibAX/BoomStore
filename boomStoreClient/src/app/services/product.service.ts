import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../models/products/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productApiUrl = `${environment.apiUrl}Products`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(`${this.productApiUrl}/GetProducts`)
  }
}
