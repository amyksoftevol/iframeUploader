import { Component, OnInit } from '@angular/core';

export class IframeStyle {
  public title: Object;
  public button: Object;

  constructor(data?:any) {
    if (!data) data = {};
    this.title = data.title || {};
    this.button = data.button || {};
  }
}

export class IframeGlobalConfig {
  public authToken: string;
  public style: IframeStyle;

  constructor(data?:any) {
    if (!data) data = {};
    this.authToken = data.authToken || '';
    this.style = data && data.style ? new IframeStyle(data.style) : new IframeStyle();
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'iframeUploader';
  config = new IframeGlobalConfig();

  ngOnInit() {
    window.addEventListener('message', event => {
      console.log('Config from PARENT: ', event);
      // let data = {
			// 	authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlbWFpbCIsInN1YiI6IjY3MiIsImlhdCI6MTU0MzQ5MjEzOCwiZXhwIjoxNTQ0MDk2OTM4fQ.0QA-IznaT6KvJMuwxAZNa5Wi7PBCLVibe3eoYUc26rg",
			// 	style: {
      //     title: {'color':'#FFF', 'background-color':'#BAAFD5'}
      //   }
			// };
      // this.config = data;
      this.config = new IframeGlobalConfig(event.data);
      console.log('Final Config: ', this.config);
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
