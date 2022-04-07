import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from 'src/app/services/user';
import { UserService } from "../../services/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import {tap} from "rxjs";
import {UpdateService} from "../../services/update.service";
import {RoleEnum} from "../../models/roleEnum";
import {TokenStorageService} from "../../services/token-storage.service";
import { MatDialog } from "@angular/material/dialog";
import {UsersDialogComponent} from "../users-dialog/users-dialog.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {

  users!: User[];
  editUser!: User;
  currentUser! : User;

  currentIndex: number = -1;
  keyword: string = '';

  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes: number[] = [5, 10, 20]
  userId!: number;
  message = '';
  updating: boolean = false;
  isSuccessful: boolean = false;
  isUpdateFailed: boolean = false;
  submitted: boolean = false;


  @ViewChild(MatPaginator)
  paginator?: MatPaginator;

  profileForm!: FormGroup;


  form: any = {
    jobTitle: null,
    phone: null
  }

  userRoles!: RoleEnum[];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private updateService: UpdateService,
              private tokenStorage: TokenStorageService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentUser = this.route.snapshot.data["user"]

    this.retrieveUsers();
    this.getAllUsers();

    if (this.tokenStorage.getToken()) {
      this.currentUser = this.tokenStorage.getUser().roles;
    }

    this.profileForm = new FormGroup({
      id: new FormControl(this.currentUser.id),
      jobTitle: new FormControl(this.currentUser.jobTitle),
      roles: new FormControl(this.currentUser.roles)
    })
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      }
    );
  }

  openDialog(id: number, user: User): void {
    user.id = id;
    this.setActiveUser(user, this.currentIndex);
    const dialogRef = this.dialog.open(UsersDialogComponent, {
      data: {id, jobTitle: this.currentUser.jobTitle, roles: this.currentUser.roles},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.currentUser = result;
    });
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

  findUserById(id: number) {
    this.userService.get(id)
      .subscribe( {
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

  onUpdate(){
    this.updating = true;
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

  reloadPage(): void {
    window.location.reload();
  }
}


