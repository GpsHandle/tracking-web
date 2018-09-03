import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-panel-command',
  templateUrl: './panel-command.component.html',
  styleUrls: ['./panel-command.component.scss']
})
export class PanelCommandComponent implements OnInit {
    device: any;

  constructor(private bottomSheetRef: MatBottomSheetRef<PanelCommandComponent>) { }

  ngOnInit() {
  }

}
