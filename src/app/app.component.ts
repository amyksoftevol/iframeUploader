import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'iframeUploader';
  message = {};

  ngOnInit() {
    window.addEventListener('message', event => {
      console.log('Event from PARENT: ', event);
      this.message = JSON.parse(event.data);
      console.log('Data from PARENT: ', this.message);
    });
  }

  uploadChoosedVideo(elemIdName: string) {
    const fileInputElement = document.getElementById(elemIdName);

    const processVideo = event => {
      fileInputElement.removeEventListener('change', processVideo);
        console.log('UPLOADED FILE: ', event.target['files']);
        // if (!videoUpload) {
        //     this.videoUploadService.addFilesAndUpload(event.target['files']);
        // } else {
        //     this.videoUploadService.addFileAndUpload(event.target['files'], videoUpload);
        // }
        // fileInputElement['value'] = '';
    };

    const preventClickPropagation = event => {
        event.stopPropagation();
        fileInputElement.removeEventListener('click', preventClickPropagation);
    };

    fileInputElement.addEventListener('change', processVideo);
    fileInputElement.addEventListener('click', preventClickPropagation);
    fileInputElement.click();
  }

  // // addEventListener support for IE8
  // bindEvent(element, eventName, eventHandler) {
  //   if (element.addEventListener) {
  //       element.addEventListener(eventName, eventHandler, false);
  //   } else if (element.attachEvent) {
  //       element.attachEvent('on' + eventName, eventHandler);
  //   }
  // }

  // // removeEventListener support for IE8
  // unbindEvent(element, eventName, eventHandler) {
  //   if (element.removeEventListener) {
  //       element.removeEventListener(eventName, eventHandler);
  //   } else if (element.detachEvent) {
  //       element.detachEvent('on' + eventName, eventHandler);
  //   }
  // }

}
