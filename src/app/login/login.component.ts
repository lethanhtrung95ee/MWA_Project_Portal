import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import jwtDecode from "jwt-decode";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loginSub!: Subscription
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.loginForm = formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnDestroy(): void {
       if(this.loginSub){
         this.loginSub.unsubscribe()
       }
    }

  ngOnInit(): void {
    //will navigate to search house if localStorage stores the token
    const stringified_app_state = localStorage.getItem("APP_STATE")
    if (stringified_app_state) {
      const parsed_app_state = JSON.parse(stringified_app_state)
      if (new Date().getTime() >= parsed_app_state.exp) {
        this.router.navigate(['houses','search'])
      }
    }
  }

  login() {
    this.loginSub = this.userService.login(this.loginForm.value)
      .subscribe(res => {
        if (res.success) {
          const plain_token = jwtDecode(res.token) as { userId: string, fullName: string, role: string, email: string , exp: number}
          const state_object = {
            role: plain_token.role,
            email: plain_token.email,
            userId: plain_token.userId,
            fullName: plain_token.fullName,
            exp: plain_token.exp,
            token: res.token
          }
          this.userService.userState.next(state_object)
          localStorage.setItem("APP_STATE", JSON.stringify(state_object))
          this.router.navigate(['houses','search'])
        }
      })
  }

  register() {
    this.router.navigate(['register'])
  }
}
