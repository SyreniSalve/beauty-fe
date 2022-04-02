import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAdminContent().subscribe(
      data => {
        this.content = data;
      },
      error => {
        this.content = JSON.parse(error.error).message;
      }
    )
  }
}
