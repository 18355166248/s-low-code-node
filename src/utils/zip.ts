import * as compressing from 'compressing';
import { readFile } from 'fs';

export function extractZip(filepath: string, outputPath = './') {
  return new Promise((resolve, reject) => {
    console.log(222, filepath, outputPath);
    readFile(filepath, function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      compressing.zip
        .uncompress(data, outputPath, {
          // 设置中文解码，重要！！！
          zipFileNameEncoding: 'utf8',
        })
        .then(resolve)
        .catch(reject);
    });
  });
}
