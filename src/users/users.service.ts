import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    // {
    //   id: 1,
    //   name: 'Marius',
    //   username: 'marius',
    //   password: 'sosecure',
    //   status: '1',
    //   sex: '1',
    //   phone: '0345979436',
    //   address: 'New York',
    //   birthDate: new Date('3/3/1999'),
    //   email: 'marius@gm.com',
    //   createdAt: new Date('3/3/2022'),
    //   deleteAt: null,
    // },
    // {
    //   id: 2,
    //   name: 'Mambo',
    //   username: 'mambo',
    //   password: 'dumbo',
    //   status: '1',
    //   sex: '1',
    //   phone: '0333353609',
    //   address: 'London',
    //   birthDate: new Date('2/6/2002'),
    //   email: 'marius@gm.com',
    //   createdAt: new Date('2/6/2006'),
    //   deleteAt: null,
    // },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
