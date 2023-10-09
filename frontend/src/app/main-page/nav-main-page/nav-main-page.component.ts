import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectUserType } from 'src/app/store/selectors/user.selectors';
import * as UserAction from 'src/app/store/actions/user.actions';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-nav-main-page',
  templateUrl: './nav-main-page.component.html',
  styleUrls: ['./nav-main-page.component.scss']
})
export class NavMainPageComponent implements OnInit {

  userType$: Observable<string | undefined> = of();

  constructor(private store: Store<AppState>, private router: Router,) { }

  ngOnInit(): void {
    this.userType$ = this.store.select(selectUserType);
  }

  addNewCompany() {
    this.router.navigate(['companyForm']);
  }

  addNewEmployee() {
    this.router.navigate(['staffForm', 'false']);
  }

  openMyRentings() {
    this.router.navigate(['rentings', 'rentingList']);
  }

  openCruiseShipForm() {
    this.router.navigate(['cruiseShipForm', 'false']);
  }

  openBoatForm() {
    this.router.navigate(['boatForm', 'false']);
  }

  openJetSkiForm() {
    this.router.navigate(['jetSkiForm', 'false']);
  }

  openCruiseForm() {
    this.router.navigate(['cruiseForm']);
  }

  openMainPage() {
    this.router.navigate(['mainPage', 'listItems']);
  }

  openProfile() {
    this.router.navigate(['mainPage', 'profile']);
  }

  signOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('rememberMe');
    this.store.dispatch(UserAction.signOut());
    this.router.navigate(['']);
  }
}
