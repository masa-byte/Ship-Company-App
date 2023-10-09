import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectUserError, selectUser } from 'src/app/store/selectors/user.selectors';
import { User } from 'src/app/user/user.model';
import * as UserActions from 'src/app/store/actions/user.actions';

import * as EmailActions from 'src/app/store/actions/email.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  email: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';
  birthDate: Date = new Date();
  address: string = '';
  phone: string = '';
  hidePassword: boolean = true;
  rememberMe: boolean = false;

  user$: Observable<User | null> = of();
  error$: Observable<string | null> = of();

  errorSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.error$ = this.store.select(selectUserError);
  }

  ngOnDestroy(): void {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  signIn() {
    this.router.navigate(['/signInUser']);
  }

  signUp() {
    this.store.dispatch(UserActions.clearUserError());
    this.store.dispatch(UserActions.signUp(
      { 
        email: this.email, 
        password: this.password, 
        name: this.name, 
        surname: this.surname, 
        birthDate: this.birthDate,
        phone: this.phone,
        address: this.address
       }));
    this.store.dispatch(EmailActions.sendWelcomeEmail({ email: this.email, userName: this.name }));

    this.userSubscription = this.user$.subscribe((user) => {
      if (user) {
        localStorage.setItem('userId', user.id.toString());
        localStorage.setItem('rememberMe', this.rememberMe.toString());
        this.router.navigate(['/mainPage', 'listItems']);
      }
    });
    this.errorSubscription = this.error$.subscribe((error) => {
      if (error) {
        this.openSnackBar(error);
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
