import { Component, OnInit } from '@angular/core';
import {UserInformation} from "../../services/user";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-information-details',
  templateUrl: './user-information-details.component.html',
  styleUrls: ['./user-information-details.component.css']
})
export class UserInformationDetailsComponent implements OnInit {

  currentUser: UserInformation = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    city: '',
    roles: [],
    imageUrl: ''
  }

  message: string = '';

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.params['username'])
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
  }

  updateUser(): void {
    this.message = '';

    this.userService.update(this.currentUser.username, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'Tis user was updated successfully!';
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        }
      )
  }

}
