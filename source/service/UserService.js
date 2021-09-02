import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CONFIG from '../core/config/config';
import { sendMail } from '../core/utils/mail';
import {
  FIELDS_ERROR,
  UNKNOWN_ERROR,
  FIELDS_GENERIC_ERROR
} from '../core/constants/errors';
import { validateEmail } from '../core/utils/strings';

import { UserModel } from '../models';
import { makeid } from '../core/utils/generate';

const formatRq = userRq => {
  const user = { ...userRq };

  return user;
};

const getBasicQuery = () => {
  return {
    delete: { $ne: true }
  };
};

export const getUsers = async (req, res, next) => {
  const pageNumber = req.queryParams.pageNumber || 0;
  const pageSize = req.queryParams.pageSize || 20;

  const query = getBasicQuery();
  const select = undefined;
  UserModel.findMap(query, select, [], pageNumber, pageSize).then(
    async userDDBB => {
      return res.send(userDDBB, 201);
    }
  );
};

export const getUser = (req, res, next) => {
  const id = req.params.id;

  UserModel.findOne({ _id: id }).then(async userDDBB => {
    return res.send(await userDDBB.toJSON(), 201);
  });
};

export const createUser = async (req, res, next) => {
  const userRq = formatRq(req.body);

  const user = new UserModel({
    ...userRq,
    createDate: new Date()
  });

  await user
    .save()
    .then(async result => {
      res.send({ user }, 200);

      res.end();
    })
    .catch(e => {
      switch (e.name) {
        case FIELDS_ERROR:
          res.send(e.error, 400);
          res.end();
          break;
        case 'TypeError':
          res.send(FIELDS_GENERIC_ERROR, 400);
          res.end();
          break;

        default:
          res.send(UNKNOWN_ERROR, 500);
          res.end();
          break;
      }
    });
};

export const updateUser = (req, res, next) => {
  const userRq = formatRq(req.body);
  const id = req.params.id;

  if (!userRq) {
    return res.send(req.body, 401);
  }
  UserModel.findOne({ _id: id }).then(userDDBB => {
    Object.assign(userDDBB, userRq);
    userDDBB.modifiedDate = new Date();
    userDDBB.save().then(async s => {
      return res.send(await s.toJSON(), 201);
    });
  });
};

export const removeUser = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.send(req.body, 401);
  }
  UserModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        delete: true,
        deleteDate: new Date()
      }
    }
  ).then(userDDBB => {
    return res.send({}, 204);
  });
};

export const removeUsers = (req, res, next) => {
  const { ids } = req.body;
  if (!ids) {
    return res.send(req.body, 401);
  }
  UserModel.updateMany(
    { _id: { $in: ids } },
    {
      $set: {
        delete: true,
        deleteDate: new Date()
      }
    }
  ).then(userDDBB => {
    return res.send({}, 204);
  });
};

export const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const userDB = await UserModel.findOne({ email });

  if (!userDB) {
    return res.send({ error: `error.userDBNotFound` }, 404);
  }

  if (!userDB.confirm) {
    return res.send(
      {
        error: `error.userDBConfirm`,
        code: 'UNCONFIMED_ACCOUNT',
        data: { _id: userDB._id }
      },
      400
    );
  }

  const equalPassword = bcrypt.compareSync(password, userDB.password);
  if (!equalPassword) {
    return res.send({ error: `error.incorrectPassword`, equalPassword }, 403);
  }

  const user = {
    _id: userDB._id,
    username: userDB.username,
    name: userDB.name,
    email: userDB.email,
    lastname_1: userDB.lastname_1,
    lastname_2: userDB.lastname_2,
    defaultLanguage: userDB.defaultLanguage,
    document: userDB.document,
    birthdate: userDB.birthdate,
    imagesPolicyAccepted: userDB.imagesPolicyAccepted,
    phone: userDB.phone,
    photo: userDB.photo,
    zip: userDB.zip,
    township: userDB.township,
    province: userDB.province,
    address: userDB.address
    // ANY DATA
  };

  const token = jwt.sign({ user }, CONFIG.jwt_encryption, {
    expiresIn: 60 * 60 * 24 * CONFIG.jwt_expiration // expires in 24 hours
  });

  res.send({
    success: 'loginSuccesfully',
    token
  });
};

