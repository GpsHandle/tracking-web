import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailComponent } from './mail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MailRoutingModule} from "./mail-routing.module";
import {MaterialShared} from "../../shared/material-shared";
import {QuillEditorModule} from "../../shared/quill-editor";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialShared,
        MailRoutingModule,
        QuillEditorModule
    ],
    declarations: [MailComponent]
})
export class MailModule { }
