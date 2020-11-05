import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ServiceController from '../controllers/ServiceController';

const serviceRouter = Router();
const serviceController = new ServiceController();

serviceRouter.get('/', ensureAuthenticated, serviceController.show);

export default serviceRouter;
