import { Router } from 'express';

import ServiceController from '../controllers/ServiceController';

const serviceRouter = Router();
const serviceController = new ServiceController();

serviceRouter.get('/', serviceController.show);

export default serviceRouter;
