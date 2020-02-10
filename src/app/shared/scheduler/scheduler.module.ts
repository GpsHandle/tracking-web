import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { TimeInput } from './daytime/time-input';
import { Weekday } from './weekday/weekday';
import { DayTime } from './daytime/day-time';

@NgModule({
  imports: [
    CommonModule,
    MatChipsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    Weekday,
    DayTime,
    TimeInput
  ],

  declarations: [
    Weekday,
    DayTime,
    TimeInput
  ]
})
export class SchedulerModule { }
