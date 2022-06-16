import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {SessionService} from "../../services/session.service";
import {UtilService} from "../../services/util.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
  });
  signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
  });

  constructor(private fb: FormBuilder, private api: ApiService, private route: Router, private session: SessionService,
              public router: Router, private util: UtilService, public snack: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  /**
   * function for Login
   */
  onSubmit(): any {
    if (this.loginForm.valid) {
      this.api.doLogin(this.loginForm.value.email, this.loginForm.value.password).subscribe(async data => {
        console.log('data while login', data);
        await this.session.setUser(data.user);
        await this.session.setToken(data.token);
        await this.api.setToken();
        const tok = localStorage.getItem('FCM')
        this.api.getSites().subscribe(async sites => {
            console.log('These are all sites...', sites)
            // data.user.site = sites.rows[0];
            // console.log('these are ', data)
            // await this.session.setUser(data.user);
            await this.session.setSite(sites.rows[0]);
          }, error => {
            console.log('An error occurred while creating site', error);
          }
        )
        await this.route.navigate(['/']);
      }, error => {
        this.snack.open('Unable to login, please check id and password!', '', {duration: 3000});
      });
    }
    else {
      this.snack.open('Wrong email and password.', 'Ok', { duration: 3000} )
    }
  }

  /**
   * function for Signup
   */
  signUp(): any {
    const body = this.signUpForm.value;
    body.username = body.email;
    if (this.signUpForm.valid) {
      if (this.signUpForm.value.password === this.signUpForm.value.confirmPassword) {
        this.api.doSignUp(body).subscribe(  async user => {
          console.log('User SignUp Successful::', user);
          await this.session.setUser(user.user);
          await this.session.setToken(user.token);
          await this.api.setToken();
          await this.session.removeSite();
          console.log('this site in session', this.session.getSite());
          await this.route.navigateByUrl('/');
        }, error => {
          this.util.presentSnackBar('Email already exists');
        });
      } else {
        this.util.presentSnackBar('Password and confirm password do not match');
      }

    } else {
      this.util.presentSnackBar('Please valid email and correct password');
    }
  }



}
