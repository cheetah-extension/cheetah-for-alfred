declare var tjs: any;
declare var TextDecoder: any;
import * as path from 'path-browserify';
import { ChildInfo, Project, resultItem } from './type';

// 如果工作目录未指定，则使用用户目录下的Documents目录
let workspace = tjs.getenv('workspace');
if (!workspace) {
  workspace = `${tjs.getenv('HOME')}/Documents`;
}

// 项目搜索关键词
export const keyword: string = (Array.from(tjs.args).pop() as string) ?? '';

// 缓存路径
const cachePath = path.join(tjs.cwd(), '.cache.json');

// 写入缓存
export async function writeCache(cache: Project[]): Promise<void> {
  try {
    const cacheFile = await tjs.fs.open(cachePath, 'rw', 0o666);
    const historyString = JSON.stringify(cache);
    await cacheFile.write(historyString);
    cacheFile.close();
  } catch (error: any) {
    console.log(error.message);
  }
}

// 读取文件内容
async function readFile(filePath: string): Promise<string> {
  const buffer = await tjs.fs.readFile(filePath);
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}

// 读取缓存
export async function readCache() {
  try {
    const history = await readFile(cachePath);
    return JSON.parse(history);
  } catch (error: any) {
    if (error.message === 'no such file or directory') {
      writeCache([]);
      return [];
    }
  }
}

// 在指定目录中查找项目
export async function findProject(dirPath: string): Promise<Project[]> {
  const result: Project[] = [];
  const currentChildren: ChildInfo[] = [];
  const dirIter = await tjs.fs.readdir(dirPath);

  for await (const item of dirIter) {
    const { name, type }: { name: string; type: number } = item;
    currentChildren.push({
      name,
      isDir: type === 2,
      path: path.join(dirPath, name),
    });
  }

  const isGitProject = currentChildren.some(
    ({ name }: { name: string }) => name === '.git'
  );

  if (isGitProject) {
    result.push({
      name: path.basename(dirPath),
      path: dirPath,
      type: await projectTypeParse(currentChildren),
    });
  } else {
    const nextLevelDir = currentChildren.filter(
      ({ isDir }: { isDir: boolean }) => isDir
    );
    for (let i = 0; i < nextLevelDir.length; i += 1) {
      const dir = nextLevelDir[i];
      result.push(...(await findProject(path.join(dirPath, dir.name))));
    }
  }

  return result;
}

// 解析项目类型
async function projectTypeParse(children: ChildInfo[]): Promise<string> {
  let type = 'unknown';
  for (let i = 0; i < children.length; i++) {
    const { name } = children[i];
    const lowName = name.toLocaleLowerCase();
    if (lowName === 'nuxt.config.js') {
      type = 'nuxt';
      break;
    }
    if (lowName === 'vue.config.js') {
      type = 'vue';
      break;
    }
    if (lowName === '.vscodeignore') {
      type = 'vscode';
      break;
    }
    if (lowName === 'cargo.toml') {
      type = 'rust';
      break;
    }
    if (lowName === 'pubspec.yaml') {
      type = 'dart';
      break;
    }
    if (lowName === '_config.yml') {
      type = 'hexo';
      break;
    }
    if (lowName === 'tsconfig.json') {
      type = 'typescript';
      break;
    }
    if (lowName === 'package.json') {
      type = 'javascript';
      break;
    }
  }
  return type;
}

// 输出待选列表给 Alfred
export function output(projectList: Project[]): resultItem[] {
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

// 过滤项目
export function filterProject(projectList: Project[]) {
  const result = projectList.filter(({ name }: { name: string }) => {
    const reg = new RegExp(keyword, 'i');
    return reg.test(name);
  });
  return result;
}

// 从缓存中过滤
export async function filterWithCache() {
  const cache = await readCache();
  return output(filterProject(cache));
}

// 从搜索结果中过滤
export async function filterWithSearchResult() {
  const projectList: Project[] = await findProject(workspace);
  writeCache(projectList);
  return output(filterProject(projectList));
}
