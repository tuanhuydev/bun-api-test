import { NODE_ENV, PORT } from '../configs/constants';

export function stats() {
  console.log('==============================');
  console.log(`= ENVIRONMENT: ${NODE_ENV}`);
  console.log(`= PORT: ${PORT}`);

  
}
