import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrl: '../authorization/authorization.component.css'
})

// Компонент для регистрации пользователя 
export class RegistrationComponent { 
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
    // Поля email и пароль являются обязательным, пока они не заполнены, пользователь не сможет отправить запрос на регистрацию
    get email() {
        return this.form.controls.email as FormControl;
    }

    get password() {
        return this.form.controls.password as FormControl;
    }

     // Запрос пользователя для регистрации  
    registration(): void {
        const email = this.form.value.email;
        const password = this.form.value.password;

        if (email && password) {
            this.authService.register(email, password)
        }
    }
}