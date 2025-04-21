import { Router } from 'express';
import {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  patchUser
} from '../controllers/usuarios.controller.js';

const router = Router();

router.get(   '/', getUsers);
router.post(  '/', postUser);
router.put(   '/:id', putUser);
router.delete('/:id', deleteUser);
router.patch( '/:id', patchUser);

export default router;