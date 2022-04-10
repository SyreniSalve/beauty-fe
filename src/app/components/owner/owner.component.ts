import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from "../../services/user.service";
import {User} from "../../services/user";
import {HttpErrorResponse} from "@angular/common/http";
import {
  ScheduleComponent,
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  View,
  CellClickEventArgs
} from '@syncfusion/ej2-angular-schedule';
import {EventService} from "../../services/event.service";
import { Ajax } from "@syncfusion/ej2-base";
import {TokenStorageService} from "../../services/token-storage.service";
import { DataManager, UrlAdaptor, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  content?: string;
  currentUser!: User;
  allUserEvents!: Event[]

  @ViewChild("scheduleObj")
  public scheduleObj!: ScheduleComponent;
  public scheduleViews: View[] = ['Day', 'Week', 'WorkWeek', 'Month'];
  public eventSettings: EventSettingsModel = {
    dataSource: this.allUserEvents,
    fields: {
      id: 'id',
      subject: { name: 'title' },
      location: { name: 'location' },
      startTime: { name: 'startTime' },
      endTime: { name: 'endTime' },
    }
  };

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.getAllUserEvents(this.currentUser.id);
    // this.getCellDetails();
  }

  constructor(private userService: UserService,
              private eventService: EventService,
              private tokenStorageService: TokenStorageService) { }

  public getAllUserEvents(userId: number): void{
    this.currentUser.id = userId;
    this.eventService.getAllUserEvents(userId).subscribe(
      (response: Event[]) => {
        console.log(response)
        this.allUserEvents = response;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getCellDetails(): void{
  //   let cellData: CellClickEventArgs = this.scheduleObj.getCellDetails(arguments);
  //   let eventData: {[key: string]: Object} = {
  //     Subject: .eventSettings.title,
  //     Location: args.eventSettings.location,
  //     StartTime: cellData.startTime,
  //     EndTime: cellData.endTime,
  //   }
  //   this.scheduleObj.addEvent(eventData);
  // }

  // private dataManager: DataManager = new DataManager({
  //   url: `http://localhost:8080/api/auth/events/user-events/${this.currentUser.id}`, // 'controller/actions';
  //   adaptor: new ODataV4Adaptor()
  // });
  // public eventSettings: EventSettingsModel = {
  //   dataSource: this.dataManager,
  //   fields: {
  //     id: 'id',
  //     subject: { name: 'title' },
  //     location: { name: 'location' },
  //     startTime: { name: 'startTime' },
  //     endTime: { name: 'endTime' },
  //   }
  // };
  // public eventSettings: EventSettingsModel = { dataSource: this.dataManager };
// }

  // onCreate() {
  //   const scheduleObj = this.scheduleObj;
  //   const ajax = new Ajax(
  //     `http://localhost:8080/api/auth/events/user-events/${this.currentUser.id}`,
  //     "GET"
  //   );
  //
  //   ajax.send();
  //   ajax.onSuccess = (data: any) => {
  //     scheduleObj.eventSettings.dataSource = JSON.parse(data);
  //   }
  // }


}
