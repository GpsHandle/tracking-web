import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';

@Injectable()
export class Effects {

    constructor(private actions$: Actions) {
    }
}
