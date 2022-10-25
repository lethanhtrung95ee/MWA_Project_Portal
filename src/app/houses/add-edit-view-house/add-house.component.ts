import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Subscription } from 'rxjs';
import { HousesService } from '../houses.service';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css'],
})
export class AddHouseComponent implements OnInit {

  addHouseForm!: FormGroup;
  addHouseSub!: Subscription

  constructor(private snackBar: MatSnackBar, 
              private _ngZone: NgZone, 
              private formBuilder: FormBuilder,
              private houseService: HousesService
              ) {

    this.addHouseForm = formBuilder.group({
      home_number: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      yearBuilt: ['', Validators.required],
      bed: [0, Validators.required],
      bath: [0, Validators.required],
      garages: [0, Validators.required],
      propertyDetail: ['', Validators.required],
      square: ['', Validators.required],
      prices: ['', Validators.required]
    })
  }

  ngOnInit(): void {}

  valueBath = 0;
  valueBed = 0;
  valueGarage = 0;

  // minDate = new Date();
  // maxDate = new Date(2019);

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  openDialog() {
    this.snackBar.open("House is successfully added!", '', {
      duration: 3000,
      verticalPosition: "top"
    });
  }

  addHouse() {

    this.addHouseSub = this.houseService.addHouse(this.addHouseForm.value)
      .subscribe(res => {
        if (res.success) {
          console.log("Added");
          this.openDialog();
        } else {
          console.log("Fail")
        }
      });

   
  }
}

