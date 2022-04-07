import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../../services/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../services/user";
import {ProfileDialogComponent} from "../profile-dialog/profile-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser!: User;

  constructor(private token: TokenStorageService,
              private dialog: MatDialog,
              ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  openDialog(): void {
    //   const dialogConfig = new MatDialogConfig();
    //
    //   dialogConfig.disableClose = true;
    //   dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      data: {id: this.currentUser.id, firstName: this.currentUser.firstName, lastName: this.currentUser.lastName,
        jobTitle: this.currentUser.jobTitle, phone: this.currentUser.phone, dateOfBirth: this.currentUser.dateOfBirth,
        email: this.currentUser.email, city: this.currentUser.city, state: this.currentUser.state,
        imageUrl: this.currentUser.imageUrl},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.currentUser = result;
      this.reloadPage();
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
