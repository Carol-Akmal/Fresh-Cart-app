import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';
import { ProductDetailsResponse } from '../model/product-details/product-details.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private readonly httpClient = inject(HttpClient);

  getSpecificProduct(id:string|null):Observable<ProductDetailsResponse>{
    return this.httpClient.get<ProductDetailsResponse>( environment.base_url + `products/${id}`)
  }

}
