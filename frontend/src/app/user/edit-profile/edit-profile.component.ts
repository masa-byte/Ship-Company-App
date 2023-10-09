import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { User } from 'src/app/user/user.model';
import * as UserActions from 'src/app/store/actions/user.actions';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: User = {
    id: 0,
    email: '',
    password: '',
    name: '',
    surname: null,
    birthDate: null,
    phone: '',
    address: '',
    type: 'user'
  };

  oldPassword: string = '';
  newPassword: string = '';

  hideNewPassword: boolean = true;
  hideOldPassword: boolean = true;

  user$: Observable<User | null> = of();
  error$: Observable<string | null> = of();

  constructor(
    private dialogRef: MatDialogRef<EditProfileComponent>,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.user$.subscribe((user) => {
      if (user) {
        this.user.id = user.id;
        this.user.email = user.email;
        this.user.name = user.name;
        this.user.surname = user.surname;
        this.user.phone = user.phone;
        this.user.address = user.address;
        this.user.birthDate = user.birthDate;
        this.user.type = user.type;
      }
    });
  }

  confirmEdit(): void {
    if (this.newPassword !== '' && this.oldPassword === '') {
      this.openSnackBar('Please enter your old password!');
      return;
    }
    else {
      if (this.newPassword !== '') {
        this.userService.checkPassword(this.user.id, this.oldPassword).subscribe((response) => {
          if (response.body) {
            this.user.password = this.newPassword;
            this.store.dispatch(UserActions.updateUser({ user: this.user }));
            this.dialogRef.close();
          }
          else {
            this.openSnackBar('Old password is incorrect!');
            return;
          }
        });
      }
      else {
        this.user.password = undefined;
        this.store.dispatch(UserActions.updateUser({ user: this.user }));
        this.dialogRef.close();
      }
    }
  }

  cancelEdit(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
