import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoUploadModule } from './video-upload/video-upload.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VideoUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
