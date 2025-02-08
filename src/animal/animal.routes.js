import {Router} from 'express'
import { test,save } from './animal.controller.js'
import { saveAnimalValidator } from '../../helpers/validators.js'


const api = Router()

api.get('/test', test)

api.post('/',[saveAnimalValidator], save)
export default api


