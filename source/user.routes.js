import { jwtAuth } from './middleware/jwt';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
  removeUsers,
  getUserByKey,
  register,
  getInfo,
  validate,
  login,
  recoverPasswordMail,
  changePassword
} from './service/UserService';

export const userRoutes = router => {
  router.get('/users', getUsers);

  router.get('/user/:id', getUser);

  router.put('/user/:id', updateUser);

  router.delete('/user/:id', removeUser);

  router.delete('/users', removeUsers);

  router.post('/user', createUser);

  router.get('/validate-info/:id', getInfo);

  router.post('/register', register);

  router.post('/change-password', changePassword);

  router.post('/validate', validate);

  router.post('/recover-password', recoverPasswordMail);

  router.post('/login', login);

  router.get('/me', jwtAuth, async (req, res) => {
    res.send({ ok: 'ok, ', u: req.JWT_USER });
  });
};
