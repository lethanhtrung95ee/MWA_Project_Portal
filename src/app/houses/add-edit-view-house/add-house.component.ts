import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Subscription } from 'rxjs';
import { HousesService } from '../houses.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

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
              private houseService: HousesService,
              private http: HttpClient
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

  // Initial Value on Add house Form
  valueBath = 0;
  valueBed = 0;
  valueGarage = 0;
  yearBuilt = 1925;

  // Slider Value
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  openDialog(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: "top"
    });
  }

  openSuccessDialog(message: string) {
    this.openDialog(message)
  }

  openFailDialog(message: string) {
    this.openDialog(message)
  }

  onFileSelected(event: any) {

  }

  onUploadImage() {

    const fd = new FormData();
    // fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('', fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe( event => {
        console.log(event);
      });
  }

  addHouse() {

    // this.onUploadImage()
    var houseFormValue = this.addHouseForm.value;
    var house = {
                  address: {
                    home_number: houseFormValue.home_number,
                    street: houseFormValue.street,
                    city: houseFormValue.city,
                    state: houseFormValue.state,
                    zipCode: houseFormValue.zipCode

                  },
                  description: {
                    bed: houseFormValue.bed,
                    bath: houseFormValue.bath,
                    garages: houseFormValue.garages,
                    square: houseFormValue.square,
                    propertyDetail: houseFormValue.propertyDetail ,
                    prices: houseFormValue.prices.toString(),
                    yearBuilt: houseFormValue.yearBuilt,
                  }
                }

    this.addHouseSub = this.houseService.addHouse(house)
      .subscribe(res => {
        if (res.success) {
          this.openSuccessDialog("House is successfully added!");
        } else {
          this.openFailDialog("Failed to add the house!")
        }
      });
  }
}

