import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  timeoutId: any;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // this.timeoutId = setTimeout(() => {
    //   this.openSnackBar(
    //     'You are not logged in. Please sign in or sign up to continue!'
    //   );
    //   this.router.navigate(['/signUpUser']);
    // }, 60000);
  }

  signIn() {
    //clearTimeout(this.timeoutId);
    this.router.navigate(['/signInUser']);
  }

  signUp() {
    //clearTimeout(this.timeoutId);
    this.router.navigate(['/signUpUser']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
