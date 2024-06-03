import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PageMode } from '../../enums/pageMode.enum';
import { CreateUpdateProduct } from '../../models/products/createUpdateProduct.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrl: './create-update-product.component.scss'
})
export class CreateUpdateProductComponent implements OnInit {

  productId!: number;
  form!: FormGroup;

  product?: CreateUpdateProduct;
  pageMode: PageMode = PageMode.Create;

  pageModeEnum = PageMode;

  constructor(
    private productSvc: ProductService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.setId();
    this.buildForm();

    if (this.pageMode === PageMode.Update) {

      this.loadProduct();
    }
  }

  submit(): void {

    if (this.form.valid) {

      if (this.pageMode === PageMode.Create) {

        this.createProduct();
      }
      else {

        this.updateProduct();
      }
    }
  }


  //#region Private Methods

  private setId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.Update;
    }

  }

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      barCode: ['', Validators.required],
      rating: [''],
      price: ['', Validators.required],
      description: [''],
      categoryId: ['', Validators.required]
    });

  }

  private loadProduct(): void {

    this.spinner.show();

    this.productSvc.getProductForEdit(this.productId).subscribe({
      next: (productFromApi: CreateUpdateProduct) => {

        this.product = productFromApi;
        this.form.patchValue(productFromApi);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message)
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  private createProduct(): void {

    throw new Error('createProduct not implemented.');
  }

  private updateProduct(): void {

    throw new Error('updateProduct not implemented.');
  }

  //#endregion
}
