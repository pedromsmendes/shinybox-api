import expressServer from 'express';

import welcome from './routes/welcome';
import notFound from './routes/notFound';

const express = expressServer();

express.get('/', welcome);
express.get('/*', notFound);

export default express;
