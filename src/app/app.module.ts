import { DateModule } from './date-component/date.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

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
