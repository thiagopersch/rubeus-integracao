import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id?: string;
  name: string;
  login: string;
  password: string;
  change_password: boolean;
  status: boolean;
}
