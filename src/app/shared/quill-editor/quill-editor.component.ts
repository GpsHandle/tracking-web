import {
    AfterViewInit,
    Component, ElementRef, EventEmitter,
    forwardRef, Input,
    OnChanges,
    OnInit, Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
declare var require: any;
const Quill = require('quill');


@Component({
    selector: 'quill-editor',
    template: `<div class="quill-editor"></div>`,
    styleUrls: [
        './quill-editor.component.scss',
        '../../../../node_modules/quill/dist/quill.core.css',
        '../../../../node_modules/quill/dist/quill.bubble.css',
        '../../../../node_modules/quill/dist/quill.snow.css'
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => QuillEditorComponent),
        multi: true
    }],
    encapsulation: ViewEncapsulation.None
})
export class QuillEditorComponent implements AfterViewInit, ControlValueAccessor, OnChanges {

    quillEditor: any;
    editorElem: HTMLElement;
    content: any;
    defaultModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': new Array<any>() }, { 'background': new Array<any>() }],          // dropdown with defaults from theme
            [{ 'font': new Array<any>() }],
            [{ 'align': new Array<any>() }],

            ['clean'],                                         // remove formatting button

            ['link', 'image', 'video']                         // link and image, video
        ]
    };

    @Input() options: Object;
    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();
    @Output() ready: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();

    onModelChange: Function = () => {};
    onModelTouched: Function = () => {};

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        this.editorElem = this.elementRef.nativeElement.children[0];

        this.quillEditor = new Quill(this.editorElem, Object.assign({
            modules: this.defaultModules,
            placeholder: 'Insert text here ...',
            readOnly: false,
            theme: 'snow',
            boundary: document.body
        }, this.options || {}));

        // 写入内容
        if (this.content) {
            this.quillEditor.pasteHTML(this.content);
        }

        // 广播事件
        this.ready.emit(this.quillEditor);

        // mark model as touched if editor lost focus
        this.quillEditor.on('selection-change', (range: any) => {
            if (!range) {
                this.onModelTouched();
                this.blur.emit(this.quillEditor);
            } else {
                this.focus.emit(this.quillEditor);
            }
        });

        // update model if text changes
        this.quillEditor.on('text-change', (delta: any, oldDelta: any, source: any) => {
            let html = this.editorElem.children[0].innerHTML;
            const text = this.quillEditor.getText();

            if (html === '<p><br></p>') html = null;

            this.onModelChange(html);

            this.change.emit({
                editor: this.quillEditor,
                html: html,
                text: text
            });
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['readOnly'] && this.quillEditor) {
            this.quillEditor.enable(!changes['readOnly'].currentValue);
        }

    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;

    }

    registerOnTouched(fn: any): void {
        this.onModelTouched = fn;

    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(currentValue: any): void {
        this.content = currentValue;

        if (this.quillEditor) {
            if (currentValue) {
                this.quillEditor.pasteHTML(currentValue);
                return;
            }
            this.quillEditor.setText('');
        }

    }


}
