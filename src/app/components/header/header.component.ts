import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenStorageService } from "../../services/token-storage.service";
import { EventBusService } from "../../shared/event-bus.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private roles: string[] = [];

  isLoggedIn: boolean = false;
  showUserAccount: boolean = false;
  showOwnerAccount: boolean = false;
  showAdminAccount: boolean = false;
  firstName?: string;
  lastName?: string;
  eventBusSub?: Subscription;

  constructor(private tokenStorageService: TokenStorageService, private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showUserAccount = this.roles.includes("ROLE_USER")
      this.showAdminAccount = this.roles.includes('ROLE_ADMIN')
      this.showOwnerAccount = this.roles.includes('ROLE_OWNER');
      this.firstName = user.firstName;
      this.lastName = user.lastName;
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    })
  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.roles = [];
    this.showAdminAccount = false;
    this.showOwnerAccount = false;
    this.showUserAccount = false;
  }
}
