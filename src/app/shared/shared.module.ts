import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MaterialShared} from "./material-shared";
import { ImageUploadComponent } from './image-upload/image-upload.component';



@NgModule({
  declarations: [FileUploadComponent, ImageUploadComponent],
  exports: [
    FileUploadComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    MaterialShared
  ]
})
export class SharedModule { }
