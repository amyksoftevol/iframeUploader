import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoUploadComponent } from './video-upload.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    VideoUploadComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    VideoUploadComponent
  ]
})
export class VideoUploadModule { }
