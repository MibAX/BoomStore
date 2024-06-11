import { Component, OnInit } from '@angular/core';
import { CustomerDetails } from '../../models/customers/customerDetails.model';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent implements OnInit {

  customerId!: number;
  customer?: CustomerDetails;
  starRating: number = 0;

  constructor(
    private customerSvc: CustomerService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    this.setId();
    this.loadCustomer();

  }

  //#region Private Functions 

  private setId(): void {

    if (this.activatedRoute.snapshot.paramMap.get("id")) {

      this.customerId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    }
  }

  private loadCustomer(): void {

    this.spinner.show();

    this.customerSvc.getCustomer(this.customerId).subscribe({
      next: (customerFromApi: CustomerDetails) => {

        this.customer = customerFromApi;
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
