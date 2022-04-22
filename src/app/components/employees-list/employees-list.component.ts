import {Component, OnInit, ViewChild} from '@angular/core';
import {ListOfOwnersResponse, User} from "../../services/user";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {tap} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator?: MatPaginator;

  owners: User[] = [];
  currentUser! : User;

  page: number = 1;
  count: number = 0;
  pageSize: number = 4;
  pageSizes: number[] = [4, 8, 12, 16]
  userId!: number;
  message = '';

  currentIndex: number = -1;
  keyword: string = '';

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.route.snapshot.data["user"]
    this.retrieveUsers();
    this.getAllOwners();

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

  getAllOwners(): void {
    this.userService.getAllOwners().subscribe(
      (response: ListOfOwnersResponse) => {
        console.log(response);
        this.owners = response.owners;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  retrieveUsers(): void {
    // @ts-ignore
    const params = this.getRequestParams(this.keyword, this.paginator?.pageIndex, this.paginator?.pageSize);

    this.userService.getOwners(params)
      .subscribe(
        response => {
          const { owners, totalItems } = response;
          console.log(owners);
          this.owners = owners;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  clearSearch() {
    this.keyword = '';
    this.refreshList()
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

  reloadPage(): void {
    window.location.reload();
  }

}
