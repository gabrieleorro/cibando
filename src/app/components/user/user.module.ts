import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UserRoutingModule } from './user-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    ToastModule,
    CKEditorModule,
    FontAwesomeModule,
    UserRoutingModule,
  ],
  exports: [LoginComponent, ProfileComponent, RegistrationComponent]
})

export class UserModule {}
