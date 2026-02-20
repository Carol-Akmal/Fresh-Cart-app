import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, WritableSignal, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { CartdataResponse } from '../models/cartdata.interface';
import { CartDetailsResponse } from '../models/cart-details.interface';
import { PaymentDetailsResponse } from '../models/payment-details.interface';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient)

  cartCount:WritableSignal<number>=signal<number>(0)
 

 


  addProductsToCart(id: string): Observable<CartdataResponse> {
    return this.httpClient.post<CartdataResponse>(environment.base_url + 'cart',
      {
        "productId": id
      },
      

    )

  }

  getLoggedUserCart(): Observable<CartDetailsResponse> {
    return this.httpClient.get<CartDetailsResponse>(environment.base_url + "cart")
  }

  removeProductFromCart(id: string): Observable<CartDetailsResponse> {
    return this.httpClient.delete<CartDetailsResponse>(environment.base_url + `cart/${id}`)

  }
  UpdateCartProductQuantity(id: string, count: number): Observable<CartDetailsResponse> {
    return this.httpClient.put<CartDetailsResponse>(environment.base_url + `cart/${id}`,
      {
        count: count,
      },
      

    );

  }

 checkOutSession(cartId: string | null, checkOutData: object): Observable<PaymentDetailsResponse> {
  const returnUrl = window.location.origin; 
  return this.httpClient.post<PaymentDetailsResponse>(
    `${environment.base_url}orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
    checkOutData
  );
}

  

createCashOrder(cartId: string | null, shippingAddress: object): Observable<any> {
  return this.httpClient.post(environment.base_url+ `orders/${cartId}`, 
    {
      shippingAddress: shippingAddress 
    }
  );
}
}
