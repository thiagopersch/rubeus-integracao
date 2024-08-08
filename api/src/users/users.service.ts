import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: { login: userData.login },
      select: { login: true },
    });

    if (existUser) {
      throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });

    return user;
  }

  findAll() {
    return this.prisma.user.findMany({ where: { deletedAt: null } });
  }

  async findOne(email: string): Promise<any> {
    return this.prisma.users.find((user) => user.email === email);
  }

  async validateUser(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new AppError('Invalid credentials', 401);
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }
    return user;
  }
}
