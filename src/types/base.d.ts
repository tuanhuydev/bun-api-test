interface Object {
  [key: string]: any;
}

interface BaseController {
  makeInstance(): BaseController;
  store(data: Object): Promise<Object>;
  update(data: Object): Promise<Object>;
  destroy(data: Object): Promise<Object>;
  index(): Promise<Object[]>;
  show(data: Object): Promise<Object>;
}
