import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-geozone-report',
  templateUrl: './geozone.component.html',
  styleUrls: ['./geozone.component.scss']
})
export class GeozoneComponent implements OnInit {
    private _device: number;
    private _from: number;
    private _to: number;

    get device(): number {
        return this._device;
    }

    @Input()
    set device(value: number) {
        this._device = value;
    }

    get from(): number {
        return this._from;
    }

    @Input()
    set from(value: number) {
        this._from = value;
    }

    get to(): number {
        return this._to;
    }

    @Input()
    set to(value: number) {
        this._to = value;
    }

    constructor() { }

  ngOnInit() {
  }

}
