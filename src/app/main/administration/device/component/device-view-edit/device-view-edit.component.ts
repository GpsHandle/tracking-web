import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-device-view-edit',
    templateUrl: './device-view-edit.component.html',
    styleUrls: ['./device-view-edit.component.scss']
})
export class DeviceViewEditComponent implements OnInit {
    isEditing: boolean;

    constructor() { }

    ngOnInit() {
    }

    save() {

    }

    edit() {
        this.isEditing = true;
    }

    cancel() {

    }
}
