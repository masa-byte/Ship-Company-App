import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dateRangeValidator } from '../dateValidator';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-renting-dialog',
  templateUrl: './renting-dialog.component.html',
  styleUrls: ['./renting-dialog.component.scss']
})
export class RentingDialogComponent implements OnInit {
  rentForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<RentingDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.rentForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      pricePerDay: new FormControl({ value: data.pricePerDay, disabled: true }),
      calculatedPrice: new FormControl({ value: null, disabled: true })
    }, { validators: dateRangeValidator });
  }

  ngOnInit(): void {
    this.rentForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.calculatePrice();
      });
  }

  calculatePrice() {
      const startDate = this.rentForm.get('startDate')!.value;
      const endDate = this.rentForm.get('endDate')!.value;
      const pricePerDay = this.rentForm.get('pricePerDay')!.value;

      if (startDate && endDate) {
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        const totalPrice = (daysDiff + 1) * pricePerDay;

        this.rentForm.get('calculatedPrice')!.setValue(totalPrice);
    }
  }

  onConfirm() {
    this.dialogRef.close([this.rentForm.get('startDate')!.value, this.rentForm.get('endDate')!.value, this.rentForm.get('calculatedPrice')!.value]);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
