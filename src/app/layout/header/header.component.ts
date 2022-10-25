import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {UserService} from "../../login/user.service";
import IUser from "../../login/IUser.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit, OnDestroy {
  state: IUser = {
    exp: 0,
    userId: "",
    fullName: "",
    email: "",
    role: "",
    token: "",
  }
  Subscribe !: Subscription;

  constructor(private userService: UserService,
              private router: Router) {
    this.Subscribe = this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.check();
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.Subscribe) {
      this.Subscribe.unsubscribe()
    }
  }

  check() {
    if (this.userService.getUserState()) {
      this.state = this.userService.getUserState();
    }
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear()
    const state_object = {
      role: "",
      email: "",
      userId: "",
      fullName: "",
      exp: 0,
      token: ""
    }
    this.userService.userState.next(state_object)
    this.router.navigate(['/', 'login']);
  }

}
