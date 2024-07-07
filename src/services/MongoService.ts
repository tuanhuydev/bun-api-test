import * as mongoDB from 'mongodb';
import { MONGO_URI, MONGODB_DB } from '@/configs/constants';

class MongoService {
  static #instance: MongoService;
  private database: string = '';
  private mongoClient: mongoDB.MongoClient;

  constructor() {
    this.mongoClient = new mongoDB.MongoClient(MONGO_URI);
    this.setDatabase(MONGODB_DB);
  }

  public getDatabase(): mongoDB.Db {
    return this.mongoClient.db(this.database);
  }

  public setDatabase(database: string) {
    this.database = database;
  }

  static makeInstance() {
    return MongoService.#instance ?? new MongoService();
  }
}
export default MongoService.makeInstance();
