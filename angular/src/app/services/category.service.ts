import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/categories/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryApiUrl: string = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {

    return this.http.get<Category[]>(`${this.categoryApiUrl}/GetCategories`);
  }
}
