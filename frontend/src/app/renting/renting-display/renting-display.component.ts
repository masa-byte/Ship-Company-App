import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Renting } from '../renting.model';

@Component({
  selector: 'app-renting-display',
  templateUrl: './renting-display.component.html',
  styleUrls: ['./renting-display.component.scss']
})
export class RentingDisplayComponent {

  @Input() renting!: Renting | undefined;
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() rateRequest = new EventEmitter<number[]>();

  constructor() { }

  rateRenting() {
    let a = Date.parse(this.renting!.endDate.toString());
    let b = Date.parse(new Date().toString());

    if (a > b)
      this.rateRequest.emit([-2]);
    else if (this.renting!.isRated == false)
      this.rateRequest.emit([this.renting!.id, 
        this.renting!.boat == null ? -1 : this.renting!.boat!.id, 
        this.renting!.jetSki == null ? -1 : this.renting!.jetSki!.id]);
    else
      this.rateRequest.emit([-1]);
  }

  deleteRenting() {
    this.deleteRequest.emit(this.renting!.id);
  }
}
