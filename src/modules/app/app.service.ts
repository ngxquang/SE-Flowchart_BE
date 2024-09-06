import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  // async onModuleInit() {
  //   await this.seed();
  // }

  // async seed() {
  //   const group = this.groupRepository.create({
  //     id: 1,
  //     name: 'Admin',
  //   });

  //   const user1 = this.userRepository.create({
  //     id: 1,
  //     name: 'Marius',
  //     username: 'marius',
  //     password: 'sosecure',
  //     status: '1',
  //     sex: '1',
  //     phone: '0345979436',
  //     address: 'New York',
  //     birthDate: new Date('3/3/1999'),
  //     email: 'marius@gm.com',
  //     createdAt: new Date('3/3/2022'),
  //     deleteAt: null,
  //   });
  //   await this.userRepository.save(user1);

  //   const user2 = this.userRepository.create({
  //     id: 2,
  //     name: 'Mambo',
  //     username: 'mambo',
  //     password: 'dumbo',
  //     status: '1',
  //     sex: '1',
  //     phone: '0333353609',
  //     address: 'London',
  //     birthDate: new Date('2/6/2002'),
  //     email: 'mambo@gm.com',
  //     createdAt: new Date('2/6/2006'),
  //     deleteAt: null,
  //   });
  //   await this.userRepository.save(user2);

  //   group.users = [user1, user2];
  //   await this.groupRepository.save(group);
  // }

  getHello(): string {
    return 'Hello World!';
  }
}
