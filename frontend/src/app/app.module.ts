import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageModule } from './home-page/home-page.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { MainPageModule } from './main-page/main-page.module';
import { StaffModule } from './staff/staff.module';
import { staffReducer } from './store/reducers/staff.reducer';
import { StaffEffects } from './store/effects/staff.effects';
import { JetSkiModule } from './jet-ski/jet-ski.module';
import { jetSkiReducer } from './store/reducers/jet-ski.reducer';
import { JetSkiEffects } from './store/effects/jet-ski.effects';
import { boatReducer } from './store/reducers/boat.reducer';
import { BoatEffects } from './store/effects/boat.effects';
import { BoatModule } from './boat/boat.module';
import { CruiseShipModule } from './cruise-ship/cruise-ship.module';
import { cruiseShipReducer } from './store/reducers/cruise-ship.reducer';
import { CruiseShipEffects } from './store/effects/cruise-ship.effects';
import { rentingReducer } from './store/reducers/renting.reducer';
import { RentingEffects } from './store/effects/renting.effects';
import { suiteReducer } from './store/reducers/suite.reducer';
import { SuiteEffects } from './store/effects/suite.effects';
import { cruiseReducer } from './store/reducers/cruise.reducer';
import { CruiseEffects } from './store/effects/cruise.effects';
import { CruiseModule } from './cruise/cruise.module';
import { DestinationModule } from './destination/destination.module';
import { destinationReducer } from './store/reducers/destination.reducer';
import { DestinationEffects } from './store/effects/destination.effects';
import { reservationReducer } from './store/reducers/reservation.reducer';
import { ReservationEffects } from './store/effects/reservation.effects';
import { EmailEffects } from './store/effects/email.effects';
import { CompanyModule } from './company/company.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomePageModule,
    MainPageModule,
    StaffModule,
    JetSkiModule,
    BoatModule,
    CruiseShipModule,
    CruiseModule,
    DestinationModule,
    CompanyModule,
    StoreModule.forRoot({
      userInfo: userReducer,
      staff: staffReducer,
      jetSkies: jetSkiReducer,
      boats: boatReducer,
      cruiseShips: cruiseShipReducer,
      rentings: rentingReducer,
      suites: suiteReducer,
      cruises: cruiseReducer,
      destinations: destinationReducer,
      reservations: reservationReducer
    }, {}),
    EffectsModule.forRoot([
      UserEffects,
      StaffEffects,
      JetSkiEffects,
      BoatEffects,
      CruiseShipEffects,
      RentingEffects,
      SuiteEffects,
      CruiseEffects,
      DestinationEffects,
      ReservationEffects,
      EmailEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
