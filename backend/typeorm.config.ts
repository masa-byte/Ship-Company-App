import { DataSourceOptions } from "typeorm";

export const typeormConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
};