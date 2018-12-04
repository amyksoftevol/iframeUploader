import { Directive, Input, Output, EventEmitter, HostListener, HostBinding, ElementRef } from '@angular/core';


@Directive({
    selector: '[appDragAndDrop]'
})

export class DragAndDropDirective {

    constructor(private elementRef: ElementRef) { }

    private rgbaWhiteColor = 'rgba(255, 255, 255, 1)';
    private rgbaWhiteColorTransparent = 'rgba(255, 255, 255, 0.5)';

    @Output() private filesAdded: EventEmitter<any[]> = new EventEmitter();
    @Input() private bgDragLeave: string;
    @Input() private bgDragEnter: string;

    @HostBinding('style.background') private backgroundColor = this.bgDragLeave || this.rgbaWhiteColor;
    @HostBinding('style.zIndex') private zIndex = '-1';

    @HostListener('document:dragenter', ['$event']) onDragEnterDocument(event) {
        this.preventDefaultAndStopPropagation(event);
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.zIndex = '1';
            this.backgroundColor = this.bgDragEnter || this.rgbaWhiteColorTransparent;
        }
    }

    @HostListener('document:dragleave', ['$event']) onDragLeaveDocument(event) {
        this.preventDefaultAndStopPropagation(event);
        if (event.offsetX < 0 && event.offsetY < 0) {
            this.zIndex = '-1';
        }
    }

    @HostListener('dragover', ['$event']) public onDragOver(event) {
        this.preventDefaultAndStopPropagation(event);
    }
    @HostListener('dragleave', ['$event']) public onDragLeave(event) {
        this.preventDefaultAndStopPropagation(event);
        if (this.elementRef.nativeElement === event.target) {
            this.zIndex = '-1';
            this.backgroundColor = this.bgDragLeave || this.rgbaWhiteColor;
        }

    }

    @HostListener('drop', ['$event']) public onDrop(event) {
        this.preventDefaultAndStopPropagation(event);
        this.backgroundColor = this.bgDragLeave || this.rgbaWhiteColor;
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            this.filesAdded.emit(files);
        }
        this.zIndex = '-1';
    }

    preventDefaultAndStopPropagation(event) {
        event.preventDefault();
        event.stopPropagation();
    }

}
