import CONFIG from "../core/config/config";
import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    req.authError = true;
    next();
    return;
  }


  jwt.verify(token, CONFIG.jwt_encryption , function(err, {user}) {
    if (err) {
      req.authError = true;
      next();
    } else {
      req.JWT_USER = user;

      next();
    }
    return;
  });
};

export const jwtAuthRequired = (req, res, next) => {
    var token = req.headers['authorization']
    if(!token){
        res.status(401).send({
          error: "errors.noToken"
        })
        return
    }

    token = token.replace('Bearer ', '')

    jwt.verify(token, CONFIG.jwt_encryption, function(err, user) {
      if (err) {
        res.status(401).send({
          error: 'Token inválido'
        })
      } else {
       next();
      }
    })
};
