import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-diary-entry-list',
    templateUrl: './diary-entry-list.component.html',
    styleUrl: './diary-entry-list.component.css'
})

// Компонент для отображения всех записей пользователя
export class DiaryEntryListComponent implements OnInit {
    entries: any[] = [];
    userEmail: string = '';

    constructor(
        private dataService: DataService,
        private authService: AuthService
    ) { }

    // Подписываемся на изменения для отображения записей и email пользователя (если он авторизован)
    ngOnInit(): void {
        this.dataService.getEntries().subscribe((entries) => {
            this.entries = entries;
        });
        this.authService.getUserEmail().subscribe((email) => {
            this.userEmail = email;
        });
    }
}