import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent {

  // default min-year
  readonly minYear = 1900;

  // max year is not in future
  readonly maxYear = new Date().getFullYear();

  public dateGroup = this.fb.group({
    day: ['', Validators.compose([Validators.required, DaysFormatValidator()])],
    month: ['', Validators.compose([Validators.required, MonthsFormatValidator()])],
    year: ['',
      Validators.compose([
        Validators.required,
        Validators.min(this.minYear),
        Validators.max(this.maxYear),
        YearsFormatValidator()
      ])
    ]
  }, { validator: DateFormatValidator('day', 'month', 'year') });

  constructor(private fb: FormBuilder) {
  }
}

export function DaysFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    const value = control.value;

    const dayRegex = new RegExp(/0[1-9]|[12]\d|3[01]/);

    if (dayRegex.test(value)) {
      return null; // is valid
    } else {
      return {
        dayNotValid: true
      };
    }

  };
}

export function MonthsFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    const value = control.value;

    const monthRegex = new RegExp(/^(0[1-9]|1[012])$/);

    if (monthRegex.test(value)) {
      return null; // is valid
    } else {
      return {
        monthNotValid: true
      };
    }

  };
}


export function YearsFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    const value = control.value;

    const yearRegex = new RegExp(/^\d{4}$/);

    if (yearRegex.test(value)) {
      return null; // is valid
    } else {
      return {
        yearNotValid: true
      };
    }

  };
}


export function DateFormatValidator(dayKey: string, monthKey: string, yearKey: string): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } => {

    const day = +group.controls[dayKey].value;
    const month = +group.controls[monthKey].value;
    const year = +group.controls[yearKey].value;

    // only if all components are filled out
    if (!group.controls[dayKey].valid || !group.controls[monthKey].valid || !group.controls[yearKey].valid) {
      return null;
    }

    // months are intended from 1 to 12
    const months31 = [1, 3, 5, 7, 8, 10, 12]; // months with 31 days
    const months30 = [4, 6, 9, 11]; // months with 30 days
    const months28 = [2]; // the only month with 28 days (29 if year isLeap)

    const isLeap = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);

    // see also https://stackoverflow.com/a/38922551/557335
    const valid =
      (months31.indexOf(month) !== -1 && day <= 31) ||
      (months30.indexOf(month) !== -1 && day <= 30) ||
      (months28.indexOf(month) !== -1 && day <= 28) ||
      (months28.indexOf(month) !== -1 && day <= 29 && isLeap);

    if (!valid) {
      return {
        dateNotValid: true
      }
    }
    return null;
  };
}