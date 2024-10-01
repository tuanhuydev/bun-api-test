import { Elysia } from 'elysia';
import { terminologyController } from '@/controllers/TermController';
import { createTermValidator } from '@/configs/validator';

export const termHandler = new Elysia({ prefix: '/terms' })
  .get('/', terminologyController.getAll)
  .get('/:id', terminologyController.getOne)
  .post('/', terminologyController.store, {
    body: createTermValidator,
  })
  .put('/', terminologyController.update)
  .delete('/', terminologyController.destroy);
