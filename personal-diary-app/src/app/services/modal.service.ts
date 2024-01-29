import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

// Сервис модального окна
export class ModalService {
    showModal$ = new BehaviorSubject<boolean>(false); // Состояние модального окна (по умолчанию окно закрыто)

    // Меняем состояние для открытия окна
    openModalWindow(): void {
        this.showModal$.next(true);
    }

    // Меняем состояние для закрытия окна
    closeModalWindow(): void {
        this.showModal$.next(false);
    }
}