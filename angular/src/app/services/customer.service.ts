import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Customer } from '../models/customers/customer.model';
import { CustomerDetails } from '../models/customers/customerDetails.model';
import { CreateUpdateCustomer } from '../models/customers/createUpdateCustomer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl: string = `${environment.apiUrl}/Customers`;

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {

    return this.http.get<Customer[]>(`${this.apiUrl}/GetCustomers`);
  }

  getCustomer(id: number): Observable<CustomerDetails> {

    return this.http.get<CustomerDetails>(`${this.apiUrl}/GetCustomer/${id}`);
  }

  getCustomerForEdit(id: number): Observable<CreateUpdateCustomer> {

    return this.http.get<CreateUpdateCustomer>(`${this.apiUrl}/GetCustomerForEdit/${id}`);
  }

  createCustomer(customer: CreateUpdateCustomer): Observable<any> {

    return this.http.post<CreateUpdateCustomer>(`${this.apiUrl}/CreateCustomer`, customer);
  }

  editCustomer(id: number, customer: CreateUpdateCustomer): Observable<any> {

    return this.http.put<CreateUpdateCustomer>(`${this.apiUrl}/EditCustomer/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/DeleteCustomer/${id}`);
  }
}
