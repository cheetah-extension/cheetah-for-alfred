declare var tjs: any;
import { readCache, writeCache } from './utils';
import { Project } from './type';

// 项目搜索关键词
const projectPath: string = (Array.from(tjs.args).pop() as string) ?? '';
const force = tjs.getenv('force') === '1';

async function main() {
  // 获取路径对应的项目详情
  const { cache: cacheList = [], editor } = await readCache();
  const targetProject = cacheList.find(
    (item: Project) => item.path === projectPath
  );
  if (!targetProject) {
    return;
  }

  // 更新点击量
  targetProject.hits += 1;
  writeCache(cacheList);

  const { idePath, type } = targetProject;

  // 自定义编辑器覆盖默认环境变量中配置的编辑器
  const priorityIdePath = force
    ? tjs.getenv('idePath')
    : idePath || editor[type] || tjs.getenv('idePath');

  // 输出两个参数，以英文逗号分割
  console.log([projectPath, priorityIdePath].join(','));
}

main();
