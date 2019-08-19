import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DeviceReportCommService {
    // Observable sources
    private commandSource = new Subject<string>();

    // Observable stream
    command$ = this.commandSource.asObservable();

    // send command
    toggleSideNav() {
        this.commandSource.next("TOGGLE_SIDE_NAV");
    }
}
