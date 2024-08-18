import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { SnackbarService } from '../../service/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  login(credentials: { login: string; password: string }) {
    this.authService.login(credentials).subscribe({
      next: (result) => {
        this.handleLoginSuccess(result);
      },
      error: (err) => {
        this.handleLoginError(err);
      },
    });
  }

  private handleLoginSuccess(result: any) {
    this.authService.storeUserData(result.access_token, result.user);
    this.router.navigate(['/home']);
  }

  private handleLoginError(err: any) {
    if (err.status === 401) {
      this.snackbarService.open('Login ou senha inválidos', 'Fechar', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['custom-snackbar-action'],
      });
    } else {
      this.snackbarService.open('Erro ao tentar realizar login');
    }
  }
}
