import { readdir, stat } from 'node:fs/promises';

export interface FileProps {
  name: string;
  file: string;
}
// 遍历一个文件夹下的所有文件和文件夹名字
export async function getFileListFromFile(
  path,
  file?: string, // 文件夹
  option: {
    pageNo?: number;
    pageSize?: number;
    isFirst?: boolean;
  } = { pageNo: 1, pageSize: 10, isFirst: true },
): Promise<FileProps[] | { data: FileProps[]; total: number }> {
  if (!path) return [];
  const { pageNo, pageSize, isFirst } = option;
  let fileList: FileProps[] = [];
  const files = await readdir(path);
  for await (const item of files) {
    const data = await stat(path + '/' + item);
    if (data.isFile()) {
      fileList.push({
        file,
        name: item,
      });
    } else {
      fileList = fileList.concat(
        (await getFileListFromFile(path + '/' + item, item, {
          ...option,
          isFirst: false,
        })) as FileProps[],
      );
    }
  }

  let newFileList = fileList;
  if (isFirst) {
    const start = (pageNo - 1) * pageSize;
    const end = start + Number(pageSize);
    newFileList = fileList.slice(start, end);
    return {
      data: newFileList,
      total: fileList.length,
    };
  }
  return newFileList;
}
