import { HttpClient } from '@angular/common/http';
import { inject, Injectable,  signal } from '@angular/core';
import { Observable } from 'rxjs';
import { productResponse } from '../../model/product/product.interface';
import { environment } from '../../../../environments/environment.development';
import { PaginationInstance } from 'ngx-pagination';

@Injectable({
  providedIn: 'root',
})  

export class ProductsService {
  private readonly httpClient = inject(HttpClient)

  


  getAllProducts(page:number=1 , limit: number=10):Observable<productResponse>{
    return this.httpClient.get<productResponse> (  environment.base_url + `products?page=${page}&limit=${limit}`)
  }

}
