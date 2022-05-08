import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../services/user";
import {Event} from '../../models/Event';
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data'

import {
  EventSettingsModel,
  ScheduleComponent,
  View
} from '@syncfusion/ej2-angular-schedule';
import {EventService} from "../../services/event.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  content?: string;
  currentUser!: User;
  allUserEvents!: Event[];
  currentEvent!: Event;

  @ViewChild("scheduleObj")
  public scheduleObj!: ScheduleComponent;
  public scheduleViews: View[] = ['Day', 'Week', 'WorkWeek', 'Month'];
  public eventSettings: EventSettingsModel = {
    dataSource: [],
    fields: {
      id: 'id',
      subject: {name: 'title'},
      location: {name: 'location'},
      startTime: {name: 'startTime'},
      endTime: {name: 'endTime'},
    },
  };


  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.getAllUserEvents(this.currentUser.id);
  }

  constructor(private userService: UserService,
              private eventService: EventService,
              private tokenStorageService: TokenStorageService) {
  }
  public getAllUserEvents(userId: number): void {
    this.currentUser.id = userId;
    this.eventService.getAllUserEvents(userId).subscribe(
      (response: Event[]) => {
        this.allUserEvents = response;

        // @ts-ignore
        this.eventSettings.dataSource.length = 0;
        // @ts-ignore
        this.eventSettings.dataSource.push(...response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onClose = ({data}: { data: any }) => {

    const event: Event = {
      title: data.title,
      startTime: data.startTime.toLocaleString("lt-LT"),
      endTime: data.endTime.toLocaleString("lt-LT")
    };
    this.eventService.createEvent(event).subscribe(console.log);

  }

  // public getAllUserEvents(userId: number): void {
  //   this.currentUser.id = userId;
  //   // @ts-ignore
  //   this.eventSettings.dataSource.length = 0;
  //   this.eventSettings.dataSource = new DataManager({
  //     url: `http://localhost:8080/api/auth/events/user-events/${userId}`,
  //     adaptor: new WebApiAdaptor,
  //     crossDomain: true
  //   });
  // }
  //
  // public addEvent({data}: { data: any }) {
  //   const event: Event = {
  //     title: data.title,
  //     startTime: data.startTime.toLocaleString("lt-LT"),
  //     endTime: data.endTime.toLocaleString("lt-LT")
  //   };
  //   this.eventService.createEvent(event).subscribe(console.log);
  // }
  //
  // public updateEvent({data}: { data: any }) {
  //   this.eventService.updateEvent(data.id, data);
  // }
  //
  // public deleteEvent({data}: { data: any }) {
  //   this.eventService.deleteEvent(data.id);
  // }

}
