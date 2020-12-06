import path from 'path';
import { Options } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import { User } from './entities/User';

const config: Options = {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: 'lireddit',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  type: 'postgresql',
  debug: !__prod__,
};

export default config;
