import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { DiaryEntryListComponent } from './components/diary-entry-list/diary-entry-list.component';
import { DiaryEntryComponent } from './components/diary-entry/diary-entry.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { DataService } from './services/data.service';
import { CreateEntryComponent } from './components/create-entry/create-entry.component';
import { ModalService } from './services/modal.service';
import { EditEntryComponent } from './components/edit-entry/edit-entry.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    DiaryEntryListComponent, // Компонент для отображения списка записей
    DiaryEntryComponent, // Компонент для записи
    CreateButtonComponent, // Компонент для кнопки создания записи
    ModalWindowComponent, // Компонент модального окна
    CreateEntryComponent, // Компонент для создания записи
    EditEntryComponent, // Компонент для редактирования записи
    AuthorizationComponent, // Компонент для авторизации 
    RegistrationComponent // Компонент для регистрации 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Использование роутов
    ReactiveFormsModule, // Использование форм
    AngularFireModule.initializeApp(environment.firebaseConfig), // Firebase
    AngularFireAuthModule // Firebase для аутентификации
  ],
  providers: [
    provideClientHydration(),
    DataService, // Сервис для работы с записями
    ModalService, // Сервис модального окна
    AuthService // Сервис аутентификации 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
