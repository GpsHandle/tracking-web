import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest} from "@angular/common/http";
import {catchError, last, map, tap} from "rxjs/operators";
import {of, Subscription} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ImageUploadComponent implements OnInit {
  imgUrl: string;

  @Input() param = 'file';
  /** Target URL for file uploading. */
  @Input() target = 'api/account/upload';

  @Input() width = 200;
  @Input() height = 200;
  constructor(private _http: HttpClient) { }

  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter<string>();

  ngOnInit(): void {
  }

    imgUpload() {
      const fileUpload = document.getElementById('imgUpload') as HTMLInputElement;
      fileUpload.onchange = () => {
          const file = fileUpload.files[0];
        this.uploadFile({ data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true });
      };
      fileUpload.click();
    }

  private uploadFile(file: FileUploadModel) {
    const fd = new FormData();
    fd.append(this.param, file.data);

    const req = new HttpRequest('POST', this.target, fd, {
      reportProgress: true
    });

    file.inProgress = true;
    file.sub = this._http.request(req).pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round(event.loaded * 100 / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        tap(message => { }),
        last(),
        catchError((error: HttpErrorResponse) => {
          console.log('Error', error);
          file.inProgress = false;
          file.canRetry = true;
          return of(`${file.data.name} upload failed.`);
        })
    ).subscribe(
        (event: any) => {
          console.log('Uploaded: ', event);
          if (typeof (event) === 'object') {
            this.imgUrl = event.body.url;
            this.complete.emit(event.body);
          }
        }
    );
  }
}
export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}
