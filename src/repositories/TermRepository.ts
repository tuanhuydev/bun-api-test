import type { TermDTO } from '@/dto/term';
import MongoService from '../services/MongoService';
import * as Mongo from 'mongodb';

class MongoTermRepository {
  static #instance: MongoTermRepository;
  table: Mongo.Collection<Mongo.BSON.Document>;

  constructor() {
    this.table = MongoService.getDatabase().collection('terms');
  }

  static makeInstance() {
    return MongoTermRepository.#instance ?? new MongoTermRepository();
  }

  async getAll() {
    return this.table.find({ deletedAt: { $exists: false } }).toArray();
  }

  async getOne(id: string) {
    return this.table.findOne({
      _id: new Mongo.ObjectId(id),
      deletedAt: { $exists: false },
    });
  }

  async findTermByName(name: string) {
    return this.table.findOne({ name, deletedAt: { $exists: false } });
  }

  async createTerm(body: Omit<TermDTO, '_id'>) {
    body.createdAt = new Date();
    body.updatedAt = new Date();

    return this.table.insertOne(body);
  }

  async updateOne(id: string, data: Partial<Omit<TermDTO, '_id'>>) {
    data.updatedAt = new Date();

    return this.table.updateOne(
      { _id: new Mongo.ObjectId(id) },
      { $set: data },
    );
  }

  async deleteOne(id: string) {
    return this.table.updateOne(
      { _id: new Mongo.ObjectId(id) },
      { $set: { deletedAt: new Date() } },
    );
  }
}

export const mongoTermRepository = MongoTermRepository.makeInstance();
