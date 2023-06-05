import { exec } from 'child-process-promise';
import { Request } from 'express';

export function transformWebp({ filePath, outputFile }) {
  return exec(`cwebp -q 75 ${filePath} -o ${outputFile}`).catch(function (err) {
    console.error('保存webp失败--ERROR: ', err);
  });
}

export function getIsSupportWebP(req: Request) {
  const requestAccept = req.headers.accept;
  return /image\/webp/gi.test(requestAccept);
}
