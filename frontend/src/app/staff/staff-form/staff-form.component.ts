import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Staff } from '../staff.model';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import * as StaffActions from 'src/app/store/actions/staff.actions';
import { EMPTY, Observable, Subscription, of, switchMap, take } from 'rxjs';
import { selectSelectedStaff, selectStaffError } from 'src/app/store/selectors/staff.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit, OnDestroy {
  staff: Staff = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    address: '',
    birthDate: new Date(),
    jobTitle: '',
    salary: 0,
    yearsOfExperience: 0
  };

  isEditing!: boolean;

  error$: Observable<string | null> = of();
  errorSubscription: Subscription = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.error$ = this.store.select(selectStaffError);

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const editingParam = params.get('editing');
          this.isEditing = editingParam === 'true';

          if (this.isEditing) {
            return this.store.select(selectSelectedStaff).pipe(
              take(1)
            );
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe((staff) => {
        if (staff)
          this.staff = {...staff};
      });
  }

  ngOnDestroy(): void {
    if (this.errorSubscription)
      this.errorSubscription.unsubscribe();
  }

  action() {
    this.store.dispatch(StaffActions.clearStaffError());
    if (this.isEditing)
      this.store.dispatch(StaffActions.updateStaff({ staff: this.staff }));
    else
      this.store.dispatch(StaffActions.addStaff({ staff: this.staff }));

    this.errorSubscription = this.error$.subscribe((error) => {
      if (error)
        this.openSnackBar(error);
      else {
        if (this.isEditing)
          this.openSnackBar("Staff member successfully updated!");
        else
          this.openSnackBar("Staff member successfully added!");
      }
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

