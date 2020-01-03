import { Component, OnInit } from '@angular/core';
import {AlertProfile} from "../../../../../models/alert-profile";

@Component({
  selector: 'app-alert-profile-edit',
  templateUrl: './alert-profile-edit.component.html',
  styleUrls: ['./alert-profile-edit.component.scss']
})
export class AlertProfileEditComponent implements OnInit {
    data: AlertProfile;
    isEditing: boolean;
    types: any;
    zoneList: any;

  constructor() { }

  ngOnInit() {
  }

    edit() {

    }

    save() {

    }

    cancel() {

    }
}
