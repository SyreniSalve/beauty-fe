import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../services/user";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserListComponent} from "../user-list/user-list.component";
import {UserService} from "../../services/user.service";
import {UpdateService} from "../../services/update.service";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.css']
})
export class UserDeleteDialogComponent implements OnInit {

  currentUser!: User;

  constructor(
    public dialogRef: MatDialogRef<UserListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    private updateService: UpdateService,
    private token: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  deleteUser(id: number): void {
    this.userService.delete(id)
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
