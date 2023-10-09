import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from './store/actions/user.actions';
import { AppState } from './app.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ship company';

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    const savedUserId = localStorage.getItem('userId');
    const savedRememberMe = localStorage.getItem('rememberMe');
    if (savedRememberMe) {
      const rememberMe = savedRememberMe === 'true';
      if (rememberMe) {
        const id = parseInt(savedUserId as string);
        this.store.dispatch(UserActions.setUserId({ userId: id }));
        this.router.navigate(['mainPage', 'listItems']);
      }
      else {
        localStorage.removeItem('userId');
        this.router.navigate(['']);
      }
    }
    else {
      this.router.navigate(['']);
    }
  }
}
