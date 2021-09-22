

import mongoose from 'mongoose';
import CONFIG from '../core/config/config';

export { BalanceModel } from './balance';
export { CryptoModel } from './crypto';
export { UserModel } from './user';

const mongo_location = CONFIG.mongo_connection_string;

mongoose
  .connect(mongo_location)
  .catch(err => {
    console.error(
      '[ERROR] mongoose.connect',
      `Can Not Connect to Mongo Server: `,
      err,
      'error'
    );
  })
  .then(() => {
    console.log(
      '[MONGO] mongoose.connect',
      `Connetion OK: `
    );
  });
