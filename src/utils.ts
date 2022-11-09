import path from 'path-browserify';

import {
  HOME_PATH,
  Project,
  ErrorCodeMessage,
  getEnv,
  PlatformType,
  init,
} from 'cheetah-core';
import { ResultItem } from './types';

// 缓存路径
const cachePath = path.join(
  `${HOME_PATH}`,
  '.alfred',
  'fmcat',
  'cheetah',
  'config.json'
);

export function initCore() {
  const workspaces = (getEnv('workspace') || '').split(/[,，]/);

  const PlatformTypeMap = {
    darwin: PlatformType.MAC,
    windows: PlatformType.WINDOWS,
    linux: PlatformType.LINUX,
  };

  let platformType: PlatformType =
    PlatformTypeMap?.[tjs.platform] ?? PlatformType.MAC;

  init({
    cachePath,
    workspaces: workspaces.join(','),
    platformType,
  });
}

// 输出待选列表给 Alfred
export function output(projectList: Project[]): ResultItem[] {
  const result = projectList.map(
    ({ name, path, type }: { name: string; path: string; type: string }) => {
      return {
        title: name,
        subtitle: path,
        arg: path,
        valid: true,
        icon: {
          path: `assets/${type}.png`,
        },
      };
    }
  );
  return result;
}

export function errorHandle(error: any, notice: boolean = false) {
  const errorCode: number = error.message;
  const errorMessage = ErrorCodeMessage[errorCode];
  if (notice) {
    console.log(`Error:${errorMessage}`);
    return
  }

  console.log(
    JSON.stringify({
      items: [
        {
          title: 'Error',
          subtitle: errorMessage,
          arg: '',
          valid: false,
          icon: {
            path: 'assets/empty.png',
          },
        },
      ],
    })
  );
}