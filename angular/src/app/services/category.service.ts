import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/categories/category.model';
import { CreateUpdateCategory } from '../models/categories/createUpdateCategory.model';
import { CategoryDetails } from '../models/categories/categoryDetails.model';
import { Lookup } from '../shared/models/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryApiUrl: string = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {

    return this.http.get<Category[]>(`${this.categoryApiUrl}/GetCategories`);
  }

  getCategory(id: number): Observable<CategoryDetails> {

    return this.http.get<CategoryDetails>(`${this.categoryApiUrl}/GetCategory/${id}`);
  }

  getCategoryForEdit(id: number): Observable<CreateUpdateCategory> {

    return this.http.get<CreateUpdateCategory>(`${this.categoryApiUrl}/GetCategoryForEdit/${id}`);
  }

  createCategory(createUpdateCategory: CreateUpdateCategory): Observable<any> {

    return this.http.post(`${this.categoryApiUrl}/CreateCategory`, createUpdateCategory);
  }

  updateCategory(createUpdateCategory: CreateUpdateCategory): Observable<any> {

    return this.http.put(`${this.categoryApiUrl}/EditCategory/${createUpdateCategory.id}`, createUpdateCategory);
  }

  deleteCategory(id: number): Observable<any> {

    return this.http.delete(`${this.categoryApiUrl}/DeleteCategory/${id}`);
  }

  getCategoryLookup(): Observable<Lookup[]> {

    return this.http.get<Lookup[]>(`${this.categoryApiUrl}/GetCategoryLookup`);
  }
}