export const register = async (req, res) => {
  const { connection, body } = req;

  const { username, password, repeatPassword, email } = body;
  if (!username) {
    return res.send({ error: `error.usernameNotFound` }, 400);
  }

  if (!password) {
    return res.send({ error: `error.passwordNotFound` }, 400);
  }

  if (!repeatPassword) {
    return res.send({ error: `error.repeatPasswordNotFound` }, 400);
  }

  if (password !== repeatPassword) {
    return res.send({ error: `error.passwordMustBeEquals` }, 400);
  }

  if (!email) {
    return res.send({ error: `error.emailNotFound` }, 400);
  }

  if (!validateEmail(email)) {
    return res.send({ error: `error.emailNotValid` }, 400);
  }

  const countUsersWithSameIp = await UserModel.countDocuments({
    remoteAddress: connection.remoteAddress
  });

  if (countUsersWithSameIp > 4) {
    return res.send({ error: 'errors.manyUserWithSameIp' }, 409);
  }

  const existUsername = await UserModel.countDocuments({
    username
  });

  if (existUsername) {
    return res.send({ error: 'errors.usernameExists' }, 400);
  }

  const existMail = await UserModel.countDocuments({
    email
  });

  if (existMail) {
    return res.send({ error: 'errors.emailExists' }, 400);
  }
  const confirmCode = makeid(5);

  const salt = bcrypt.genSaltSync(10);
  const cifredPass = bcrypt.hashSync(password, salt);

  const user = new UserModel({
    username,
    password: cifredPass,
    email,
    remoteAddress: connection.remoteAddress,
    createDate: new Date(),
    confirm: false,
    confirmCode
  });

  await user.save();

  await sendMail({
    message: `<h1>Usuario creado correctamente</h1><h2>Confirme con el código</h2> <h3>${confirmCode}</h3>
  <p><a href="http://localhost:3000/validate/${
    user._id
  }">Confirma aquí</a> </p>`,
    to: [email]
  });
  return res.send({
    _id: user._id,
    success: 'userCreatedSuccessfully'
  });
};

export const getInfo = async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findOne({ _id: id });

  if (!user) {
    return res.send({ error: `error.userNotFound` }, 404);
  }

  return res.send({
    _id: user.id,
    username: user.username,
    email: user.email,
    createDate: user.createDate
  });
};

export const validate = async (req, res) => {
  const { _id, code } = req.body;
  const user = await UserModel.findOne({
    _id,
    delete: { $ne: true }
  });
  if (!user) {
    return res.send({ error: `error.userNotFound`, user, _id }, 404);
  }

  if (user.confirmCode === code) {
    await UserModel.updateOne(
      { _id },
      {
        $set: {
          confirm: true,
          confirmDate: new Date()
        }
      }
    );
  } else {
    return res.send(
      {
        error: 'invalidCode'
      },
      400
    );
  }

  await sendMail({
    message: `<h1>Usuario validado correctamente</h1>`,
    subject: 'Asunto',
    to: [user.email]
  });

  return res.send({
    success: 'userValidateSuccessfully'
  });
};

export const recoverPasswordMail = async (req, res) => {
  const email = req.body.email;

  const userDB = await UserModel.findOne({ email });

  if (!userDB) {
    return res.send({ error: `error.userDBNotFound` }, 404);
  }

  if (!userDB.confirm) {
    return res.send(
      {
        error: `error.userDBConfirm`,
        code: 'UNCONFIMED_ACCOUNT',
        data: { _id: userDB._id }
      },
      400
    );
  }

  const recoverPasswordCode = makeid(5) + new Date().getTime() + makeid(8);
  await UserModel.updateOne(
    {
      _id: userDB._id
    },
    {
      $set: {
        recoverPasswordCode,
        recoverPasswordDate: new Date()
      }
    }
  );
  await sendMail({
    message: `<h1>Recuperar contraseña </h1><p>Puede cambiar su contraseña desde <a href="http://localhost:3000/change-password/${recoverPasswordCode}">aquí</a></p>`,
    to: [email]
  });

  res.send({
    success: 'checkYourEmail'
  });
};

export const changePassword = async (req, res) => {
  const { token, password } = req.body;

  const userDB = await UserModel.findOne({ recoverPasswordCode: token });

  if (!userDB) {
    return res.send({ error: `error.userDBNotFound` }, 404);
  }
  const lastTenMinutes = new Date();
  lastTenMinutes.setMinutes(-10);
  if (userDB.recoverPasswordDate.getTime() < lastTenMinutes.getTime()) {
    await UserModel.updateOne(
      { _id: userDB._id },
      {
        $set: { recoverPasswordCode: undefined, recoverPasswordDate: undefined }
      }
    );
    return res.send({ error: `error.invalidToken` }, 404);
  }

  const salt = bcrypt.genSaltSync(10);
  const cifredPass = bcrypt.hashSync(password, salt);

  await UserModel.updateOne(
    {
      _id: userDB._id
    },
    {
      $set: {
        password: cifredPass,
        recoverPasswordCode: undefined,
        recoverPasswordDate:undefined
      }
    }
  );
  await sendMail({
    message: `<h1Contraseña cambiada correctamente </h1>`,
    to: [userDB.email]
  });

  res.send({
    success: 'checkYourEmail'
  });
};
