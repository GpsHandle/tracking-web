import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {XAccountService} from "../x-account.service";
import {AccountRequest} from "../../models/request/account.request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    accountId: [null, [Validators.required, Validators.maxLength(50)]],
    password: [null, [Validators.required]],
    rePassword: [null, [Validators.required]],
    firstName: [],
    lastName: [],
    phoneNumber: [null, [Validators.required]],
    emailAddress: [null, [Validators.required, Validators.email]],
    addressLine1: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private xService: XAccountService) { }

  ngOnInit() {
  }

  register() {
    const req = {
      accountId: this.registerForm.get(['accountId'])!.value,// this.registerForm.get(['email'])!.value;
      firstName: this.registerForm.get(['firstName'])!.value,// this.registerForm.get(['email'])!.value;
      lastName: this.registerForm.get(['lastName'])!.value,// this.registerForm.get(['email'])!.value;
      password: this.registerForm.get(['password'])!.value,// this.registerForm.get(['email'])!.value;
      phoneNumber: this.registerForm.get(['phoneNumber'])!.value,// this.registerForm.get(['email'])!.value;
      emailAddress: this.registerForm.get(['emailAddress'])!.value,// this.registerForm.get(['email'])!.value;
      addressLine1: this.registerForm.get(['addressLine1'])!.value,// this.registerForm.get(['email'])!.value;
  } as AccountRequest;
    this.xService.register(req).subscribe(
        data => console.log('Register result: ', data)
    );
  }
}
