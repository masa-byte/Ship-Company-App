import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reservation } from '../reservation.model';

@Component({
  selector: 'app-reservation-display',
  templateUrl: './reservation-display.component.html',
  styleUrls: ['./reservation-display.component.scss']
})
export class ReservationDisplayComponent {
  @Input() reservation!: Reservation | undefined;
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() rateRequest = new EventEmitter<number[]>();

  constructor() { }

  rateReservation() {
    let a = Date.parse(this.reservation!.cruise!.endDate.toString());
    let b = Date.parse(new Date().toString());

    if (a > b)
      this.rateRequest.emit([-2]);
    else if (this.reservation!.isRated == false)
      this.rateRequest.emit([this.reservation!.id, this.reservation!.cruise!.cruiseShip!.id]);
    else
      this.rateRequest.emit([-1]);
  }

  deleteReservation() {
    this.deleteRequest.emit(this.reservation!.id);
  }
}
