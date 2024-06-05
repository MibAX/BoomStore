import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from '../models/categories/category.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from './delete-category-dialog/delete-category-dialog.component';
import { PagedList } from '../models/pagers/pagedList.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.sass'
})
export class CategoryComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>([]);
  totalItems: number = 0;

  displayedColumns: string[] = ['name', 'description', 'actions'];


  constructor(
    private categorySvc: CategoryService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.loadCategories(0, 2);
  }

  ngAfterViewInit(): void {

    this.setupPager();
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
              this.loadCategories(this.paginator.pageIndex, this.paginator.pageSize);
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

  private loadCategories(pageIndex: number, pageSize: number): void {

    this.spinner.show();

    this.categorySvc.getPagedCategories(pageIndex, pageSize).subscribe({
      next: (pagedList: PagedList<Category>) => {

        this.dataSource.data = pagedList.items;
        this.totalItems = pagedList.totalItems;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(`${err.message}`, 'Category');
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  private setupPager(): void {

    this.paginator.page.pipe(
      tap(() => this.loadCategories(this.paginator.pageIndex, this.paginator.pageSize))
    ).subscribe();
  }

  //#endregion
}
