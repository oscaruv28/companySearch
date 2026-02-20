import { defineConfig } from '@mikro-orm/postgresql';
import { Company } from '../companies/company.entity.js';
import { CompanyRegistration } from '../companies/registration-log.entity.js';

export default defineConfig({
  entities: [Company, CompanyRegistration], 
  dbName: process.env.DB_NAME || 'company_db',
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'secret',
  port: parseInt(process.env.DB_PORT || '5440'),
  debug: true,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
  },
});