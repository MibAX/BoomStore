import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../models/products/product.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: 'product.component.scss'
})
export class ProductComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productSvc: ProductService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.loadProducts();
  }

  deleteProduct(product: Product): void {

    let deleteDialog = this.dialog.open(DeleteProductDialogComponent, {
      data: product
    });

    deleteDialog.afterClosed().subscribe({
      next: (answer: boolean) => {

        if (answer) {

          this.spinner.show();

          this.productSvc.deleteProduct(product.id).subscribe({
            next: () => {

              this.toastr.success(`Product has been deleted successfully.`);
              this.loadProducts();
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

  private loadProducts(): void {

    this.spinner.show();

    this.productSvc.getProducts().subscribe({
      next: (productsFromApi: Product[]) => {

        this.products = productsFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(`${err.message}`, 'Product');
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  //#endregion
}
