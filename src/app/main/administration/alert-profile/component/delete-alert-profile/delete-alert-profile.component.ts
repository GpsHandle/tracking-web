import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AlertProfile} from "../../../../../models/alert-profile";

@Component({
  selector: 'app-delete-alert-profile',
  templateUrl: './delete-alert-profile.component.html',
  styleUrls: ['./delete-alert-profile.component.scss']
})
export class DeleteAlertProfileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertProfile | any) { }

  ngOnInit() {
  }

}
