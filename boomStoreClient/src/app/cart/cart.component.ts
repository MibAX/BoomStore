import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/carts/cart.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../models/carts/cart-item.model';

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

    this.loadCart();
  }

  removeFromCart(cartItem: CartItem): void {

    this.spinner.show();

    this.cartSvc.removeFromCart(cartItem.id).subscribe({
      next: () => {

        this.toastr.success(`${cartItem.product.name} has been removed from your cart successfully.`);
        this.loadCart();
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  //#region Private Functions

  private loadCart(): void {

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
