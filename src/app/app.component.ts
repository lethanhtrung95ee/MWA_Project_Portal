import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./login/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService) {

  }

  ngOnInit(): void {
    const stringified_app_state = localStorage.getItem("APP_STATE")
    if (stringified_app_state) {
      const parsed_app_state = JSON.parse(stringified_app_state)
      if (new Date().getTime() >= parsed_app_state.exp) {
        this.userService.userState.next(parsed_app_state)
      } else {
        this.router.navigate(['/login'])
      }
    } else {
      this.router.navigate(['/login'])
    }
  }
}
