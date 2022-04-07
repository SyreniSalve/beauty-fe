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

  stringifyData: any;
  parsedJson: any;
  users!: User[];
  currentUser!: User;
  profileForm!: FormGroup;
  userRoles: Role[] = [
    {
    id: 1,
    role: RoleEnum.ROLE_ADMIN
  },
    {
      id: 2,
      role: RoleEnum.ROLE_OWNER
    },
    {
      id: 3,
      role: RoleEnum.ROLE_USER
    }
    ]

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
      id: new FormControl(this.currentUser.id),
      jobTitle: new FormControl(this.currentUser.jobTitle),
      roles: new FormControl(this.currentUser.roles)
    })

    this.stringifyData = JSON.stringify(this.userRoles);
    console.log("With Stringify :" , this.stringifyData);

    this.parsedJson = JSON.parse(this.stringifyData);
    console.log("With Parsed JSON :" , this.parsedJson);

  }

  onSubmit(id: number, user: User): void {
    this.updateService.updateForm(id, user)
      .subscribe(
        (response: User) => {
          console.log(response);
          // this.token.saveUser(response);
          // this.token.getUser().roles;
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
