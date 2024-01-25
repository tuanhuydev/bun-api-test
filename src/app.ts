import { Elysia } from 'elysia';

import { authHandler } from './routes/auth';
import { PORT, REFRESH_TOKEN_LIFE, TOKEN_SECRET } from './configs/constants';
import { Logger } from './utils/Logger';
import { stats } from './utils/stats';
import jwt from '@elysiajs/jwt';
import { userHandler } from './routes/user';

const app = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: TOKEN_SECRET,
      exp: REFRESH_TOKEN_LIFE,
    }),
  )
  .use(authHandler)
  .use(userHandler)
  .state('logger', new Logger())
  .get('/', () => 'Health check: [OK]')
  .ws('/ws', {
    message(ws, message) {
      ws.send(message);
      console.log('Received:', message);
    },
    close(ws, code, message) {
      console.log('Connection closed', code, message);
    },
  })
  .onError(({ code, store }) => {
    const { logger } = store;
    logger.log(`Error: ${code}`);
    console.log(`Error: ${code}`);
  })
  .listen(PORT);

export type App = typeof app;

stats();
