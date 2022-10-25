import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HousesService} from "../houses.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import ISearchHouse from "./ISearchHouses.interface";
import {Subscription} from "rxjs";
import {UserService} from "../../login/user.service";

@Component({
  selector: 'app-searching-houses',
  templateUrl: './search-houses.component.html',
  styleUrls: ['./search-houses.component.css']
})
export class SearchHousesComponent implements OnInit, OnDestroy {
  Subscripe!: Subscription;

  searchHouseForm!: FormGroup;
  listHouses: ISearchHouse = {
    init: true,
    houses: [{
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
      indexSelected: 0,
      hasImage:true
    }],
    totalHouses: 0
  }
  checkOwnPosts = false;
  role = "";
  userId = "";

  constructor(private formBuilder: FormBuilder,
              private searchHouseService: HousesService,
              private router: Router) {
    this.searchHouseForm = this.formBuilder.group({
      homeNumber: [],
      street: [],
      city: [],
      state: [],
      zipcode: [],
      fromPrice: [],
      toPrice: [],
      fromSquare: [],
      toSquare: [],
      bed: [],
      bath: []
    });
  }

  ngOnDestroy(): void {
    if (this.Subscripe) {
      this.Subscripe.unsubscribe()
    }
  }

  search() {
    if (this.role === 'agent' && this.checkOwnPosts) {
      this.searchHouseForm.value.owner = this.userId
    }
    this.Subscripe = this.searchHouseService.search(this.searchHouseForm.value)
      .subscribe(res => {
        this.listHouses.houses = res.docs.map((doc: any) => {
          return {...doc, indexSelected: 0, hasImage:doc.images.length !== 0}
        })
        console.log(this.listHouses.houses)
        this.listHouses.totalHouses = res.totalDocs
        this.listHouses.init = false;
      })
  }

  ngOnInit(): void {
  }

  showDetail(house_id: string) {
    this.router.navigate(['houses', 'view', house_id])
  }

  onPageChange($event: PageEvent) {
    this.searchHouseForm.value.page = ($event.pageIndex + 1).toString();
    this.search()
  }

  selectImage(indexImage: number, indexHouse: number) {
    this.listHouses.houses[indexHouse].indexSelected = indexImage
  }

  onPrevClick(indexHouse: number) {
    let check = this.listHouses.houses[indexHouse].indexSelected
    if (check - 1 < this.listHouses.houses[indexHouse].images.length && check - 1 >= 0) {
      this.listHouses.houses[indexHouse].indexSelected = check - 1;
    } else if (check - 1 < 0) {
      this.listHouses.houses[indexHouse].indexSelected = this.listHouses.houses[indexHouse].images.length - 1
    }
  }

  onNextClick(indexHouse: number) {
    let check = this.listHouses.houses[indexHouse].indexSelected
    if (check + 1 < this.listHouses.houses[indexHouse].images.length) {
      this.listHouses.houses[indexHouse].indexSelected = check + 1;
    } else if (check + 1 == this.listHouses.houses[indexHouse].images.length) {
      this.listHouses.houses[indexHouse].indexSelected = 0
    }
  }
}
