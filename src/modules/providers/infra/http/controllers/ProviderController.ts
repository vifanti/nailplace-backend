import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/providers/services/ListProvidersService';
import CreateProviderService from '@modules/providers/services/CreateProviderService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { selectedServices, userId } = request.query;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      desiredServices: selectedServices?.toString(),
      userId: userId?.toString(),
    });

    return response.json(providers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, latitude, longitude, services } = request.body;

    const createProvider = container.resolve(CreateProviderService);

    const provider = await createProvider.execute({
      user_id,
      latitude,
      longitude,
      services,
    });

    return response.json(provider);
  }
}
