import {Component, OnInit} from '@angular/core';
import { TokenStorageService } from "./services/token-storage.service";
import { EventBusService } from "./shared/event-bus.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private roles: string[] = [];

  isLoggedInd: boolean = false;
  showOwnerAccount: boolean = false;
  username?: string;
  eventBusSub?: Subscription;

  constructor(private tokenStorageService: TokenStorageService, private eventBusService: EventBusService) {
  }

  ngOnInit(): void {
    this.isLoggedInd = !!this.tokenStorageService.getToken();
    if (this.isLoggedInd) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showOwnerAccount = this.roles.includes('ROLE_OWNER');
      this.username = user.username;
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    })
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
