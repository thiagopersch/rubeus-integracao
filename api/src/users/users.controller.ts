import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.usersService.create(data);
    const token = this.jwtService.sign({
      login: user?.login,
      name: user?.name,
    });

    return { user, token };
  }

  @Get()
  async findAll() {
    const user = this.usersService.findAll();
    return user;
  }

  @Get(':login')
  async findOne(@Param('login') login: string) {
    const user = this.usersService.findOne(login);
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    const user = this.usersService.update(id, data);
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = this.usersService.remove(id);
    return user;
  }
}
