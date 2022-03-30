import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getOwnerContent().subscribe(
      data => {
        this.content = data;
      },
      error => {
        this.content = JSON.parse(error.error).message;
      }
    )
  }
}
