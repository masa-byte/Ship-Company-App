import { Component } from '@angular/core';
import { Boat } from '../boat.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, switchMap, take, EMPTY } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectBoatError, selectSelectedBoat } from 'src/app/store/selectors/boat.selector';
import * as BoatActions from 'src/app/store/actions/boat.actions';

@Component({
  selector: 'app-boat-form',
  templateUrl: './boat-form.component.html',
  styleUrls: ['./boat-form.component.scss']
})
export class BoatFormComponent {
  boat: Boat = {
    id: 0,
    name: '',
    type: '',
    yearBuilt: 0,
    capacity: 0,
    rating: 0,
    pricePerDay: 0
  };

  capacities: number[] = [
    1, 2, 4, 8, 10, 15, 20
  ];

  types: string[] = [
    'Sailboat',
    'Catamaran',
    'Motorboat',
    'Kayak',
    'Canoe',
    'Inflatable',
  ];

  isEditing!: boolean;

  error$: Observable<string | null> = of();
  errorSubscription: Subscription = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.error$ = this.store.select(selectBoatError);

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const editingParam = params.get('editing');
          this.isEditing = editingParam === 'true';

          if (this.isEditing) {
            return this.store.select(selectSelectedBoat).pipe(
              take(1)
            );
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe((boat) => {
        if (boat)
          this.boat = { ...boat };
      });
  }

  ngOnDestroy(): void {
    if (this.errorSubscription)
      this.errorSubscription.unsubscribe();
  }

  action() {
    this.store.dispatch(BoatActions.clearBoatError());
    if (this.isEditing)
      this.store.dispatch(BoatActions.updateBoat({ boat: this.boat }));
    else
      this.store.dispatch(BoatActions.addBoat({ boat: this.boat }));

    this.errorSubscription = this.error$.subscribe((error) => {
      if (error)
        this.openSnackBar(error);
      else {
        if (this.isEditing)
          this.openSnackBar("Boat successfully updated!");
        else
          this.openSnackBar("Boat successfully added!");
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
