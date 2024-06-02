import { Component, OnInit } from '@angular/core';
import { ProductDetails } from '../../models/products/productDetails.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  productId!: number;
  product?: ProductDetails;

  constructor(
    private productSvc: ProductService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    this.setId();
    this.loadProduct();

  }

  //#region Private Functions 

  private setId(): void {

    if (this.activatedRoute.snapshot.paramMap.get("id")) {

      this.productId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    }
  }

  private loadProduct(): void {

    this.spinner.show();

    this.productSvc.getProduct(this.productId).subscribe({
      next: (productFromApi: ProductDetails) => {

        this.product = productFromApi;
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
