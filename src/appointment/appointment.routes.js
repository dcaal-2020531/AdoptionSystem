import { Router } from 'express';
import { save, test } from './appointment.controller.js';
import { saveAppointmentValidator } from '../../helpers/validators.js';

const api = Router();

api.get('/test', test);

api.post('/',[saveAppointmentValidator], save);
export default api;
