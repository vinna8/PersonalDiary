import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-diary-entry',
    templateUrl: './diary-entry.component.html',
    styleUrl: './diary-entry.component.css'
})

// Компонент для записи в дневнике 
export class DiaryEntryComponent {
    @Input() entry: any;

    constructor(private dataService: DataService, private router: Router) { }

    // Фукнция, позволяющая удалить запись
    deleteEntryFromDiary(time: string) : void {
        this.dataService.deleteEntry(time);
    }

    // Функция, позволяющая редактировать запись
    edit(entry: any): void {
        this.dataService.setCurrentEntry(entry);
        this.router.navigate([`/edit/${entry.time}`]);
    }
}