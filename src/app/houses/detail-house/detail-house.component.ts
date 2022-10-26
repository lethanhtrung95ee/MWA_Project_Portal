import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ContactAgentDialogComponent} from "../contact-agent-dialog/contact-agent-dialog.component";
import {UserService} from 'src/app/login/user.service';
import {HousesService} from "../houses.service";
import {Subscription} from "rxjs";
import IDetailHouse from './IDetalHouse.interface';
import ContactInformation from "../contact-agent-dialog/IContactInformation.interface";

@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DetailHouseComponent implements OnInit, OnDestroy {
  
  viewSub !: Subscription
  houseId: string = "";
  contactInfo!: ContactInformation;
  
  house: IDetailHouse = {
    address: {
      home_number: 0,
      street: "",
      city: "",
      state: "",
      zipcode: 0
    },
    description: {
      square: 0,
      prices: 0,
      bed: 0,
      bath: 0,
      propertyDetail: "",
      garages: 0,
      yearBuilt: 0
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
    hasImage: true

  }

  role = "user";
  
  constructor(private route: ActivatedRoute, 
              private houseService: HousesService, 
              public dialog: MatDialog,
              private router: Router,
              private userService: UserService,
              ) {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.houseId = id;
    }

    this.role = this.userService.getUserState().role;
  }

  ngOnDestroy(): void {
    if (this.viewSub) {
      this.viewSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.viewSub = this.houseService.getDetailHouse(this.houseId)
      .subscribe(house => {
        this.house = {...house, selectedIndex: 0, hasImage: house.images.length !== 0}
      })
  }

  // sets index of image on dot/indicator click
  selectImage(index: number): void {
    this.house.selectedIndex = index;
  }

  onPrevClick(): void {
    if (this.house.selectedIndex === 0) {
      this.house.selectedIndex = this.house.images.length - 1;
    } else {
      this.house.selectedIndex--;
    }
  }

  onNextClick(): void {
    if (this.house.selectedIndex === this.house.images.length - 1) {
      this.house.selectedIndex = 0;
    } else {
      this.house.selectedIndex++;
    }
  }

  editHouse(house_id: string): void {
    this.router.navigate(['houses', 'edit', house_id])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContactAgentDialogComponent, {
      width: '250px',
      data: {contactInfo: this.contactInfo}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.contactInfo = result;
      const objBody = {
        userId: "",
        fullName: this.contactInfo.name,
        phoneNumber: this.contactInfo.phone,
        email: this.contactInfo.email,
        date: ""
      }
      this.viewSub = this.houseService.creatAppointment(this.houseId, objBody).subscribe()
    });
  }
}
