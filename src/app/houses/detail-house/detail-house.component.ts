import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import IDetailHouse from './IDetalHouse.interface';
import {HousesService} from "../houses.service";
import {Subscription} from "rxjs";
import ContactInformation from "../contact-agent-dialog/IContactInformation.interface";
import { MatDialog } from '@angular/material/dialog';
import {ContactAgentDialogComponent} from "../contact-agent-dialog/contact-agent-dialog.component";

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
    hasImage:true

  }

  constructor(private route: ActivatedRoute, private houseService: HousesService,public dialog: MatDialog) {
    const dummy = this.route.snapshot.paramMap.get('id')
    if (dummy) {
      this.houseId = dummy
    }
  }

  ngOnDestroy(): void {
    if (this.viewSub) {
      this.viewSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.viewSub = this.houseService.getDetailHouse(this.houseId)
      .subscribe(house => {
        this.house = {...house, indexSelected: 0, hasImage:house.images.length !== 0}
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ContactAgentDialogComponent, {
      width: '250px',
      data: { contactInfo: this.contactInfo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.contactInfo = result;
      console.log(this.contactInfo);
    });
  }
}
