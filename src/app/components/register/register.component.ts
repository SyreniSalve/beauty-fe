import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  defaultImage = 'https://cdn-icons-png.flaticon.com/512/3237/3237472.png';

  form: any = {
    username: null,
    firstName: null,
    lastName: null,
    jobTitle: null,
    phone: null,
    dateOfBirth: null,
    email: null,
    password: null,
    city: null,
    state: null,
    imageUrl: null
  };

  isSuccessful: boolean = false;
  isSignupFailed: boolean = false;
  errorMessage: string = '';
  hide: boolean = false;

  showDetails!: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const {username, firstName, lastName, jobTitle, phone, dateOfBirth, email, password, city, state, imageUrl } = this.form;
    this.authService.register(username, firstName, lastName, jobTitle ? this.form.jobTitle : "user", phone,
      dateOfBirth, email, password, city, state, imageUrl ? this.form.imageUrl : this.defaultImage)
      .subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignupFailed = false;
        this.reloadPage();
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignupFailed = true;
      }
    )
  }

  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }

  reloadPage(): void {
    window.location.assign('/greeting');
  }

}
