import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PageMode } from '../../enums/pageMode.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderService } from '../../services/order.service';
import { CreateUpdateOrder } from '../../models/orders/createUpdateOrder.model';
import { CustomerService } from '../../services/customer.service';
import { Lookup } from '../../shared/models/lookup.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-update-order',
  templateUrl: './create-update-order.component.html',
  styleUrl: './create-update-order.component.scss'
})
export class CreateUpdateOrderComponent implements OnInit {

  customerLookup: Lookup[] = [];
  productLookup: Lookup[] = [];

  orderId!: number;
  form!: FormGroup;

  order?: CreateUpdateOrder;
  pageMode: PageMode = PageMode.Create;

  pageModeEnum = PageMode;

  constructor(
    private orderSvc: OrderService,
    private customerSvc: CustomerService,
    private productSvc: ProductService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadLookups();
    this.setId();
    this.buildForm();

    if (this.pageMode === PageMode.Update) {

      this.loadOrder();
    }
  }

  submit(): void {

    if (this.form.valid) {

      if (this.pageMode === PageMode.Create) {

        this.createOrder();
      }
      else {

        this.updateOrder();
      }
    }
  }

  //#region Private Methods

  private loadLookups(): void {

    this.loadProductLookup();
    this.loadCustomerLookup();
  }

  private loadProductLookup(): void {

    this.spinner.show();

    this.productSvc.getProductLookup().subscribe({
      next: (productLookupFromApi: Lookup[]) => {

        this.productLookup = productLookupFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message)
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private loadCustomerLookup(): void {

    this.spinner.show();

    this.customerSvc.getCustomerLookup().subscribe({
      next: (customerLookupFromApi: Lookup[]) => {

        this.customerLookup = customerLookupFromApi;
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

      this.orderId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.Update;
    }

  }

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      note: [''],
      customerId: ['', Validators.required],
      orderProducts: this.fb.array([])
    });

  }

  private createOrderProduct(): FormGroup {
    return this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, Validators.required]
    });
  }

  private patchOrderProduct(productId: number, quantity: number): FormGroup {
    return this.fb.group({
      productId: [productId, Validators.required],
      quantity: [quantity, Validators.required]
    });
  }

  addOrderProduct(): void {
    this.orderProductsFormArray.push(this.createOrderProduct());
  }

  get orderProductsFormArray(): FormArray {
    return this.form.get('orderProducts') as FormArray;
  }

  removeItem(index: number): void {
    this.orderProductsFormArray.removeAt(index);
  }

  private loadOrder(): void {

    this.spinner.show();

    this.orderSvc.getOrderForEdit(this.orderId).subscribe({
      next: (orderFromApi: CreateUpdateOrder) => {

        this.order = orderFromApi;
        this.patchForm(orderFromApi);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  private patchForm(orderFromApi: CreateUpdateOrder): void {

    this.form.patchValue({
      id: orderFromApi.id,
      note: orderFromApi.note,
      customerId: orderFromApi.customerId,
    });

    orderFromApi.orderProducts.forEach(orderProduct => {
      this.orderProductsFormArray.push(this.patchOrderProduct(orderProduct.productId, orderProduct.quantity))
    });
  }

  private createOrder(): void {

    this.spinner.show();

    this.orderSvc.createOrder(this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Order has been created successfully.`);
        this.router.navigate(['/order']);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private updateOrder(): void {

    this.spinner.show();

    this.orderSvc.updateOrder(this.orderId, this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Order has been updated successfully.`);
        this.router.navigate(['/order']);
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

