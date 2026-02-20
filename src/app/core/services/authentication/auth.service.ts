import { HttpClient } from '@angular/common/http';
import { inject, Injectable,  } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { UserData, UserDataResponse } from '../../auth/model/user/user-data.interface';
import { STORED_KEYS } from '../../constant/storedKey';
import { jwtDecode } from "jwt-decode";
import { UserTokenRefrence } from '../../constant/userTokenInterface/user-token.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router=inject(Router)
 UserDataDecoded!: UserTokenRefrence;


  sendRegisterData(userdata: UserData): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(environment.base_url + 'auth/signup', userdata)
  }

  sendloginData(userdata: UserData): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(environment.base_url + 'auth/signin', userdata)
  }

  decodeUserToken(): void {
    if(localStorage.getItem(STORED_KEYS.userToken)){
      const token =localStorage.getItem(STORED_KEYS.userToken)!;
      this.UserDataDecoded = jwtDecode(token);
      console.log(this.UserDataDecoded , "User-Data");
    }
  }

  userLogOut():void{
    localStorage.removeItem(STORED_KEYS.userToken)
    this.router.navigate(['/login'])

  }
}

