import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/carts/cart.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.sass'
})
export class CartComponent implements OnInit {

  cart?: Cart;

  constructor(
    private cartSvc: CartService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.getCart();
  }

  //#region Private Functions

  private getCart(): void {

    this.spinner.show();

    this.cartSvc.getCart().subscribe({
      next: (cartFromApi: Cart) => {

        this.cart = cartFromApi;
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
