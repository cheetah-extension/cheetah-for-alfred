declare var tjs: any;
import { filterWithCache, filterWithSearchResult, Project } from 'cheetah-core';

import { output, initCore, errorHandle } from './utils';
import { ResultItem } from './types';

// 判断是否需要刷新缓存
const needRefresh: boolean = Array.from(tjs.args).includes('--r');

// 项目搜索关键词
const keyword: string = (Array.from(tjs.args).pop() as string) ?? '';

async function main() {
  try {
    initCore();
    let projects: Project[] = await filterWithCache(keyword);
    let fromCache = true;
    // 如果缓存结果为空或者需要刷新缓存，则重新搜索
    if (!projects.length || needRefresh) {
      projects = await filterWithSearchResult(keyword);
      fromCache = false;
    }

  } catch (error) {
    errorHandle(error);
  }
}

main();
