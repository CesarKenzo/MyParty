import { Injectable } from '@angular/core';

import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginResponse?: User;

  public clear(): void {
    this.loginResponse = undefined;
  }

  public isAuthenticated(): boolean {
    return Boolean(this.loginResponse);
  }

}