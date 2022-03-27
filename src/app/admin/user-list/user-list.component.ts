import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: any = [];
  confirmationPopup: boolean = false;
  yesText: string = 'Delete';
  noText: string = 'No';
  popupTitle: string = 'Warning';
  popupQuestion: string = "Are you sure to delete?"

  constructor(private userService: UserService, private stockRouter: Router) { }

  ngOnInit(): void {
    this.getUsersList()
  }

  back() {
    this.stockRouter.navigateByUrl("/admin")
  }

  getUsersList() {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.userList = data;
      }
    )
  }

  actionConfirmed(action: boolean) {
    if (action) {
      this.confirmationPopup = !this.confirmationPopup;
    }
    else {
      this.confirmationPopup = !this.confirmationPopup;
    }
  }

  makeAdmin() {

  }

  makeUser() {

  }

  deleteUser(id: number) {
    this.confirmationPopup = !this.confirmationPopup;
    this.userService.deleteUser(id).subscribe();
  }

}
