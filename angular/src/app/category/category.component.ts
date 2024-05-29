import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from '../models/categories/category.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from './delete-category-dialog/delete-category-dialog.component';

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
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.loadCategories();
  }

  deleteCategory(category: Category): void {

    let deleteDialog = this.dialog.open(DeleteCategoryDialogComponent, {
      data: category
    });

    deleteDialog.afterClosed().subscribe({
      next: (answer: boolean) => {

        if (answer) {

          this.spinner.show();

          this.categorySvc.deleteCategory(category.id).subscribe({
            next: () => {

              this.toastr.success(`Category has been deleted successfully.`);
              this.loadCategories();
            },
            error: (err: HttpErrorResponse) => {

              this.toastr.error(err.message);
            },
            complete: () => {

              this.spinner.hide();
            }
          });
        }

      }
    });

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
