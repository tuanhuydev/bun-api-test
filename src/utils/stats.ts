import { NODE_ENV, PORT, prismaClient } from '../configs/constants';

export function stats() {
  console.log('==============================');
  console.log(`= ENVIRONMENT: ${NODE_ENV}`);
  console.log(`= PORT: ${PORT}`);
  prismaClient
    .$connect()
    .then(() => {
      console.log('= DATABASE: Connected');
      console.log('==============================');
    })
    .catch((error) => {
      console.log(`= DATABASE: ${error.message}`);
      console.log('==============================');
    });
}
