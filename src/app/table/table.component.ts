import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../Services/user-data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  constructor(private userService: UserDataService, private router: Router) {

  }

  tableData: any;
  isDelete: boolean = false;


  async getDetails() {
    this.userService.getData().subscribe(
      {
        next:
          (data: any) => {

            let jsonData = JSON.parse(data.value);
            this.tableData = jsonData.dataSet.Table;
          }
      })
  }

  ngOnInit(): void {
    this.getDetails();
  }
  onClick(row: any) {

    this.userService.userAddress = row;
    console.log(row)
    this.userService.checkUpdate = true;
    this.router.navigate([""])

  }
  onToggle(row: any) {
    console.log(row)
    this.userService.deleteData(row).subscribe(
      {
        next: (response: any) => {
          console.log(response)
          this.getDetails();
        }
      }
    )



  }

}






