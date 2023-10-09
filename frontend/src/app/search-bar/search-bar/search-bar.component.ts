import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { sortBoats } from 'src/app/store/actions/boat.actions';
import { sortJetSkies } from 'src/app/store/actions/jet-ski.actions';
import { sortCruiseShips } from 'src/app/store/actions/cruise-ship.actions';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  filters = {
    jetSki: false,
    boat: false,
    cruiseShip: false
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

    if (this.filters.boat == false && this.filters.jetSki == false && this.filters.cruiseShip == false) {
      if (this.selectedParameter !== "maxSpeed")
        this.store.dispatch(sortBoats({ sortingCriteria: this.selectedParameter, sortAscending: selectedOrder, searchText: this.searchText }));
      else
        this.store.dispatch(sortBoats({ sortingCriteria: "none", sortAscending: false, searchText: this.searchText }));

      if (this.selectedParameter !== "capacity" && this.selectedParameter !== "yearBuilt")
        this.store.dispatch(sortJetSkies({ sortingCriteria: this.selectedParameter, sortAscending: selectedOrder, searchText: this.searchText }));
      else
        this.store.dispatch(sortJetSkies({ sortingCriteria: "none", sortAscending: false, searchText: this.searchText }));

      if (this.selectedParameter === "yearBuilt" || this.selectedParameter === "rating" || this.selectedParameter === "noCriteria")
        this.store.dispatch(sortCruiseShips({ sortingCriteria: this.selectedParameter, sortAscending: selectedOrder, searchText: this.searchText }));
      else
        this.store.dispatch(sortCruiseShips({ sortingCriteria: "none", sortAscending: false, searchText: this.searchText }));
    }
    else {
      if (this.filters.boat == true) {
        if (this.selectedParameter !== "maxSpeed")
          this.store.dispatch(sortBoats({ sortingCriteria: this.selectedParameter, sortAscending: selectedOrder, searchText: this.searchText }));
        else
          this.store.dispatch(sortBoats({ sortingCriteria: "none", sortAscending: false, searchText: this.searchText }));
      }
      else
        this.store.dispatch(sortBoats({ sortingCriteria: "none", sortAscending: false, searchText: this.searchText }));

      if (this.filters.jetSki == true) {
        if (this.selectedParameter !== "capacity" && this.selectedParameter !== "yearBuilt")
          this.store.dispatch(sortJetSkies({ sortingCriteria: this.selectedParameter, sortAscending: selectedOrder, searchText: this.searchText }));
        else
          this.store.dispatch(sortJetSkies({ sortingCriteria: "none", sortAscending: false, searchText: this.searchText }));
      }
      else
        this.store.dispatch(sortJetSkies({ sortingCriteria: "none", sortAscending: false, searchText: this.searchText }));

      if (this.filters.cruiseShip == true) {
        if (this.selectedParameter === "yearBuilt" || this.selectedParameter === "rating" || this.selectedParameter === "noCriteria")
          this.store.dispatch(sortCruiseShips({ sortingCriteria: this.selectedParameter, sortAscending: selectedOrder, searchText: this.searchText }));
        else
          this.store.dispatch(sortCruiseShips({ sortingCriteria: "none", sortAscending: false, searchText: this.searchText }));
      }
      else
        this.store.dispatch(sortCruiseShips({ sortingCriteria: "none", sortAscending: false, searchText: this.searchText }));
    }
  }
}
