import { Component } from '@angular/core';
import { JetSki } from '../jet-ski.model';
import { EMPTY, Observable, of, Subscription, switchMap, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as JetSkiActions from 'src/app/store/actions/jet-ski.actions';
import { selectJetSkiError, selectSelectedJetSki } from 'src/app/store/selectors/jet-ski.selectors';

@Component({
  selector: 'app-jet-ski-form',
  templateUrl: './jet-ski-form.component.html',
  styleUrls: ['./jet-ski-form.component.scss']
})
export class JetSkiFormComponent {
  jetSki: JetSki = {
    id: 0,
    model: '',
    color: '',
    maxSpeed: 0,
    rating: 0,
    pricePerDay: 0,
  };

  colors: string[] = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Black',
    'White',
    'Orange',
    'Purple',
    'Pink',
    'Brown',
    'Grey',
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
    this.error$ = this.store.select(selectJetSkiError);

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const editingParam = params.get('editing');
          this.isEditing = editingParam === 'true';

          if (this.isEditing) {
            return this.store.select(selectSelectedJetSki).pipe(
              take(1)
            );
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe((jetSki) => {
        if (jetSki)
          this.jetSki = { ...jetSki };
      });
  }

  ngOnDestroy(): void {
    if (this.errorSubscription)
      this.errorSubscription.unsubscribe();
  }

  action() {
    this.store.dispatch(JetSkiActions.clearJetSkiError());
    if (this.isEditing)
      this.store.dispatch(JetSkiActions.updateJetSki({ jetSki: this.jetSki }));
    else
      this.store.dispatch(JetSkiActions.addJetSki({ jetSki: this.jetSki }));

    this.errorSubscription = this.error$.subscribe((error) => {
      if (error)
        this.openSnackBar(error);
      else {
        if (this.isEditing)
          this.openSnackBar("Jet Ski successfully updated!");
        else
          this.openSnackBar("Jet Ski successfully added!");
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
