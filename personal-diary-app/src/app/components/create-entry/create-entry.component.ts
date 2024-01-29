import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'app-create-entry',
    templateUrl: './create-entry.component.html',
    styleUrl: './create-entry.component.css'
})

// Компонент для создания новой записи
export class CreateEntryComponent {
    form = new FormGroup({
        text: new FormControl<string>('', [
            Validators.required // поле обязательное
        ]),
        image: new FormControl<any>('') // не обязательное поле
    })

    constructor(
        private dataService: DataService,
        public modalService: ModalService
    ) {}

    // Для контроля ввода значений в полях для отображения валидации
    // Поле текст является обязательным, пока оно не заполнено, пользователь не сможет нажать на кнопку и создать запись
    get text() {
        return this.form.controls.text as FormControl;
    }

    // Функция для отображения выбранного файла
    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            this.form.patchValue({ image: reader.result });
        }
        reader.readAsDataURL(file);
    }

    // Функция для создания новой записи
    submit(): void {
        const currentDate = new Date();
        const newEntry = {
            time: currentDate,
            text: this.form.value.text,
            image: this.form.value.image || null 
        };
    
        this.dataService.addEntry(newEntry);
        this.modalService.closeModalWindow();
    }
}