import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AppState } from 'src/app/app.state';
import * as CruiseActions from '../../store/actions/cruise.actions';

@Component({
  selector: 'app-cruise-search-bar',
  templateUrl: './cruise-search-bar.component.html',
  styleUrls: ['./cruise-search-bar.component.scss']
})
export class CruiseSearchBarComponent {
  filters: { [key: string]: boolean } = {
    party: false,
    romantic: false,
    luxury: false,
    nye: false,
    family: false
  }

  @Input() cruiseShipName: string = '';

  searchText: string = '';
  searchControl = new FormControl();
  selectedParameter: string = "noCriteria";
  selectedOrder: string = "desc";

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    if (this.cruiseShipName !== "") {
      this.searchControl.setValue(this.cruiseShipName);
      this.searchText = this.cruiseShipName;
    }
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

    this.store.dispatch(CruiseActions.sortCruises({
      sortingCriteria: this.selectedParameter,
      sortAscending: selectedOrder,
      typeFiler: selectedFilters,
      searchText: this.searchText
    }));
  }
}
