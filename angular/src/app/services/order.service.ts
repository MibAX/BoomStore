import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Order } from '../models/orders/order.model';
import { OrderDetails } from '../models/orders/orderDetails.model';
import { CreateUpdateOrder } from '../models/orders/createUpdateOrder.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl: string = `${environment.apiUrl}/Orders`;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {

    return this.http.get<Order[]>(`${this.apiUrl}/GetOrders`);
  }

  getOrder(id: number): Observable<OrderDetails> {

    return this.http.get<OrderDetails>(`${this.apiUrl}/GetOrder/${id}`);
  }

  getOrderForEdit(id: number): Observable<CreateUpdateOrder> {

    return this.http.get<CreateUpdateOrder>(`${this.apiUrl}/GetOrderForEdit/${id}`);
  }

  createOrder(order: CreateUpdateOrder): Observable<any> {

    return this.http.post<CreateUpdateOrder>(`${this.apiUrl}/CreateOrder`, order);
  }

  updateOrder(id: number, order: CreateUpdateOrder): Observable<any> {

    return this.http.put<CreateUpdateOrder>(`${this.apiUrl}/EditOrder/${id}`, order);
  }

  deleteOrder(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/DeleteOrder/${id}`);
  }
}
