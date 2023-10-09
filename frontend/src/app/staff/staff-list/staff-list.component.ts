import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as StaffActions from '../../store/actions/staff.actions';
import { Observable, Subscription, map, of } from 'rxjs';
import { selectFilteredStaffs, selectStaffError } from 'src/app/store/selectors/staff.selectors';
import { Staff } from '../staff.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit, OnDestroy {

  staff$: Observable<[string, Staff | undefined][]> = of();
  error$: Observable<string | null> = of();

  errorSubscription: Subscription = new Subscription();

  @HostBinding('style.overflow')
  overflow = 'auto';
  
  constructor(
    private store: Store<AppState>, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.error$ = this.store.select(selectStaffError);
    this.staff$ = this.store.select(selectFilteredStaffs).pipe(
      map((staffEntities) => Object.entries(staffEntities))
    );
    
    this.store.dispatch(StaffActions.loadStaff());
  }

  ngOnDestroy(): void {
    if (this.errorSubscription)
      this.errorSubscription.unsubscribe();
  }

  deleteStaff(event: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(StaffActions.clearStaffError());
        this.store.dispatch(StaffActions.deleteStaff({ id: event }));
        this.errorSubscription = this.error$.subscribe((error) => {
          if (error)
            this.openSnackBar(error);
          else
            this.openSnackBar('Staff member deleted successfully!');
        });
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
