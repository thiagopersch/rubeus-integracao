import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { gusers } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(user: gusers) {
    const payload = { userId: user.id, login: user.login };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(login: string, password: string): Promise<gusers> {
    const user = await this.prisma.gusers.findUnique({ where: { login } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return;
  }
}
