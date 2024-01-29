import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})

// Сервис для регистрации и авторизации пользователя
export class AuthService {
    private user: string = '';
    private userEmail$ = new BehaviorSubject<string>('');
    authError$ = new BehaviorSubject<string>('');

    constructor(
        private afAuth: AngularFireAuth, 
        private router: Router
    ) {
        this.getUserEmailFromLocalStorage(); // Извлечение email пользователя из local storage
    }

    // Запрос на регистрацию, использование firebase
    async register(email: string, password: string) {
        try {
            const res: any = await this.afAuth.createUserWithEmailAndPassword(email, password);
            this.user = res.user.multiFactor.user.email; 
            this.notifySubscribers();
            this.saveUserToLocalStorage();
            this.authError$.next(''); 
            this.router.navigate(['/']); // При успешной регистрации перенаправление на страницу с записями и отображение email пользователя 
        } catch (error) {
            this.authError$.next('Ошибка при регистрации: Пользователь с таким email уже существует'); // Если возникла ошибка при регистрации, появится поле форме
        }
    }

    // Запрос на авторизацию, использование firebase
    async login(email: string, password: string) {
        try {
            const res: any = await this.afAuth.signInWithEmailAndPassword(email, password);
            this.user = res.user.multiFactor.user.email; 
            this.notifySubscribers();
            this.saveUserToLocalStorage();
            this.authError$.next(''); 
            this.router.navigate(['/']); // При успешной авторизации перенаправление на страницу с записями и отображение email пользователя 
        } catch (error) {
            this.authError$.next('Ошибка при входе: Неверный логин или пароль'); // Если возникла ошибка, появится поле в форме
        } 
    }

    // Отслеживание изменений email для отображения текущего состояния
    private notifySubscribers() {
        this.userEmail$.next(this.user);
    }

    // Получение email пользователя из local storage
    private getUserEmailFromLocalStorage(): void {
        try {
            const storedEmail = localStorage.getItem('userEmail');
            this.user = storedEmail ? JSON.parse(storedEmail) : '';
            this.notifySubscribers();
        } catch (error) {
            this.user = '';
            this.notifySubscribers();
        }
    }

    // Сохранение email в local storage
    private saveUserToLocalStorage(): void {
        localStorage.setItem('userEmail', JSON.stringify(this.user));
    }

    // Получение email пользователя
    getUserEmail() {
        return this.userEmail$.asObservable();
    }
}