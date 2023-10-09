import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AppState } from 'src/app/app.state';
import * as StaffActions from '../../store/actions/staff.actions';

@Component({
  selector: 'app-staff-search-bar',
  templateUrl: './staff-search-bar.component.html',
  styleUrls: ['./staff-search-bar.component.scss']
})
export class StaffSearchBarComponent {
  filters: { [key: string]: boolean } = {
    instructor: false,
    captain: false,
    staff: false,
    chef: false,
    entertainer: false,
    security: false
  }

  searchText: string = '';
  searchControl = new FormControl();
  selectedParameter: string = "noCriteria";
  selectedOrder: string = "desc";

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.search();
      });
  }

  search() {
    let selectedOrder = this.selectedOrder === "desc" ? false : true;
    let selectedFilters = Object.keys(this.filters).filter(key => this.filters[key]);

    this.store.dispatch(StaffActions.sortStaff({
      sortingCriteria: this.selectedParameter,
      sortAscending: selectedOrder,
      jobFilter: selectedFilters,
      searchText: this.searchText
    }));
  }
}
