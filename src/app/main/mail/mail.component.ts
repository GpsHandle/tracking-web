import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-mail',
    templateUrl: './mail.component.html',
    styleUrls: ['./mail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MailComponent implements OnInit {

    public form:FormGroup;
    public content: AbstractControl;

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
        this.form = _fb.group({
            'content': ['<p>I am Example 01</p>', Validators.compose([Validators.required])],
        });

        this.content = this.form.controls['content'];
    };

    public submitAnnouncement(values:Object):void {
        if (this.form.valid) {
            console.log('Submit!', values);
        }
    }

    ngOnInit(): void {
    }


}
