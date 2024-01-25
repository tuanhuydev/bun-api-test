interface Object {
  [key: string]: any;
}

interface BaseController {
  makeInstance(): BaseController;
  store(data: Object): Promise<Object>;
}
