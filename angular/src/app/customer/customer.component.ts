import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from '../models/categories/category.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../models/customers/customer.model';
import { CustomerService } from '../services/customer.service';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {

  dataSource = new MatTableDataSource<Customer>([]);

  displayedColumns: string[] = ['customerName', 'phoneNumber', 'age', 'gender', 'actions'];

  constructor(
    private customerSvc: CustomerService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.loadCustomer();
  }

  deleteCustomer(customer: Customer): void {

    let deleteDialog = this.dialog.open(DeleteCustomerComponent, {
      data: customer
    });

    deleteDialog.afterClosed().subscribe({
      next: (answer: boolean) => {

        if (answer) {

          this.spinner.show();

          this.customerSvc.deleteCustomer(customer.id).subscribe({
            next: () => {

              this.toastr.success(`Customer has been deleted successfully.`);
              this.loadCustomer();
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

  private loadCustomer(): void {

    this.spinner.show();

    this.customerSvc.getCustomers().subscribe({
      next: (customersFromApi: Customer[]) => {

        this.dataSource.data = customersFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(`${err.message}`, 'Customer');
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  //#endregion
}
