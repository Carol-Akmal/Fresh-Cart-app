import { CurrencyPipe } from '@angular/common';
import { product } from './../../../core/model/product/product.interface';
import { Component, inject, Input } from '@angular/core';


import { RouterLink } from "@angular/router";
import { SplitPipe } from '../../pipes/split-pipe';
import { CartService } from '../cart/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink , CurrencyPipe , SplitPipe ] ,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() cardProduct: product= {} as product

  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
 


  addProductItemToCart(id:string):void{
     this.cartService.addProductsToCart(id).subscribe({
      next:(res)=>{ if (res.status==='success'){

        this.cartService.cartCount.set(res.numOfCartItems)

        this.toastrService.success(res.message , 'FrechCart')

      }

    },
      
      
       error:(err)=>{console.log(err)}
    })

  }
}
