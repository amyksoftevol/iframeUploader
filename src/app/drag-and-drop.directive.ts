import { Directive, Input, Output, EventEmitter, HostListener, HostBinding, ElementRef } from '@angular/core';


@Directive({
    selector: '[appDragAndDrop]'
})

export class DragAndDropDirective {
    constructor(private _eref: ElementRef) { }
    private defaultBackgroundColor = 'rgba(255, 255, 255, 1)';
    private defaultBackgroundColorDragOver = 'rgba(255, 255, 255, 0.7)';

    @Output() private filesAdded: EventEmitter<any[]> = new EventEmitter();
    @Input() private bg: string;
    @Input() private bgDragOver: string;

    @HostBinding('style.background') private backgroundColor = this.bg || this.defaultBackgroundColor;
    @HostBinding('style.zIndex') private zIndex = '-1';

    @HostListener('document:dragenter', ['$event']) onDragOverDocument(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this._eref.nativeElement.contains(event.target)) {
            this.zIndex = '1';
            this.backgroundColor = this.bgDragOver || this.defaultBackgroundColorDragOver;
        }
    }

    @HostListener('document:dragleave', ['$event']) onDragLeaveDocument(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.offsetX < 0 && event.offsetY < 0) {
            this.zIndex = '-1';
        }
    }

    @HostListener('dragover', ['$event']) public onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    @HostListener('dragleave', ['$event']) public onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this._eref.nativeElement === event.target) {
            this.zIndex = '-1';
            this.backgroundColor = this.bg || this.defaultBackgroundColor;
        }

    }

    @HostListener('drop', ['$event']) public onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.backgroundColor = this.bg || this.defaultBackgroundColor;
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            this.filesAdded.emit(files);
        }
        this.zIndex = '-1';
    }

}
