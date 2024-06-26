import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../models/products/product.model';
import { CartItem } from '../models/carts/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartApiUrl = `${environment.apiUrl}Cart`;

  constructor(private http: HttpClient) { }

  addToCart(cartItem: CartItem): Observable<any> {

    return this.http.post(`${this.cartApiUrl}/AddToCart`, cartItem);
  }
}
