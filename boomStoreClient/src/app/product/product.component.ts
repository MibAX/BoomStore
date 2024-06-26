import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/products/product.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/carts/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.sass'
})
export class ProductComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productSvc: ProductService,
    private cartSvc: CartService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.loadProducts();
  }

  addToCart(product: Product): void {

    const cartItem: CartItem = {
      productId: product.id,
      quantity: 1 // This is ALWAYS one here because ( + ) add to cart adds ONLY 1 item
    }

    this.spinner.show();

    this.cartSvc.addToCart(cartItem).subscribe({
      next: () => {

        this.toastr.success(`Product: ${product.name} has been added to your cart successfully.`);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });
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
