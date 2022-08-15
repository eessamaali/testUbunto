import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstallmentCalculatorComponent } from './Components/installment-calculator/installment-calculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatListModule} from '@angular/material/list';
import { InstallmentService } from './Services/installment.service';
import { MatOptionModule } from '@angular/material/core';
import {MatFormFieldModule}from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    InstallmentCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule


  ],
  providers: [InstallmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
