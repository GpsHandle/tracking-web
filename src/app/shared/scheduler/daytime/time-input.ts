import { FocusMonitor} from '@angular/cdk/a11y';
import { coerceBooleanProperty} from '@angular/cdk/coercion';
import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MatFormFieldControl} from '@angular/material';
import { Subject} from 'rxjs';

export class MyTime {
  constructor(public fromHour: string, public fromMinute: string, public toHour: string, public toMinute: string) {}
}

@Component({
  selector: 'time-input',
  template: `
    <div [formGroup]="parts">
      <input type="text" formControlName="fromHour" size="2">
      <span>:</span>
      <input type="text" formControlName="fromMinute" size="2">
      <span>&ndash;</span>
      <input type="text" formControlName="toHour" size="2">
      <span>:</span>
      <input type="text" formControlName="toMinute" size="2">
    </div>
  `,
  styles: [`
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    input {
      display: flex;
      border: none;
      background: none;
      padding: 0;
      outline: none;
      font: inherit;
      text-align: center;
    }
    span {
      opacity: 0;
      transition: opacity 200ms;
    }
    :host.floating span {
      opacity: 1;
    }
    `],
  providers: [{provide: MatFormFieldControl, useExisting: TimeInput}],
})
export class TimeInput implements MatFormFieldControl<MyTime>, OnInit, OnDestroy {
  static nextId = 0;
  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;

  ngControl = null;
  errorState = false;
  controlType = 'time-input';

  private _placeholder: string;
  private _required = false;
  private _disabled = false;


  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('id') id = `time-input-${TimeInput.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';

  constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef) {
    this.parts = fb.group({
      fromHour:   '00',
      fromMinute: '00',
      toHour:     '23',
      toMinute:   '59'
    });

    fm.monitor(elRef.nativeElement, true).subscribe(
      origin => {
        this.focused = !!origin;
        this.stateChanges.next();
      }
    );
  }

  ngOnInit() {
  }
  get empty() {
    const {value: {fromHour, fromMinute, toHour, toMinute}} = this.parts;
    return !fromHour && !fromMinute && !toHour && !toMinute;
  }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next(); }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get value(): MyTime | null {
    const {value: {fromHour, fromMinute, toHour, toMinute}} = this.parts;
    if (fromHour.length === 2 && fromMinute.length === 2 && toHour.length === 2 && toMinute.length === 2) {
      return new MyTime(fromHour, fromMinute, toHour, toMinute);
    }
    return null;
  }
  set value(tel: MyTime | null) {
    const {fromHour, fromMinute, toHour, toMinute} = tel || new MyTime('', '', '', '');
    this.parts.setValue({fromHour, fromMinute, toHour, toMinute});
    this.stateChanges.next();
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }
}
