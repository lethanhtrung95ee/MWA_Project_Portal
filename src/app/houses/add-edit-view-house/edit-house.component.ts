import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import IDetailHouse from '../detail-house/IDetalHouse.interface';
import { HousesService } from '../houses.service';
import IAddHouse from './IAddHouse.interface';

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.css'],
})
export class EditHouseComponent implements OnInit {

  editHouseForm!: FormGroup;
  editHouseSub!: Subscription
  viewSub !: Subscription
  houseId: string = "";

  // Global Variable of house
  valueBath = 0;
  valueBed = 0;
  valueGarage = 0;
  yearBuilt = 1925;
  valueSqure = 100;
  valueCity = "FairField";
  valueZipCode = 52557;
  valueState = "Iowa";
  valueStreet = "2003 N st";
  valueHomeNumber = 2000;
  valueOverview = "Testing overview";
  valuePrice = 7000;

  house: IAddHouse = {
    address: {
      home_number: "",
      street: "",
      city: "",
      state: "",
      zipcode: ""
    },
    description: {
      square: "",
      prices: "",
      bed: "",
      bath: "",
      propertyDetail: "",
      garages: "",
      yearBuilt: ""
    },
    images: [""],
    interestingUserIds: [""],
    publisher: {
      appointments: [{
        email: "",
        fullName: "",
        userId: ""
      }]
    },
    _id: "",
    selectedIndex: 0,
   
  }

  constructor(private snackBar: MatSnackBar, 
              private formBuilder: FormBuilder,
              private houseService: HousesService,
              private http: HttpClient,
              private route: ActivatedRoute
              ) {

    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.houseId = id
    }            

    this.editHouseForm = formBuilder.group({
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

  ngOnInit(): void {
    this.viewSub = this.houseService.getDetailHouse(this.houseId)
      .subscribe(house => {
      
        this.valueBath = house.description.bath,
        this.valueBed = house.description.bed,
        this.valueGarage = house.description.garages,
        this.yearBuilt = house.description.yearBuilt,
        this.valueSqure = house.description.square,
        this.valueCity = house.address.city,
        this.valueZipCode = house.address.zipcode,
        this.valueState = house.address.state,
        this.valueStreet = house.address.street,
        this.valueHomeNumber = house.address.home_number,
        this.valueOverview = house.description.propertyDetail,
        this.valuePrice = house.description.prices
      })
  }

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
    console.log(event);
  }

  editHouse() {

    var houseFormValue = this.editHouseForm.value;
    var house = { 
                  address: {
                    home_number: houseFormValue.home_number,
                    street: houseFormValue.street,
                    city: houseFormValue.city,
                    state: houseFormValue.state,
                    zipcode: houseFormValue.zipcode
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
    this.editHouseSub = this.houseService.editHouse(this.houseId ,house)
      .subscribe(res => {
        if (res.success) {
          this.openSuccessDialog("House is successfully edited!");
        } else {
          this.openFailDialog("Failed to edit the house")
        }
      });
  }
}
