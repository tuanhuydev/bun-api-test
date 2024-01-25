import { PrismaClient } from '@prisma/client';

export const PORT = Bun.env.PORT || 8888;
export const NODE_ENV = Bun.env.NODE_ENV || 'development';

export const TOKEN_SECRET = Bun.env.TOKEN_SECRET || 'sidehand';
export const ACCESS_TOKEN_LIFE = Bun.env.ACCESS_TOKEN_LIFE || '15m';
export const REFRESH_TOKEN_LIFE = Bun.env.REFRESH_TOKEN_LIFE || '7d';

export const prismaClient = new PrismaClient();
