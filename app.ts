import { Elysia } from 'elysia';

import { JWT_CONFIG, PORT } from '@/configs/constants';
import { userHandler } from '@/routes/user';
import { Logger } from '@/utils/Logger';
import { stats } from '@/utils/stats';
import jwt from '@elysiajs/jwt';
import { authHandler } from '@/routes/auth';
import { termHandler } from '@/routes/term';

const app = new Elysia()
  .use(jwt(JWT_CONFIG))
  .use(authHandler)
  .use(termHandler)
  .use(userHandler)
  .state('logger', new Logger())
  .get('/', () => 'Health check: [OK]')
  .ws('/ws', {
    message(ws: { send: (arg0: any) => void }, message: any) {
      ws.send(message);
      console.log('Received:', message);
    },
    close(ws: any, code: any, message: any) {
      console.log('Connection closed', code, message);
    },
  })
  .onError(({ code, store }: any): void => {
    const { logger } = store;
    logger.log(`Error: ${code}`);
  })
  .listen(PORT);

stats();
