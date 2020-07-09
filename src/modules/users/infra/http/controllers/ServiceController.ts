import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowServiceService from '@modules/users/services/ShowServiceService';

export default class Servicecontroller {
  public async show(request: Request, response: Response): Promise<Response> {
    const showService = container.resolve(ShowServiceService);

    const services = await showService.execute();

    return response.json(services);
  }
}
