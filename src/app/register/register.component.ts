import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../login/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RegisterComponent implements OnDestroy {
  registerSub!: Subscription;
  registerForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    fullName: ['', Validators.required],
    userId: ['', Validators.required],
    phoneNumber: [, Validators.required],
    role: ['user'],
  });

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnDestroy(): void {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }

  submit() {
    this.registerSub = this.userService.register(this.registerForm.value)
      .subscribe((response) => {
        if (!response.success) {
          console.log("something wrong")
        } else {
          this.router.navigate(['login']);
        }
      });
  }

  back() {
    this.router.navigate(['login']);
  }
}
