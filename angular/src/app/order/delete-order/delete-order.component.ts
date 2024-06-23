import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../models/customers/customer.model';
import { Order } from '../../models/orders/order.model';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrl: './delete-order.component.scss'
})
export class DeleteOrderComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public order: Order,
  ) { }

}