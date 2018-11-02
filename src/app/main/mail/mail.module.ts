import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailComponent } from './mail.component';
import { MailRoutingModule } from 'app/main/mail/mail-routing.module';
import { QuillEditorModule } from 'app/shared/quill-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MailRoutingModule,
        QuillEditorModule
    ],
    declarations: [MailComponent]
})
export class MailModule { }
