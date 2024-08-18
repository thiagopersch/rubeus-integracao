import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    const existUser = await this.prisma.gusers.findUnique({
      where: { login: data.login },
      select: { login: true },
    });

    if (existUser) {
      throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.gusers.create({
      data: { ...data, password: hashedPassword },
    });

    return user;
  }

  async findAll() {
    const user = this.prisma.gusers.findMany({ where: { deletedAt: null } });
    return user;
  }

  async findOne(login: string): Promise<any> {
    const user = this.prisma.gusers.findUnique({ where: { login } });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async update(login: string, data: UpdateUserDto) {
    const user = await this.findOne(login);

    let updateData = { ...data };

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData = { ...updateData, password: hashedPassword };
    }

    const existUser = await this.prisma.gusers.findUnique({
      where: { login: login },
      select: { login: true },
    });

    if (!existUser) {
      throw new AppError('User not found.', 404);
    }

    const updatedUser = await this.prisma.gusers.update({
      where: { id: user.id },
      data: updateData,
    });

    console.log('User updated:', updatedUser);
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.prisma.gusers.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return this.prisma.gusers.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async validateUser(login: string, password: string): Promise<any> {
    if (!login || !password) {
      throw new AppError('Invalid credentials', 401);
    }

    const user = await this.prisma.gusers.findUnique({
      where: { login },
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
