import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'app-create-button',
    templateUrl: './create-button.component.html',
    styleUrl: './create-button.component.css'
})

// Компонент для кнопки, которая позволяет создать новую запись
export class CreateButtonComponent {
    constructor(
        public modalService: ModalService
    ) { }
}