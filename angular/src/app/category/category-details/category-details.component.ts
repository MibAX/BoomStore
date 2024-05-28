import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/categories/category.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryDetails } from '../../models/categories/categoryDetails.model';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {

  categoryId!: number;
  category?: CategoryDetails;

  constructor(
    private categorySvc: CategoryService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.loadCategoryOnIdChange();

  }

  //#region Private Functions

  private loadCategoryOnIdChange(): void {

    this.activatedRoute.params.subscribe({
      next: (params: Params) => {

        this.categoryId = Number(params["id"]);
        this.loadCategory();
      }
    });

  }

  private loadCategory(): void {

    this.spinner.show();

    this.categorySvc.getCategory(this.categoryId).subscribe({
      next: (categoryFromApi: CategoryDetails) => {

        this.category = categoryFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }

    });
  }

  //#endregion
}
