import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from '../models/categories/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.sass'
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categorySvc: CategoryService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.loadCategories();
  }

  deleteCategory(category: Category): void {

    // TO DO open delete mat-Dialog
  }


  //#region Private Functions

  private loadCategories(): void {

    this.spinner.show();

    this.categorySvc.getCategories().subscribe({
      next: (categoriesFromApi: Category[]) => {

        this.categories = categoriesFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(`${err.message}`, 'Category');
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  //#endregion
}
