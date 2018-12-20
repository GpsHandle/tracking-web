import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowIfRoleDirective } from './show-if-role.directive';
import { ShowIfDemoDirective } from './show-if-demo.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      ShowIfRoleDirective,
      ShowIfDemoDirective
  ],
  exports: [
      ShowIfRoleDirective,
      ShowIfDemoDirective
  ]
})
export class CustomDirectivesModule { }
