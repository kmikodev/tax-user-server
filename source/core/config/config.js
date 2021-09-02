// eslint-disable-next-line
require('dotenv').config(); //Instatiate environment variables

const CONFIG = {}; //Make this global to use all over the application

CONFIG.DEBUG = process.env.DEBUG || false;
CONFIG.port = process.env.PORT || 9090;

//
CONFIG.mongo_connection_string =
  process.env.MONGO_CONECCTION_STRING ||
  'mongodb://dbares_ju3v3s:3lv13rn3s3sm3j0r@mongodb:27017/dbares_prod_db';

// DEVELOPMENT "PRE"

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'M4rkusTr4k3r';
// CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '86400';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '30';

// Por ahora la clave va estar aqui, pero la idea es que este en un fichero
CONFIG.firebase = {
 
};

CONFIG.BASIC_KEY = 'BI73l71oG6wRfDOOdrfUoWSrsFNjUll9pGwKTdu90dem';
CONFIG.AMAZON_MAIL_PWD = 'BI73l71oG6wRfDOOdrfUoWSrsFNjUll9pGwKTdu90dem';

CONFIG.QUEUENAME = 'mailQueue';
export default CONFIG;
