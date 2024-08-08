import { Body, Controller, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  async login(
    @Body() credentials: { email: string; password: string },
  ): Promise<{ message: string; user: User; token: string }> {
    const user = await this.authService.validateUser(
      credentials.email,
      credentials.password,
    );
    const token = this.generateToken(user.id, user.email);
    return { message: 'Login successful', user, token };
  }

  private generateToken(userId: string, email: string): string {
    return this.jwtService.sign({ userId, email });
  }
}
