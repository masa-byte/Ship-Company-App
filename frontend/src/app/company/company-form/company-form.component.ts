import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, switchMap, take, EMPTY } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectUserError } from 'src/app/store/selectors/user.selectors';
import { User } from 'src/app/user/user.model';
import * as UserActions from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent {
  company: User = {
    id: 0,
    email: '',
    password: '',
    name: '',
    surname: null,
    birthDate: null,
    address: '',
    phone: '',
    type: 'company',
  };

  hidePassword: boolean = true;

  error$: Observable<string | null> = of();
  errorSubscription: Subscription = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.error$ = this.store.select(selectUserError);
  }

  ngOnDestroy(): void {
    if (this.errorSubscription)
      this.errorSubscription.unsubscribe();
  }

  action() {
    this.store.dispatch(UserActions.clearUserError());
    this.store.dispatch(UserActions.createCompanyUser({ company: this.company }));

    this.errorSubscription = this.error$.subscribe((error) => {
      if (error)
        this.openSnackBar(error);
      else
        this.openSnackBar("Company user successfully added!");
    });
  }

  back() {
    window.history.back();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
