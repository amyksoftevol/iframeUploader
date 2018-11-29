import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iframeUploader';

  uploadChoosedVideo(elemIdName: string) {
    const fileInput = document.getElementById(elemIdName);

    const processVideo = event => {
        fileInput.removeEventListener('change', processVideo);
        console.log('UPLOADED FILE: ', event.target['files']);
        // if (!videoUpload) {
        //     this.videoUploadService.addFilesAndUpload(event.target['files']);
        // } else {
        //     this.videoUploadService.addFileAndUpload(event.target['files'], videoUpload);
        // }
        // fileInput['value'] = '';
    };

    const preventClickPropagation = event => {
        event.stopPropagation();
        fileInput.removeEventListener('click', preventClickPropagation);
    };

    fileInput.addEventListener('change', processVideo);
    fileInput.addEventListener('click', preventClickPropagation);
    fileInput.click();
  }

}
