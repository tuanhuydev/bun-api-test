import { TERM_TYPES } from '@/configs/constants';
import type { TermDTO } from '@/dto/term';
import { termService } from '@/services/TermService';
import { getErrorResponse } from '@/utils/helpers';
import z from 'zod';

class TerminologyController implements BaseController<TerminologyController> {
  private static instance: TerminologyController;

  makeInstance() {
    if (!TerminologyController.instance) {
      TerminologyController.instance = new TerminologyController();
    }
    return TerminologyController.instance;
  }

  async getAll(): Promise<TermDTO[]> {
    try {
      return termService.getAllTerms();
    } catch (error) {
      return Promise.reject(getErrorResponse(error as Error));
    }
  }

  async getOne({ params = {} }: Object): Promise<TermDTO> {
    try {
      const { id } = params;
      if (!id) throw new Error('ID is required');
      return termService.getTermById(id);
    } catch (error) {
      return Promise.reject(getErrorResponse(error as Error));
    }
  }

  async store({ body }: Request): Promise<Object> {
    try {
      // Validate here
      const schema = z.object({
        name: z.string(),
        type: z.enum(TERM_TYPES),
        ipa: z.string().optional(),
        meaning: z.string().optional(),
        example: z.string().optional(),
      });
      const validatedBody = schema.parse(body);
      const newTerm = await termService.createTerm(
        validatedBody as Omit<TermDTO, '_id'>,
      );
      return newTerm;
    } catch (error) {
      return getErrorResponse(error as Error);
    }
  }

  async update({ body }: any): Promise<boolean> {
    try {
      const { id, ...updateData } = body as Partial<TermDTO> & { id: string };
      if (!id) throw new Error('ID is required');
      return termService.updateTerm(id, updateData);
    } catch (error) {
      return Promise.reject(getErrorResponse(error as Error));
    }
  }

  destroy({ body }: Object): Promise<Object> {
    try {
      const { id } = body;
      if (!id) throw new Error('ID is required');
      return termService.deleteTerm(id);
    } catch (error) {
      return Promise.reject(getErrorResponse(error as Error));
    }
  }
}

export const terminologyController = new TerminologyController().makeInstance();
