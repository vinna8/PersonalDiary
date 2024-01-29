import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

// Сервис для работы с данными
export class DataService {
    private entries: any[] = [];
    private currentEntry: any;
    private data$ = new BehaviorSubject<any[]>([]);

    constructor() {
        this.getEntriesFromLocalStorage(); // Получение записи из local storage
        this.getCurrentEntryFromLocalStorage(); // Получение выбранной записи для редактирования из local storage
    }

    // Отслеживание изменений записей для отображения текущего состояния в реальном времени
    private notifySubscribers() {
        this.sortEntries(); 
        this.data$.next([...this.entries]);
    }

    // Получение записи из local storage
    private getEntriesFromLocalStorage(): void {
        try {
            const storedEntries = localStorage.getItem('diaryEntries');
            this.entries = storedEntries ? JSON.parse(storedEntries) : [];
            this.notifySubscribers();
        } catch (error) {
            this.entries = [];
            this.notifySubscribers();
        }
    }

    // Сортировка записей в хронологическом порядке, от самой свежей к более поздним
    private sortEntries() {
        this.entries.sort((a, b) => {
            return new Date(b.time).getTime() - new Date(a.time).getTime();
        });
    }

    // Обновление записей в local storage при редактировании/удалении записи
    private updateEntryToLocalStorage(): void {
        localStorage.setItem('diaryEntries', JSON.stringify(this.entries));
        this.notifySubscribers(); 
    }

    // Сохранение выбранной пользователем записи для редактирования 
    private saveCurrentEntryToLocalStorage(): void {
        localStorage.setItem('currentEntry', JSON.stringify(this.currentEntry));
    }

    // Получение из local storage выбранной пользователем записи для редактирования  
    private getCurrentEntryFromLocalStorage(): void {
        try {
            const storedCurrentEntry = localStorage.getItem('currentEntry');
            this.currentEntry = storedCurrentEntry ? JSON.parse(storedCurrentEntry) : null;
        } catch (error) {
            this.currentEntry = null;
        }
    }

    // Добавление новой записи
    addEntry(entry: any): void {
        this.entries.push(entry); // Добавляем запись в массив
        this.updateEntryToLocalStorage(); // Обновляем массив в local storage
    }

    // Удаление записи
    deleteEntry(time: string): void {
        this.entries = this.entries.filter((entry) => entry.time !== time); // Удаляем запись из массива (в качестве id используем значение времени, так как оно уникально)
        this.updateEntryToLocalStorage(); // Обновляем массив в local storage
    }

    // Редактирование записи
    editEntry(updatedEntry: any): void {
        this.entries = this.entries.map((entry) => { // Заменяем выбранную запись на новую в массиве
            if (entry.time === updatedEntry.time) {
                return { ...entry, ...updatedEntry }
            }

            return entry;
        })
        this.updateEntryToLocalStorage(); // Обновляем массив в local storage
    }

    // Сохранение выбранной пользователем записи для редактирования
    setCurrentEntry(entry: any): void {
        this.currentEntry = entry;
        this.saveCurrentEntryToLocalStorage();
    }

    // Получение записей
    getEntries() {
        return this.data$.asObservable();
    }

    // Получение выбранной пользователем записи
    getCurrentEntry(): any {
        return this.currentEntry;
    }
}