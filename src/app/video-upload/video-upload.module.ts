import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoUploadComponent } from './video-upload.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { VideoUploadService } from './services/video-upload.service';
import { ApiRequestService } from './services/api-request.service';
import { AkamaiRequestService } from './services/akamai-request.service';

@NgModule({
  declarations: [
    VideoUploadComponent,
    DragAndDropDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VideoUploadComponent
  ],
  providers: [
    VideoUploadService,
    ApiRequestService,
    AkamaiRequestService
  ]
})
export class VideoUploadModule { }
