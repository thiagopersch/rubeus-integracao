import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TableComponent } from '../../components/table/table.component';
import { User, UserService } from './users.service';

@Component({
  selector: 'list-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [MatCardModule, TableComponent],
})
export class ListUsersComponent implements OnInit {
  constructor(private userService: UserService) {}

  users: User[] = [];
  displayedColumns: string[] = [
    'name',
    'login',
    'change_password',
    'status',
    'createdAt',
    'updatedAt',
    'actions',
  ];
  columnDefinitions = {
    name: 'Nome',
    login: 'Email',
    status: 'Situação',
    change_password: 'Alterar a senha?',
    createdAt: 'Criado em',
    updatedAt: 'Atualizado em',
    actions: 'Ações',
  };

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      console.log(users);
      this.users = users;
    });
  }
}
