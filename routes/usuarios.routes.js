import { Router } from 'express';
import {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  patchUser
} from '../controllers/usuarios.controller.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
// Debería ser:
import { emailExiste, rolValido, usuarioExisteById } from '../helpers/db-validators.js';
const router = Router();

router.get(   '/', getUsers);
router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser de al menos 6 caracteres').isLength({ min: 6 }),
  check('email').custom(emailExiste),
  check('role').custom(rolValido),
  validarCampos
], postUser);
router.put(   '/:id' ,[
  check('id','No es un id Valido').isMongoId(),
  check('role').custom(rolValido),
  check('id').custom(usuarioExisteById), // ✅ CORRECTO,
  validarCampos
], putUser);
router.delete('/:id', [
  check('id','No es un id válido').isMongoId(),
  check('id').custom(usuarioExisteById),
  validarCampos
], deleteUser);
router.patch( '/:id', patchUser);

export default router;