import apiProvider from './provider';

export class ApiCore {
  resource: string;

  constructor(options: { resource: string; }) {
    this.resource = options.resource;
  }

  getAll = () => {
    return apiProvider.getAll(this.resource);
  };

  getSingle = (id: string) => {
    return apiProvider.getSingle(this.resource, id);
  };

  post = (model: any) => {
    return apiProvider.post(this.resource, model);
  };

  put = (model: any) => {
    return apiProvider.put(this.resource, model);
  };

  patch = (model: any) => {
    return apiProvider.patch(this.resource, model);
  };

  remove = (id: any) => {
    return apiProvider.remove(this.resource, id);
  };
}
