import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'edit-entry.component',
    templateUrl: './edit-entry.component.html',
    styleUrl: './edit-entry.component.css'
})

// Компонент для редактирования записи
export class EditEntryComponent implements OnInit {
    currentEntry: any; // для отображения выбранной записи для редактирования 

    form = new FormGroup({
        text: new FormControl<string>('', [
            Validators.required // обязательное поле
        ]),
        image: new FormControl<any>('')
    })

    constructor(
        private dataService: DataService,
        private router: Router
    ) {}

    get text() {
        return this.form.controls.text as FormControl;
    }

    // Отображаем содержимое выбранной записи для редактирования  
    ngOnInit(): void {
        this.currentEntry = this.dataService.getCurrentEntry() || {};

        this.form.patchValue({
            text: this.currentEntry.text,
            image: this.currentEntry.image 
        });
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

    // Функция для сохранения изменений после редактирования 
    submit(): void {
        this.currentEntry.text = this.form.value.text;
        this.currentEntry.image = this.form.value.image;
        this.dataService.editEntry(this.currentEntry);
        this.router.navigate(['/']);
    }
}