import { Component, OnInit } from '@angular/core';
import {XAccountService} from "../x-account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {flatMap} from "rxjs/operators";
import {Account} from "../../models/account";

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  error = false;
  success = false;

  constructor(private xService: XAccountService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(flatMap(params => this.xService.activate(params.key))).subscribe(
        (userDto: Account)  => {
          this.success = true;
          // route to verify phone
          this.router.navigate(['/account/c/login'])
        },
        () => (this.error = true)
    );

  }

}
