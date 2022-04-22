import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../services/user";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserListComponent} from "../user-list/user-list.component";
import {UserService} from "../../services/user.service";
import {UpdateService} from "../../services/update.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Role} from "../../models/role";

@Component({
  selector: 'app-user-role-delete-dialog',
  templateUrl: './user-role-delete-dialog.component.html',
  styleUrls: ['./user-role-delete-dialog.component.css']
})
export class UserRoleDeleteDialogComponent implements OnInit {

  currentUser!: User;
  currentRole!: Role;

  constructor(
    public dialogRef: MatDialogRef<UserListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private updateService: UpdateService,
    private token: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  deleteRole(roleId: number, userId: number): void {
    this.userService.deleteRole(roleId, userId)
      .subscribe({
        next: (res) => {
          console.log(res);
         this.onNoClick();
        },
        error: (e) => console.error(e)
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
