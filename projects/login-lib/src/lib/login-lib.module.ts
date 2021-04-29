import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from './auth.service';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatRadioModule
  ],
  exports: [LoginFormComponent],
  providers: [AuthService]
})
export class LoginLibModule { }
