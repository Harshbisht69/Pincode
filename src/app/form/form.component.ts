import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../Services/user-data.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  user: any = {
    name: '',
    age: 0,
    gender: '',
    hobby: '',
    stateid: 0,
    districtid: 0,
    cityid: 0,
    pincode: 0,
    statename: '',
    districtname: '',
    cityname: '',
    id: 0,
    active: ''

  }

  selectedPopupData: any;
  showDropdown: boolean = false;
  showPopup: boolean = false;
  constructor(private router: Router, private userDataService: UserDataService) { }

  ngOnInit(): void {
    if (this.userDataService.checkUpdate) {
      this.user.id = this.userDataService.userAddress.Id;
      this.user.name = this.userDataService.userAddress.Name;
      this.user.age = this.userDataService.userAddress.age;
      this.user.gender = this.userDataService.userAddress.Gender;
      this.user.hobby = this.userDataService.userAddress.Hobby;
      this.user.statename = this.userDataService.userAddress.StateName;
      this.user.districtname = this.userDataService.userAddress.DistrictName;
      this.user.cityname = this.userDataService.userAddress.CityName;
      this.user.pincode = this.userDataService.userAddress.Pincode;
      this.user.stateid = this.userDataService.userAddress.StateId;
      this.user.districtid = this.userDataService.userAddress.DistrictId;
      this.user.cityid = this.userDataService.userAddress.CityId;



    }
    else {
      this.user = {
        name: '',
        age: 0,
        gender: '',
        hobby: [],
        pincode: 0,
        statename: '',
        districtname: '',
        cityname: '',
        id: 0,
      }
    }

  }




  handleDropdownChange(selectedData: any) {

    console.log(selectedData)

    this.user.stateid = selectedData.stateid;

    this.user.districtid = selectedData.districtid;

    this.user.cityid = selectedData.cityid;

    this.user.pincode = selectedData.pincode;

    this.user.districtname = selectedData.district;

    this.user.statename = selectedData.state;

    this.user.cityname = selectedData.city;


    console.log(this.user)
  }

  addDropdown() {

    this.showDropdown = true;

  }
  handleClose() {

    this.showDropdown = false;

  }




  submitForm(data: any) {
    this.user.active = 'Y';
    if (this.userDataService.checkUpdate && this.user.id) {
      this.userDataService.updateData(this.user).subscribe(
        {
          next: (response: any) => {
            this.userDataService.checkUpdate = false;
            this.router.navigate(["table"])
          }
        }
      )
      this.showPopup = true;
    }

    else {
      this.userDataService.saveAddressToDB(this.user).subscribe(
        {
          next: (response: any) => {
            console.log('Save successful', response);
            this.router.navigate(["table"]);
          }
        });
      this.showPopup = true;
      this.router.navigate(["table"])
    }
  }
  closePopup() {
    this.showPopup = false;
  }



}
