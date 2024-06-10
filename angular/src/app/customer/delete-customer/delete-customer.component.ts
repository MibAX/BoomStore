import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../../category/delete-category-dialog/delete-category-dialog.component';
import { Customer } from '../../models/customers/customer.model';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrl: './delete-customer.component.scss'
})
export class DeleteCustomerComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public customer: Customer,
  ) { }
}
