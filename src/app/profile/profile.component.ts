import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../login/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProfileComponent implements OnInit, OnDestroy {

  userServiceSub !: Subscription;

  data: { userId: string, password: string, email: string, fullName: string, role: string, phoneNumber: number } = {
    userId: "",
    password: "",
    email: "",
    fullName: "",
    role: "",
    phoneNumber: 0
  }

  constructor(private userService: UserService) {
    this.userServiceSub = userService.profile().subscribe(res => {
      console.log(res);
      this.data = res
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.userServiceSub) {
      this.userServiceSub.unsubscribe()
    }
  }

}
