import { Router } from 'express';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import DeviceController from './controllers/DeviceController';
import DataController from './controllers/DataController';

import AuthMiddleware from './middlewares/AuthMiddleware';

const routes = Router();

routes.get('/', (req, res) => {
	return res.send('Hello World!');
});

routes.post('/user', UserController.createUser);
routes.post('/auth', AuthController.authenticate);

routes.use(AuthMiddleware.authenticate);

routes.post('/device', DeviceController.create);
routes.get('/device/:mac', DeviceController.get);
routes.get('/device', DeviceController.getAll);
routes.delete('/device/:mac', DeviceController.delete);

routes.post('/device/:mac/data', DataController.create);

export default routes;
