declare var tjs: any;
import { readCache, writeCache } from './utils';
import { Project } from './type';

// 项目搜索关键词
const projectPath: string = (Array.from(tjs.args).pop() as string) ?? '';

async function main() {
  // 获取路径对应的项目详情
  const cacheList = await readCache();
  const targetProject = cacheList.find(
    (item: Project) => item.path === projectPath
  );

  // 更新点击量
  targetProject.hits += 1;
  writeCache(cacheList);

  // 自定义编辑器覆盖默认环境变量中配置的编辑器
  const idePath = targetProject.idePath || tjs.getenv('idePath');

  // 输出两个参数，以英文逗号分割
  console.log([projectPath, idePath].join(','));
}

main();
