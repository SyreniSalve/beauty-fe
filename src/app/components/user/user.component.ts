import { Component, OnInit } from '@angular/core';
import { EventData } from "../../shared/event-data.class";
import {UserService} from "../../services/user.service";
import {EventBusService} from "../../shared/event-bus.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  content?: string;

  constructor(private userService: UserService, private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.userService.getUserContent().subscribe(
      data => {
        this.content = data;
      },
      error => {
        this.content = error.error.message || error.error || error.message;
        if(error.status === 403)
          this.eventBusService.emit(new EventData('logout', null));
      }
    )
  }
}
