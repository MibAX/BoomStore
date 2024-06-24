import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/products/product.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.sass'
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

  getImageUrl(product: Product): string {

    const categoryName = product.categoryName.toLowerCase(); // GPU => gpu
    let fullPath: string = 'products/';

    if (categoryName === 'gpu') {

      fullPath += `gpu/${product.imageName}`
    }
    else if (categoryName === 'laptop') {

      fullPath += `laptop/${product.imageName}`
    }
    else if (categoryName === 'peripheral') {

      fullPath += `peripheral/${product.imageName}`
    }


    return fullPath;
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
