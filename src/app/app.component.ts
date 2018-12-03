import { Component, OnInit, ViewEncapsulation } from '@angular/core';

export class IframeOptions {
  public source: string;
  public authToken: string;
  public cssEmbedded: string;
  public cssExternal: string;

  constructor(data?:any) {
    if (!data) data = {};
    this.source = data.source;
    this.authToken = data.authToken;
    this.cssEmbedded = data.cssEmbedded || '';
    this.cssExternal = data.cssExternal || '';
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'iframeUploader';
  options: IframeOptions;

  ngOnInit() {
    // listen events from parent
    window.addEventListener('message', event => {
      console.log('Message from PARENT: ', event);
      // const data = {
      //   operation: 'load',
      //   options: {
      //     source: "iframeParent",
      //     operation: "",
      //     authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlbWFpbCIsInN1YiI6IjY3MiIsImlhdCI6MTU0MzQ5MjEzOCwiZXhwIjoxNTQ0MDk2OTM4fQ.0QA-IznaT6KvJMuwxAZNa5Wi7PBCLVibe3eoYUc26rg",
      //     cssEmbedded: ".title{color:#FFF;background-color:#BAAFD5;} .button{background-color:#13b49f;font-size:14px;color:#FFF;font-weight:500;}",
      //     cssExternal: "https://dl.dropbox.com/s/khutet5bmu9bl7w/styles.css"
      //   }
      // };
      const data = event && event.data;
      console.log('Data: ', data);
      if (!data || !data.options || !data.operation) return;
      if (data.options.source !== 'iframeParent') return;
      if (!data.options.authToken) return;

      if (data.operation === 'load') {
        this.options = new IframeOptions(data.options);
      }

      if (this.options.cssEmbedded) {
        this.createEmbeddedStyles(this.options.cssEmbedded);
      }
      if (this.options.cssExternal) {
        this.createExternalStyles(this.options.cssExternal);
      }

      if (data.operation === 'chooseVideo') {
        this.chooseVideo();
      }
      
    });
  }

  sendMessageToParentWindow(message) {
    window.parent.postMessage(message, '*');
  }

  createEmbeddedStyles(css: string) {
    const id = 'cssEmbedded';
    const cssEmbeddedElement = document.getElementById(id);

    if (cssEmbeddedElement) return;

    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.id = id;
    style.type = 'text/css';
    if (style['styleSheet']){
      // This is required for IE8 and below.
      style['styleSheet'].cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);

  }

  createExternalStyles(cssHref: string) {
    const id = 'cssExternal';
    const cssExternalElement = document.getElementById(id);

    if (cssExternalElement) return;

    const head = document.head || document.getElementsByTagName('head')[0];
    const link  = document.createElement('link');
    link.id = id;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = cssHref;
    head.appendChild(link);

  }

  chooseVideo() {
    const fileInputElement = document.getElementById('video-upload');
    fileInputElement.click();
  }

  processVideo(event: Event, elementId: string) {
      console.log('UPLOADED FILE: ', event.target['files']);
      const fileInputElement = document.getElementById(elementId);
      // fileInputElement['value'] = '';
  };

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
