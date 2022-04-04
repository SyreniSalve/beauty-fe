import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {User, UserInformation} from 'src/app/services/user';
import { UserService } from "../../services/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {

  @Input() viewMode: boolean = false;

  users!: UserInformation[];
  currentUser!: UserInformation;
  currentIndex: number = -1;
  keyword: string = '';

  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes: number[] = [5, 10, 20]
  userId!: number;
  message = '';


  @ViewChild(MatPaginator)
  paginator?: MatPaginator;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode && this.route.snapshot.params["id"]) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
    this.retrieveUsers();
  }

  getRequestParams(keyword: string, page: number, pageSize: number): any {
    let params: any = {};

    if (keyword) {
      params[`keyword`] = keyword;
    }

    if (page) {
      params[`page`] = page;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  retrieveUsers(): void {
    // @ts-ignore
    const params = this.getRequestParams(this.keyword, this.paginator?.pageIndex, this.paginator?.pageSize);

    this.userService.getAll(params)
      .subscribe(
        response => {
          const { users, totalItems } = response;
          this.users = users;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteUser(id: number): void {
  this.userService.delete(id)
    .subscribe({
      next: (res) => {
        this.retrieveUsers();
      },
      error: (e) => console.error(e)
    });
  }

  ngAfterViewInit() {
    this.paginator?.page
      .pipe(
        tap(() => this.retrieveUsers())
      )
      .subscribe()
  }

  refreshList(): void {
    this.retrieveUsers();
    // @ts-ignore
    this.currentUser = {};
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  removeAllUsers(): void {
    this.userService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        }
      );
  }

  searchKeyword(): void {
    this.page = 1;
    this.retrieveUsers();
  }
}
