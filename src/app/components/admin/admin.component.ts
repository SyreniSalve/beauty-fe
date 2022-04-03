import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../services/user";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  content?: string;
  users!: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }
}
