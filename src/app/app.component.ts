import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from './Services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private userDataService: UserDataService) { }
  title = 'Pincode';


  resetForm() {
    this.router.navigate([""]);
    this.userDataService.checkUpdate = false;
  }
}
