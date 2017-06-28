import { DateModule } from './date-component/date.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DateComponent } from './date-component/date.component';

import { MdAutocompleteModule, MdButtonModule, MdCheckboxModule, MdInputModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
