import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  geturl: string = "https://localhost:7137/api/Values/state";
  saveurl: string = "https://localhost:7137/api/Values/insert";
  getUserDetailsUrl: string = "https://localhost:7137/api/Values/userDetails";
  updateUserDetailsUrl: string = "https://localhost:7137/api/Values/Update";
  deleteUserDetailsurl: string = "https://localhost:7137/api/Values/Delete";

  constructor(private http: HttpClient) { }
  userAddress: any;
  checkUpdate: boolean = false;
  checkDelete: boolean = false;
  checkFormUpdate: boolean = false;


  getAddressData(type: string, id?: any): Observable<any> {
    return this.http.post(this.geturl, { type, id });
  }

  saveAddressToDB(data: any): Observable<any> {
    console.log(data)
    return this.http.post(this.saveurl, data);
  }
  getData(): Observable<any> {
    return this.http.get(this.getUserDetailsUrl);
  }
  updateData(data: any): Observable<any> {
    return this.http.post(this.updateUserDetailsUrl, data);
  }
  deleteData(data: any): Observable<any> {
    return this.http.post(this.deleteUserDetailsurl, data);
  }

}
