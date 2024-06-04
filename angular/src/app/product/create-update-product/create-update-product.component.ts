import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PageMode } from '../../enums/pageMode.enum';
import { CreateUpdateProduct } from '../../models/products/createUpdateProduct.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';
import { Lookup } from '../../shared/models/lookup.model';

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

  categoryLookup: Lookup[] = [];

  constructor(
    private productSvc: ProductService,
    private categorySvc: CategoryService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.loadCategoryLookup();
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


  get priceControl() {

    return this.form.controls["price"];
  }

  //#region Private Methods

  private loadCategoryLookup(): void {

    this.spinner.show();

    this.categorySvc.getCategoryLookup().subscribe({
      next: (categoryLookupFromApi: Lookup[]) => {

        this.categoryLookup = categoryLookupFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message)
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

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
      rating: [0],
      price: ['', [Validators.required, Validators.max(9999.99)]],
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

    this.spinner.show();

    this.productSvc.createProduct(this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Product has been created successfully.`);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private updateProduct(): void {

    this.spinner.show();

    this.productSvc.updateProduct(this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Product has been updated successfully.`);
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
