declare var tjs: any;
import { readCache, writeCache, getEnv } from './utils';
import { Project } from './type';
import path from 'path-browserify';

const projectPath = getEnv('projectPath');

async function main() {
  // 项目搜索关键词
  let idePath: string = (Array.from(tjs.args).pop() as string) ?? '';
  idePath = idePath.split(',')?.[0] ?? '';
  if (!idePath) return;
  idePath = path.basename(idePath);
  // 获取路径对应的项目详情
  const { cache: cacheList = [] } = await readCache();
  const targetProject = cacheList.find(
    (item: Project) => item.path === projectPath
  );
  if (!targetProject) {
    return;
  }

  // 更新编辑器
  targetProject.idePath = idePath;
  writeCache(cacheList);
}

main();
