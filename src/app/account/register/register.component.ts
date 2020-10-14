import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup = this.fb.group({
    accountId: [null, [Validators.required, Validators.maxLength(50)]],
    password: [null, [Validators.required]],
    rePassword: [null, [Validators.required]],
    firstName: [],
    lastName: [],
    phoneNumber: [null, [Validators.required]],
    emailAddress: [null, [Validators.required, Validators.email]],
    address: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
