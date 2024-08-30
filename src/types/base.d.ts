interface Object {
  [key: string]: any;
}

interface BaseController<T> {
  makeInstance(): T;

  async store(data: Object): Promise<unknown>;
  async update(data: Object): Promise<boolean>;
  async destroy(data: Object): Promise<Object>;
  async getAll(): Promise<unknown[]>;
  async getOne(data: Object): Promise<unknown>;
}
