import bodyParser from 'body-parser';
import cors from 'cors';

import CONFIG from './core/config/config';

import './models';

import responseTime from 'response-time';

import { userRoutes } from './user.routes';

// admin.initializeApp({
//   credential: admin.credential.cert(CONFIG.firebase),
//   databaseURL: 'https://miampa-1be3e.firebaseio.com'
// });

let app = require('restana')({
  errorHandler(err, req, res) {
    res.send(err);
  }
});

app.get('/throw', (req, res) => {
  throw new Error('Upps!');
});
const serverPort = CONFIG.port;

app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

app.use(responseTime());

userRoutes(app);

app.get('/health', (req, res) => {
  res.send({ ok: 'ok' });
});

app.start(serverPort).then(() => {
  console.log(`USER SERVICE  Sever start in : ${CONFIG.port}`, {
    serviceName: 'user',
    methodName: 'bootstrap'
  });
});
