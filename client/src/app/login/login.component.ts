// login.component.ts

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  //providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials = { username: 'test@test.com', password: 'password' };

  form = new FormGroup({
    email: new FormControl('test@test.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('password', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // onSubmit(): void {
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched(); // Marca todos os campos como "tocados" para exibir as mensagens de erro
  //     return; // Não envia o formulário se ele estiver inválido
  //   }

  //   console.log(this.form.value);
  //   return;
  // }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (result) => {
        return console.log('Login successful', result);
        // localStorage.setItem('token', result.access_token);
        // this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
