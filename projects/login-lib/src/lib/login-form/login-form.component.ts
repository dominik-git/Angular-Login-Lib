import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'lib-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  hasError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      lang: ['', Validators.required]
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.submitted = true;
    if (!this.loginForm.invalid) {
      const { username, password } = this.loginForm.getRawValue();
      this.authService.login(username, password).subscribe(
        (res) => {
          console.log(res);
          this.authService.setLanguage(this.loginForm.get('lang').value);
          this.hasError = false;
        },
        (err) => {
          this.hasError = true;
          console.log(err);
        }
      );
    }
  }




}
