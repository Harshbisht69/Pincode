import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserDataService } from '../Services/user-data.service';
import { NonNullAssert } from '@angular/compiler';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  states: any[] = [];
  districts: any[] = [];
  cities: any[] = [];
  pincodes: any[] = [];

  selectedData = {
    state: '',
    district: '',
    city: '',
    pincode: 0,
    stateid: 0,
    districtid: 0,
    cityid: 0,
  };

  @Output() select = new EventEmitter<{ state: any, district: any, city: any, pincode: any }>();
  @Output() close = new EventEmitter<void>();

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {


    this.userDataService.getAddressData('state').subscribe({
      next: (response: any) => {
        console.log(response)
        let address = JSON.parse(response.value);
        console.log(address)
        this.states = address.dataSet.Table;
        console.log(this.userDataService.userAddress, 'sdfsdkfjskd');



        if (this.userDataService.userAddress && this.userDataService.userAddress.StateId) {
          this.selectedData.stateid = this.userDataService.userAddress.StateId;
          this.handleStateChange(this.selectedData.stateid);
          this.selectedData.districtid = this.userDataService.userAddress.DistrictId;

          this.handleDistrictChange(this.selectedData.districtid);
          this.selectedData.cityid = this.userDataService.userAddress.CityId;


          this.handleCityChange(this.selectedData.cityid);

          this.selectedData.pincode = this.userDataService.userAddress.Pincode;

        }
      }
    });
  }

  handleStateChange(e: any) {

    const stateID = this.selectedData.stateid;

    console.log(stateID)

    const foundState = this.states.find(state => state.StateId === stateID);

    if (foundState) {
      this.selectedData.state = foundState.StateName;
      this.selectedData.stateid = stateID;
      this.selectedData.pincode = 0;
      this.selectedData.districtid = 0;

    }

    if (stateID) {
      this.userDataService.getAddressData('district', stateID).subscribe({
        next: (response: any) => {
          let address = JSON.parse(response.value);
          this.districts = address.dataSet.Table;
          this.cities = [];
          this.pincodes = [];

        }
      });
    }
  }

  handleDistrictChange(e: any) {

    const districtID = this.selectedData.districtid;
    const foundDistrict = this.districts.find(district => district.DistrictId === districtID);


    if (foundDistrict) {
      this.selectedData.district = foundDistrict.DistrictName;
      this.selectedData.districtid = districtID;
      // console.log(this.selectedData.district)
    }
    if (districtID) {
      this.userDataService.getAddressData('city', districtID).subscribe({
        next: (response: any) => {
          let address = JSON.parse(response.value);
          this.cities = address.dataSet.Table;
          this.pincodes = [];
        }
      });
    }
  }

  handleCityChange(e: any) {

    const cityID = this.selectedData.cityid;
    const foundCity = this.cities.find(city => city.CityId === cityID);

    if (foundCity) {
      this.selectedData.city = foundCity.CityName;
      this.selectedData.cityid = cityID;
      // console.log(this.selectedData.city)
    }
    if (cityID) {
      this.userDataService.getAddressData('pincode', cityID).subscribe({
        next: (response: any) => {
          let address = JSON.parse(response.value);
          this.pincodes = address.dataSet.Table;
        }
      });
    }
  }

  handlePincodeChange(e: any) {
    console.log("pincode --->>>", this.selectedData.pincode);
    const pincodeID = this.selectedData.pincode;
    this.select.emit(this.selectedData);
  }
  onPopUpClose() {
    this.close.emit();
  }

}
