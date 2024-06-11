import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PageMode } from '../../enums/pageMode.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from '../../services/customer.service';
import { CreateUpdateCustomer } from '../../models/customers/createUpdateCustomer.model';

@Component({
  selector: 'app-create-update-customer',
  templateUrl: './create-update-customer.component.html',
  styleUrl: './create-update-customer.component.scss'
})
export class CreateUpdateCustomerComponent implements OnInit {

  customerId!: number;
  form!: FormGroup;

  customer?: CreateUpdateCustomer;
  pageMode: PageMode = PageMode.Create;

  pageModeEnum = PageMode;

  constructor(
    private customerSvc: CustomerService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.setId();
    this.buildForm();

    if (this.pageMode === PageMode.Update) {

      this.loadCustomer();
    }
  }

  submit(): void {

    if (this.form.valid) {

      if (this.pageMode === PageMode.Create) {

        this.createCustomer();
      }
      else {

        this.updateCustomer();
      }
    }
  }

  //#region Private Methods

  private setId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.customerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.Update;
    }

  }

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: [0],
      gender: ['', Validators.required],
    });

  }

  private loadCustomer(): void {

    this.spinner.show();

    this.customerSvc.getCustomerForEdit(this.customerId).subscribe({
      next: (customerFromApi: CreateUpdateCustomer) => {

        this.customer = customerFromApi;
        this.form.patchValue(customerFromApi);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  private createCustomer(): void {

    this.spinner.show();

    this.customerSvc.createCustomer(this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Customer has been created successfully.`);
        this.router.navigate(['/customer']);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private updateCustomer(): void {

    this.spinner.show();

    this.customerSvc.updateCustomer(this.customerId, this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Product has been updated successfully.`);
        this.router.navigate(['/customer']);
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

