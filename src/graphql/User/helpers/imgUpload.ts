import mkdirp from 'mkdirp';
import { randomUUID } from 'crypto';
import path from 'path';
import { createWriteStream } from 'fs';
import { PassThrough } from 'stream';
import { type FileUpload } from 'graphql-upload';

import { ALLOWED_IMG_UPLOADS } from '@/globals';

const imgUpload = async (img: FileUpload, _dir: string) => {
  const directory = `assets/${_dir}`

  const { createReadStream, filename: originalFileName, mimetype } = await img;

  if (ALLOWED_IMG_UPLOADS.find((allowed) => mimetype.toLowerCase().includes(allowed.toLowerCase()))) {
    // validation error, wrong file type
  }

  const filename = `${randomUUID()}${path.extname(originalFileName)}`;
  const fullPath = `${directory}/${filename}`;

  await mkdirp(directory);

  const fileSave = new Promise<void>((resolve, reject) => {
    const stream = createReadStream();
    const writeStream = createWriteStream(`public/${fullPath}`);

    stream
      .pipe(new PassThrough())
      .on('error', (error) => reject(error))
      .pipe(writeStream)
      .on('error', (error) => reject(error))
      .on('end', () => resolve())
      .on('finish', () => resolve());
  });

  await fileSave;

  return fullPath;
};

export default imgUpload;
