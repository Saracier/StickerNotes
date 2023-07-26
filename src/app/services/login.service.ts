import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);

  setLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }
}
