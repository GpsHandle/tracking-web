import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuillEditorComponent} from "./quill-editor.component";

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        QuillEditorComponent
    ],
    declarations: [
        QuillEditorComponent
    ]
})
export class QuillEditorModule { }
