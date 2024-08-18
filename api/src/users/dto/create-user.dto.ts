export class CreateUserDto {
  name: string;
  login: string;
  password: string;
  change_password: boolean;
  status: boolean;
}
