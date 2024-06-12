import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../models/orders/order.model';
import { OrderService } from '../services/order.service';
import { DeleteOrderComponent } from './delete-order/delete-order.component';
import { OrderStatus } from '../enums/orderStatus.enum';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {

  dataSource = new MatTableDataSource<Order>([]);

  displayedColumns: string[] = ['id', 'customer', 'totalPrice', 'orderDate', 'orderStatus', 'note', 'actions'];

  orderStatusEnum = OrderStatus;

  constructor(
    private orderSvc: OrderService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.loadOrder();
  }

  deleteOrder(order: Order): void {

    let deleteDialog = this.dialog.open(DeleteOrderComponent, {
      data: order
    });

    deleteDialog.afterClosed().subscribe({
      next: (answer: boolean) => {

        if (answer) {

          this.spinner.show();

          this.orderSvc.deleteOrder(order.id).subscribe({
            next: () => {

              this.toastr.success(`Order has been deleted successfully.`);
              this.loadOrder();
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

  private loadOrder(): void {

    this.spinner.show();

    this.orderSvc.getOrders().subscribe({
      next: (ordersFromApi: Order[]) => {

        this.dataSource.data = ordersFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(`${err.message}`, 'Order');
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  //#endregion
}
