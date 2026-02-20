import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  private readonly httpClient = inject(HttpClient);

  getAllUsersOrders(id: string): Observable<any> {
    return this.httpClient.get( environment.base_url+ `orders/user/${id}`);
  }
}