import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CommandParcel } from 'app/main/tracking/live/model/CommandParcel';
import { DeviceService } from 'app/services/device.service';
import { ApplicationContext } from 'app/application-context';

@Component({
    selector: 'app-panel-command',
    templateUrl: './command.component.html',
    styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
    deviceName: string;
    cmdStr: string;

    constructor(private deviceService: DeviceService,
                private applicationContext: ApplicationContext,
                private bottomSheetRef: MatBottomSheetRef<CommandComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: CommandParcel) { }

    ngOnInit() {
        this.deviceName = this.data.deviceName || this.data.deviceId;
    }

    send() {
        if (!!this.cmdStr) {
            this.deviceService.sendCommand(this.data.id, this.cmdStr).subscribe(
                response => {
                    this.bottomSheetRef.dismiss();
                    this.applicationContext.info('Command sent!');
                }
            )
        } else {
            this.applicationContext.error('Please enter cmd string!');
        }
    }

    cancel() {
        this.bottomSheetRef.dismiss();
    }
}
