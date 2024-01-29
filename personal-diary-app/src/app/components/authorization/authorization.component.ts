import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrl: './authorization.component.css'
})

// Компонент для авторизации 
export class AuthorizationComponent {
    form = new FormGroup({
        email: new FormControl<string>('', [
            Validators.required // обязательное поле
        ]),
        password: new FormControl<string>('', [
            Validators.required // обязательное поле
        ])
    })

    constructor(public authService: AuthService) { }

    // Для контроля ввода значений в полях для отображения валидации
    // Поля email и пароль являются обязательным, пока они не заполнены, пользователь не сможет отправить запрос на авторизацию
    get email() {
        return this.form.controls.email as FormControl;
    }

    get password() {
        return this.form.controls.password as FormControl;
    }

    // Запрос пользователя для авторизации 
    auth(): void {
        const email = this.form.value.email;
        const password = this.form.value.password;

        if (email && password) {
            this.authService.login(email, password)
        }
    }
}