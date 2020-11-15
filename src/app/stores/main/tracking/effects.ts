import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadAllDevicesFailureAction,
    loadAllDevicesRequestAction,
    loadAllDevicesSuccessAction} from "./actions";
import {catchError, map, mapTo, startWith, switchMap} from "rxjs/operators";
import {interval, of, timer} from "rxjs";
import {DeviceService} from "../../../core/services/device.service";
import {Device} from "../../../models/device";

@Injectable()
export class Effects {
    constructor(private actions$: Actions, private deviceService: DeviceService) {
    }

    loadDeviceListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(loadAllDevicesRequestAction),
        switchMap((action) => interval(10000).pipe(
            startWith(0),
            mapTo(action)
        )),
        switchMap((action) => {
            console.log('loading all devices ...');
            return this.deviceService.getAllDevice();

        }),
        map((devices: Device[]) => loadAllDevicesSuccessAction({devices: devices})),
        catchError((err: string) => of(loadAllDevicesFailureAction({error: err})))
    ));
}
