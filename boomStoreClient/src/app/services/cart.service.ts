import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../models/products/product.model';
import { CartItemInput } from '../models/carts/cart-item-input.model';
import { Cart } from '../models/carts/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartApiUrl = `${environment.apiUrl}Cart`;

  constructor(private http: HttpClient) { }

  getCart(): Observable<Cart> {

    return this.http.get<Cart>(`${this.cartApiUrl}/GetCart`);
  }

  addToCart(cartItem: CartItemInput): Observable<any> {

    return this.http.post(`${this.cartApiUrl}/AddToCart`, cartItem);
  }

  removeFromCart(id: number): Observable<any> {

    return this.http.delete(`${this.cartApiUrl}/RemoveFromCart/${id}`);
  }

  checkout(): Observable<any> {

    return this.http.get(`${this.cartApiUrl}/Checkout`);
  }
}
