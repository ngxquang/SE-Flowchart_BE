import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  replication: {
    master: {
      host: process.env.MYSQL_MASTER_HOST,
      port: +process.env.MYSQL_MASTER_PORT,
      username: process.env.MYSQL_MASTER_USER,
      password: process.env.MYSQL_MASTER_PASSWORD,
      database: process.env.MYSQL_MASTER_DATABASE,
    },
    slaves: [
      {
        host: process.env.MYSQL_SLAVE_HOST,
        port: +process.env.MYSQL_SLAVE_PORT,
        username: process.env.MYSQL_SLAVE_USER,
        password: process.env.MYSQL_SLAVE_PASSWORD,
        database: process.env.MYSQL_SLAVE_DATABASE,
      },
    ],
  },
  // host: 'localhost',
  // port: 3306,
  // username: 'root',
  // password: 'Admin123',
  // database: 'ngxquang',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

export default config;
