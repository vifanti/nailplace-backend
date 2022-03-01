import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import serviceRouter from '@modules/providers/infra/http/routes/service.routes';
import providersRouter from '@modules/providers/infra/http/routes/providers.routes';

const routes = Router();

routes.get('/', (request, response) => {
  response.json({ status: 'ok', name: 'nailplace-backend', version: '1.0.0' });
});
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/services', serviceRouter);
routes.use('/providers', providersRouter);

export default routes;
