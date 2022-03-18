import expressServer from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { GRANT_AUTH_PATH, LOGOUT_AUTH_PATH } from '@/globals';

import grantRequest from './auth/grantRequest';
import logoutRequest from './auth/logoutRequest';
import extractToken from './auth/helpers/extractToken';
import injectUser from './auth/helpers/injectUser';

import welcome from './routes/welcome';

const express = expressServer();

express.use(cors());

express.post(GRANT_AUTH_PATH, bodyParser.json(), grantRequest);
express.post(LOGOUT_AUTH_PATH, bodyParser.json(), logoutRequest);

express.use(extractToken);
express.use(injectUser);

/* serve assets */

express.get('/', welcome);

export default express;
