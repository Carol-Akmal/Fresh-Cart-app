import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CartService } from './service/cart.service';
import { CartDetails } from './models/cart-details.interface';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { STORED_KEYS } from '../../../core/constant/storedKey';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService)
  private readonly plat_id = inject(PLATFORM_ID)
  CartDetailsData: WritableSignal<CartDetails> = signal<CartDetails>({} as CartDetails)

  ngOnInit(): void {
    if (isPlatformBrowser(this.plat_id)) {
      const token = localStorage.getItem(STORED_KEYS.userToken)
      if (token) {
        this.getUserCartData()
      }
    }
  }
  getUserCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.cartCount.set(res.numOfCartItems)
          this.CartDetailsData.set(res.data)
        }
      },
      error: (err) => { console.log(err) }
    })
  }


  removeProductItemFromCart(id: string): void {
    this.cartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.cartCount.set(res.numOfCartItems)
          this.CartDetailsData.set(res.data)
        }
      },
      error: (err) => { console.log(err) }
    })
  }
  updateProductCount(id: string, count: number): void {
    this.cartService.UpdateCartProductQuantity(id, count).subscribe({
      next: (res) => {

        if (res.status === 'success') {
          this.cartService.cartCount.set(res.numOfCartItems)
          this.CartDetailsData.set(res.data)
        }
      },
      error: (err) => { console.log(err) }
    })
  }

}      
