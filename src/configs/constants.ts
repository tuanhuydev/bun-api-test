export const PORT = Bun.env.PORT || 3000;
export const NODE_ENV = Bun.env.NODE_ENV || 'development';

export const TOKEN_SECRET = Bun.env.TOKEN_SECRET || 'sidehand';
export const ACCESS_TOKEN_LIFE = Bun.env.ACCESS_TOKEN_LIFE || '15m';
export const REFRESH_TOKEN_LIFE = Bun.env.REFRESH_TOKEN_LIFE || '7d';

export const MONGO_URI = process.env.MONGODB_URI || '';
export const MONGODB_DB = process.env.MONGODB_DB || 'test';

export const JWT_CONFIG = {
  name: 'jwt',
  secret: TOKEN_SECRET,
  exp: REFRESH_TOKEN_LIFE,
};
