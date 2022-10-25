import {Component, OnDestroy, OnInit} from '@angular/core';
import {HousesService} from "../houses.service";
import {Subscription} from "rxjs";
import IAppointmentsInterface from "./IAppointments.interface";
import ISearchHouse from "../search-houses/ISearchHouses.interface";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['fullName', 'phoneNumber', 'email'];
  data: IAppointmentsInterface[]= []
  appointmentSub!: Subscription;

  constructor(private houseService: HousesService) {
  }

  ngOnInit(): void {
    this.appointmentSub = this.houseService.getAllAppointment().subscribe(res => {
      this.data = res;
      console.log(this.data)
    })

  }

  ngOnDestroy(): void {
    if (this.appointmentSub) {
      this.appointmentSub.unsubscribe()
    }
  }

}
