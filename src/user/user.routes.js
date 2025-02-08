//Rutas de funciones de usuario
import { Router } from 'express'
import { getAll, get, updateUser, updateUserPassword, deleteUser} from './user.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

//Rutas privadas
api.get('/',[validateJwt] , getAll)
api.get('/:id',[validateJwt],get)
api.put('/:id', [validateJwt], updateUser)
api.put('/update/:id', [validateJwt], updateUserPassword)
api.delete('/delete/:id', [validateJwt], deleteUser)



export default api