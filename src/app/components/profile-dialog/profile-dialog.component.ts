import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../services/user";
import {FormControl, FormGroup } from "@angular/forms";
import {UpdateService} from "../../services/update.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {

  currentUser!: User;
  profileForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private updateService: UpdateService,
    private token: TokenStorageService,
  ) {
    this.currentUser = data;
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

    this.profileForm = new FormGroup({
      id: new FormControl(this.currentUser.id),
      firstName: new FormControl(this.currentUser.firstName),
      lastName: new FormControl(this.currentUser.lastName),
      jobTitle: new FormControl(this.currentUser.jobTitle),
      phone: new FormControl(this.currentUser.phone),
      email: new FormControl(this.currentUser.email),
      dateOfBirth: new FormControl(this.currentUser.dateOfBirth),
      password: new FormControl(this.currentUser.password),
      city: new FormControl(this.currentUser.city),
      state: new FormControl(this.currentUser.state),
      imageUrl: new FormControl(this.currentUser.imageUrl),
    });
  }

  onSubmit(id: number, user: User): void {
    this.updateService.userUpdateForm(id, user)
      .subscribe(
        (response: User) => {
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
