import type { Request, Response } from 'express';

const welcome = (_req: Request, res: Response) => res.send(`
  <html>
    <head>
    </head>

    <body>
      <h1>WELCOME</h1>
    </body>
  </html>
`);

export default welcome;
