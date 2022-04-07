import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../services/user";
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UpdateService} from "../../services/update.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {UserListComponent} from "../user-list/user-list.component";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {Role} from "../../models/role";
import {RoleEnum} from "../../models/roleEnum";

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.css']
})
export class UsersDialogComponent implements OnInit {

  users!: User[];
  currentUser!: User;
  profileForm!: FormGroup;

  option1: Role [] = [
    {
      id: 1,
      role: RoleEnum.ROLE_ADMIN
    },
  ];

  option2: Role [] = [
    {
      id: 2,
      role: RoleEnum.ROLE_OWNER
    },
  ];

  option3: Role [] = [
    {
      id: 3,
      role: RoleEnum.ROLE_USER
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<UserListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    private updateService: UpdateService,
    private token: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser().roles;

    this.profileForm = new FormGroup({
      id: new FormControl(this.currentUser ? this.currentUser.id : ''),
      jobTitle: new FormControl(this.currentUser ? this.currentUser.jobTitle : ''),
      roles: new FormControl(this.currentUser ? this.currentUser.roles : '')
    })
  }

  onSubmit(id: number, user: User): void {
    this.updateService.updateForm(id, user)
      .subscribe(
        (response: User) => {
          console.log(response);
          this.onNoClick();
          this.reloadPage();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  reloadPage(): void {
    window.location.reload();
  }

}
