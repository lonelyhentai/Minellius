import { IConfig } from '../src/configs';
export const Config: IConfig = {
  NODE_ENV:"development",
  PORT:6080,
  DOMAIN: "localhost",
  MAILER_HOST:"smtp.qq.com",
  MAILER_PORT:465,
  MAILER_SECURE:true,
  MAILER_USER:"info@evernightfireworks.com",
  MAILER_PASS:"mmruxkeyzoykdebh",
  AUTH_JWT_SECRET_OR_KEY:"secretKey",
  AUTH_HEADER_PREFIX: 'JWT',
  AUTH_JWT_EXPIRATION_DELTA: '7 days',
  DB_USERNAME: 'minellius_test',
  DB_PASSWORD: 'minellius_test',
  DB_HOSTNAME: 'localhost',
  DB_PORT: 5432,
  DB_TYPE: 'postgres',
  DB_NAME: 'minellius',
};
