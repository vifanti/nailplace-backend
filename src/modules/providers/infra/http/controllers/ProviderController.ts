import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/providers/services/ListProvidersService';
import CreateProviderService from '@modules/providers/services/CreateProviderService';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { selectedServices, user_id } = request.query;
    const logged_user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      desiredServices: selectedServices?.toString(),
      except_user_id: logged_user_id,
      user_id: user_id?.toString(),
    });

    return response.json(classToClass(providers));
  }

  // public async show(request: Request, response: Response): Promise<Response> {
  //   const { provider_id } = request.params;
  //   const userId = request.user.id;

  //   const listProviders = container.resolve(ListProvidersService);

  //   const providers = await listProviders.execute({
  //     desiredServices: selectedServices?.toString(),
  //     userId: userId?.toString(),
  //   });

  //   return response.json(classToClass(providers));
  // }

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
