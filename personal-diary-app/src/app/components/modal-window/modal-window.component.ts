import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'app-modal-window',
    templateUrl: './modal-window.component.html',
    styleUrl: './modal-window.component.css'
})

// Компонент модального окна
export class ModalWindowComponent {
    @Input() modalTitle: string = '';

    constructor(public modalService: ModalService) { }
}