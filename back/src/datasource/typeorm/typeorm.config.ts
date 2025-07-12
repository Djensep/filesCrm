import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

config({ path: join(process.cwd(), '.env') });

const configService = new ConfigService();

const options = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL');
  if (!url) {
    throw new Error('Database url is empty');
  }

  return {
    url,
    type: 'postgres',
    schema: 'public',
    synchronize: true,
    entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, '..', '..', '..', 'migrations', '*.{ts,js}')],
    migrationsRun: false,
    migrationsTableName: 'migrations',
  };
};
export const typeormDatasource = new DataSource(options());
