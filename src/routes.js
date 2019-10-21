import { Router } from 'express';

import EventOrganizeController from './app/controllers/EventOrganizerController';

import CheckPayloadMiddleware from './app/middlewares/CheckPayload';

const routes = new Router();

routes.post('/api/organize/event', CheckPayloadMiddleware,EventOrganizeController.organizer);

export default routes;
