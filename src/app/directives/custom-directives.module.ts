import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowIfRoleDirective } from './show-if-role.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      ShowIfRoleDirective
  ],
  exports: [
      ShowIfRoleDirective,
  ]
})
export class CustomDirectivesModule { }
