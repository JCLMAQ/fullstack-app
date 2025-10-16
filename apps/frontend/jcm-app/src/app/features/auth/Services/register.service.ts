import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@fe/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpClient = inject(HttpClient);

  register(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
    this.userRegister(body)
      .toPromise()
      .then(res => {
        resolve(res);
      }).catch((error) => {
        reject(error.message);
      });

    });
  }

  userRegister(user: User): Observable<User>{
    // 🆕 MIGRATION VERS ENDPOINT IAM
    // ANCIEN: return this.httpClient.post<User>('api/auths/auth/registerwithpwd', user)
    return this.httpClient.post<User>('api/authentication/register-extended', user)
  }
}
