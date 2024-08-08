import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    return this.usersService.validateUser(email, pass);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Métodos de serialização e desserialização
  async serializeUser(user: any, done: (err: any, user: any) => void) {
    done(null, user);
  }

  async deserializeUser(user: any, done: (err: any, user: any) => void) {
    done(null, user);
  }
}
