import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-mail',
    templateUrl: './mail.component.html',
    styleUrls: ['./mail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MailComponent implements OnInit {
    public editor;
    public editorContent = `<h3>I am Example 02</h3>`;

    public editorConfig = {
        theme: 'snow',
        placeholder: "ENTER MAIL BODY HERE",
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['link', 'image'],
                ['clean']
            ]
        }
    };

    constructor(private _fb:FormBuilder) {
    };

    onEditorBlured(quill) {
        console.log('editor blur!', quill);
    }

    onEditorFocused(quill) {
        console.log('editor focus!', quill);
    }

    onEditorCreated(quill) {
        this.editor = quill;
        console.log('quill is ready! this is current quill instance object', quill);
    }

    onContentChanged({ quill, html, text }) {
        console.log('quill content is changed!', quill, html, text);
    }

    ngOnInit(): void {
        // setTimeout(() => {
        //     this.editorContent = '<h1>Example 02 changed!</h1>';
        //     console.log('you can use the quill instance object to do something', this.editor);
        //     // this.editor.disable();
        // }, 2800)
    }


}
