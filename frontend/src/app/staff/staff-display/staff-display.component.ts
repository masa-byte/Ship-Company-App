import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Staff } from '../staff.model';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import * as StaffActions from '../../store/actions/staff.actions';

@Component({
  selector: 'app-staff-display',
  templateUrl: './staff-display.component.html',
  styleUrls: ['./staff-display.component.scss']
})
export class StaffDisplayComponent {

  @Input() staff!: Staff | undefined;
  @Output() deleteRequest = new EventEmitter<number>();

  constructor(private router: Router, private store: Store<AppState>) { }

  editStaff() {
    this.store.dispatch(StaffActions.selectStaff({ id: this.staff!.id }));
    this.router.navigate(['staffForm', 'true']);
  }

  deleteStaff() {
    this.deleteRequest.emit(this.staff!.id);
  }
}
