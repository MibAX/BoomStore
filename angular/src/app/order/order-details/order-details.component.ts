import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderDetails } from '../../models/orders/orderDetails.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {

  orderId!: number;
  order?: OrderDetails;
  starRating: number = 0;

  constructor(
    private orderSvc: OrderService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    this.setId();
    this.loadOrder();

  }

  //#region Private Functions 

  private setId(): void {

    if (this.activatedRoute.snapshot.paramMap.get("id")) {

      this.orderId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    }
  }

  private loadOrder(): void {

    this.spinner.show();

    this.orderSvc.getOrder(this.orderId).subscribe({
      next: (orderFromApi: OrderDetails) => {

        this.order = orderFromApi;
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
