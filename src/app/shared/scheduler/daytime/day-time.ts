import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MyTime, TimeInput } from './time-input';
import {padStart} from 'lodash-es';

@Component({
  selector: 'daytime',
  templateUrl: './daytime.html',
  styleUrls: ['./daytime.scss']
})
export class DayTime implements OnInit {

  scheduleTime: MyTime;
  @Input() editMode = true;
  @ViewChild(TimeInput, { static: true }) timeInput: TimeInput;
  constructor() { }

  ngOnInit() {
    this.scheduleTime = this.scheduleTime ? this.scheduleTime : new MyTime('00', '00', '23', '59');
  }

  setBizTime() {
    this.scheduleTime = {fromHour: '08', fromMinute: '00', toHour: '17', toMinute: '59'} as MyTime;
  }

  setAllDay() {
    this.scheduleTime = {fromHour: '00', fromMinute: '00', toHour: '23', toMinute: '59'} as MyTime;
  }

  @Input()
  set data(time: any) {
      const fh = padStart(String(time.fromHour), 2, '0');
      const fm = padStart(String(time.fromMinute), 2, '0');
      const th = padStart(String(time.toHour), 2, '0');
      const tm = padStart(String(time.toMinute), 2, '0');
      this.scheduleTime = {fromHour: fh, fromMinute: fm, toHour: th, toMinute: tm};
  }

  get data(): any{
      return this.scheduleTime;
  }
}
