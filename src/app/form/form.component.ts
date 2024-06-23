import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../Services/user-data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild('formData') formData!: NgForm;
  user: any = {
    name: '',
    age: 0,
    gender: '',
    hobby: [],
    stateid: 0,
    districtid: 0,
    cityid: 0,
    pincode: 0,
    statename: '',
    districtname: '',
    cityname: '',
    id: 0,
    active: ''
  };

  selectedPopupData: any;
  showDropdown: boolean = false;
  showPopup: boolean = false;
  updateFlag: boolean = false;
  showChild: boolean = false;

  checkBoxOptions = [
    {
      option: false,
      value: 'cooking'
    },
    {
      option: false,
      value: 'reading'
    },
    {
      option: false,
      value: 'music'
    }
  ]

  constructor(private router: Router, private userDataService: UserDataService) {
    if (this.updateFlag) {
      userDataService.userAddress = '';
    }
  }

  ngOnInit(): void {
    // const savedUser = localStorage.getItem('user');
    // if (savedUser) {
    //   this.user = JSON.parse(savedUser);
    // }
    if (this.userDataService.checkUpdate) {

      const userAddress = this.userDataService.userAddress;
      this.user.id = userAddress.Id;
      this.user.name = userAddress.Name;
      this.user.age = userAddress.age;
      this.user.gender = userAddress.Gender;
      this.user.hobby = userAddress.Hobby ? userAddress.Hobby.split(',') : [];
      console.log(this.user.hobby);
      this.checkBoxOptions.map((obj: any) => {
        if (this.user.hobby.some((str: string) => str === obj.value)) {
          obj.option = true;
        }
      })

      this.user.statename = userAddress.StateName;
      this.user.districtname = userAddress.DistrictName;
      this.user.cityname = userAddress.CityName;
      this.user.pincode = userAddress.Pincode;
      this.user.stateid = userAddress.StateId;
      this.user.districtid = userAddress.DistrictId;
      this.user.cityid = userAddress.CityId;
      this.userDataService.checkFormUpdate = true;
      this.updateFlag = this.userDataService.checkFormUpdate;
      //localStorage.setItem('user', JSON.stringify(this.user));

      this.showPopup = true;
    } else {
      this.userDataService.userAddress = '';
      this.showPopup = false;
      this.userDataService.checkFormUpdate = false;
      this.updateFlag = this.userDataService.checkFormUpdate;
    }
  }

  ngOnDestroy() {
    this.userDataService.userAddress = '';

  }
  resetUser() {
    this.updateFlag = false;
    this.user = {
      name: '',
      age: 0,
      gender: '',
      hobby: [],
      stateid: 0,
      districtid: 0,
      cityid: 0,
      pincode: 0,
      statename: '',
      districtname: '',
      cityname: '',
      id: 0,
      active: ''
    };
    if (this.formData) {
      this.formData.resetForm(this.user);
      this.updateFlag = false;
    }
  }

  handleDropdownChange(selectedData: any) {
    this.user.stateid = selectedData.stateid;
    this.user.districtid = selectedData.districtid;
    this.user.cityid = selectedData.cityid;
    this.user.pincode = selectedData.pincode;
    this.user.districtname = selectedData.district;
    this.user.statename = selectedData.state;
    this.user.cityname = selectedData.city;
    this.showPopup = true;
  }

  addDropdown() {
    this.showChild = true;
  }

  onCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      if (!this.user.hobby.includes(value)) {
        this.user.hobby.push(value);
      }
    } else {
      this.user.hobby = this.user.hobby.filter((hobby: string) => hobby !== value);
    }
  }

  submitForm(data: any) {
    if (this.formData.invalid) {
      if (this.formData.controls['name'].invalid) {
        if (this.formData.controls['name'].errors?.['required']) {
          console.log('Name is required');
          alert('Name is required');
        }
        if (this.formData.controls['name'].errors?.['minlength']) {
          console.log('Name must be at least 2 characters long');
          alert('Name must be at least 2 characters long');
        }
      }

      else if (this.formData.controls['age'].invalid) {
        if (this.formData.controls['age'].errors?.['required']) {
          console.log('Age is required.');
          alert('Age is required.');
        }
        else if (this.formData.controls['age'].errors?.['min']) {
          console.log('Age must be greater than 0.');
          alert('Age must be greater than 0.');
        }
      }

      else if (this.formData.controls['gender'].invalid) {
        console.log('Gender is required.');
        alert('Gender is required.');
      }

      return;
    }

    this.user.active = 'Active';
    this.user.hobby = this.user.hobby.join(', ');

    if (this.userDataService.checkUpdate && this.user.id) {
      this.userDataService.updateData(this.user).subscribe({
        next: (response: any) => {
          this.userDataService.checkUpdate = false;
          this.router.navigate(["table"]);
        }
      });
    } else {
      this.userDataService.saveAddressToDB(this.user).subscribe({
        next: (response: any) => {
          console.log('Save successful', response);
          this.router.navigate(["table"]);
          this.updateFlag = false;
        }
      });
    }
  }

  closePopup() {
    this.showPopup = false;
  }

  onClose() {
    this.showChild = false;
  }
}
