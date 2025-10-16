import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@fe/user';
import { Observable } from 'rxjs';

/**
 * 🆕 SERVICE D'INSCRIPTION IAM - Migration AUTHS → IAM
 *
 * Remplace l'ancien register.service.ts qui utilisait l'endpoint AUTHS
 * Utilise maintenant l'endpoint IAM /api/authentication/register-extended
 */
@Injectable({
  providedIn: 'root'
})
export class IamRegisterService {

  httpClient = inject(HttpClient);

  register(body: User): Promise<User> {
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

  /**
   * 📝 USER REGISTER avec nouvel endpoint IAM
   * AUTHS: POST /api/auths/auth/registerwithpwd
   * IAM:   POST /api/authentication/register-extended ✅
   */
  userRegister(user: User): Observable<User> {
    // 🆕 Utilisation du nouvel endpoint IAM étendu
    return this.httpClient.post<User>('api/authentication/register-extended', user);
  }
}
