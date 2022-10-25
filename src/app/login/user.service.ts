import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import IUser from "./IUser.interface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userState = new BehaviorSubject<IUser | null>(null);

  constructor(private http: HttpClient) {
  }

  getUserState(): IUser {
    return this.userState.value as IUser;
  }

  login(obj: { userId: string, password: string }) {
    return this.http.post<{ success: boolean, token: string }>(`${environment.apiUrl}/login`, obj)
  }

  register(obj: { userId: string, password: string, email: string, fullName: string, role: string, phoneNumber: number }) {
    return this.http.post<{ success: boolean }>(`${environment.apiUrl}/register`, obj)
  }

  profile() {
    return this.http.get<{ userId: string, password: string, email: string, fullName: string, role: string, phoneNumber: number }>(`${environment.apiUrl}/profile`)
  }
}
