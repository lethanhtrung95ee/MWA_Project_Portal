import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

function dynamicQuery(obj: {
  homeNumber: string; street: string; city: string; state: string; zipcode: string;
  fromPrice: number; toPrice: number; fromSquare: number; toSquare: number;
  bed: number; bath: number , page:string, owner:string }) {
  let result =""
  let query = ""
  if(obj.homeNumber){
    query += `homeNumber=${obj.homeNumber}`
  }
  if(obj.street){
    query += `&street=${obj.street}`
  }
  if(obj.city){
    query += `&city=${obj.city}`
  }
  if(obj.state){
    query += `&state=${obj.state}`
  }
  if(obj.zipcode){
    query += `&zipcode=${obj.zipcode}`
  }
  if(obj.fromPrice){
    query += `&fromPrice=${obj.fromPrice}`
  }
  if(obj.toPrice){
    query += `&toPrice=${obj.toPrice}`
  }
  if(obj.fromSquare){
    query += `&fromSquare=${obj.fromSquare}`
  }
  if(obj.toSquare){
    query += `&toSquare=${obj.toSquare}`
  }
  if(obj.bed) {
    query += `&bed=${obj.bed}`
  }
  if(obj.bath) {
    query += `&bath=${obj.bath}`
  }
  if(obj.page){
    query += `&page=${obj.page}`
  }
  if(obj.owner){
    query += `&owner=${obj.owner}`
  }
  if(query){
    result += `?${query}`
  }
  return result;
}

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  constructor(private http: HttpClient) {
  }

  search(obj: {
    homeNumber: string, street: string, city: string, state: string,
    zipcode: string, fromPrice: number, toPrice: number,
    fromSquare: number, toSquare: number, bed: number, bath: number,
    page:string, owner: string
  }) {
    const result = dynamicQuery(obj)
    return this.http.get<any>(`${environment.apiUrl}/houses/search${result}`)
  }

  getDetailHouse(_id: string) {
    return this.http.get<any>(`${environment.apiUrl}/houses/${_id}`)
  }

  getAllAppointment(){
    return this.http.get<any>(`${environment.apiUrl}/houses/appointments`)
  }

  addHouse(obj: { home_number: string,
                  street: string,
                  city: string,
                  state: string,
                  yearBuilt: string,
                  zipCode: string,
                  bed: number,
                  bath: number,
                  garages: number,
                  square: string,
                  propertyDetail: string ,
                  prices: number
                }) {
    return this.http.post<{ success: boolean, token: string }>(`${environment.apiUrl}/houses/`, obj)
  }
}
