import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { DiaryEntryListComponent } from './components/diary-entry-list/diary-entry-list.component';
import { EditEntryComponent } from './components/edit-entry/edit-entry.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  { path: '', component: DiaryEntryListComponent }, // Страница с записями 
  { path: 'edit/:time', component: EditEntryComponent }, // Страница для редактирования выбранной записи 
  { path: 'authorization', component: AuthorizationComponent }, // Страница с авторизацией 
  { path: 'registration', component: RegistrationComponent } // Страница с регистрацией 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
