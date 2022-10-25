import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AddHouseComponent} from "./add-edit-view-house/add-house.component";
import {EditHouseComponent} from "./add-edit-view-house/edit-house.component";
import {SearchHousesComponent} from "./search-houses/search-houses.component";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DetailHouseComponent } from './detail-house/detail-house.component';
import {MatDividerModule } from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {AppointmentsComponent } from './appointments/appointments.component';
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ContactAgentDialogComponent} from "./contact-agent-dialog/contact-agent-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AddHouseComponent,
    EditHouseComponent,
    SearchHousesComponent,
    DetailHouseComponent,
    AppointmentsComponent,
    ContactAgentDialogComponent
  ],
  imports: [
    MatDividerModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    RouterModule.forChild([
      {path: "get-all-appointments", component: AppointmentsComponent},
      {path: "search", component: SearchHousesComponent},
      {path: "add", component: AddHouseComponent},
      {path: "edit/:id", component: EditHouseComponent},
      {path: "view/:id", component: DetailHouseComponent}
    ]),
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  bootstrap: []
})
export class HousesModule {
}
