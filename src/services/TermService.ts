import type { TermDTO } from '@/dto/term';
import { mongoTermRepository } from '@/repositories/TermRepository';
import * as Mongo from 'mongodb';

class TermService {
  static instance: TermService;

  makeInstance() {
    if (!TermService.instance) {
      TermService.instance = new TermService();
    }
    return TermService.instance;
  }

  async getAllTerms(): Promise<TermDTO[]> {
    return mongoTermRepository.getAll() as Promise<TermDTO[]>;
  }

  async getTermById(id: string): Promise<TermDTO> {
    return mongoTermRepository.getOne(id) as Promise<TermDTO>;
  }

  async updateTerm(id: string, data: Partial<Omit<TermDTO, '_id'>>) {
    if (!id) throw new Error('ID is required');

    const term = await mongoTermRepository.getOne(id);
    if (!term) throw new Error('Term not found');

    const updatedTerm = await mongoTermRepository.updateOne(id, data);
    if (!updatedTerm) throw new Error('Failed to update term');
    return true;
  }

  async createTerm(body: Omit<TermDTO, '_id'>) {
    if (!body?.name) throw new Error('Name is required');

    const term = await mongoTermRepository.findTermByName(body?.name);
    if (term) throw new Error('Term already exists');

    const newTerm = await mongoTermRepository.createTerm(body);
    return newTerm;
  }

  async deleteTerm(id: string) {
    if (!id) throw new Error('ID is required');

    const term = await mongoTermRepository.getOne(id);
    if (!term) throw new Error('Term not found');

    const deletedTerm = await mongoTermRepository.deleteOne(id);
    return deletedTerm;
  }
}
export const termService = new TermService().makeInstance();
