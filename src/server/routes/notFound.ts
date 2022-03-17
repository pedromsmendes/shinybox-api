import type { Request, Response } from 'express';

const notFound = (_req: Request, res: Response) => res.send(`
<html>
  <head>
  </head>

  <body>
    <h1>NOT FOUND</h1>
  </body>
</html>
`);

export default notFound;
