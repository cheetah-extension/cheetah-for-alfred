declare var tjs: any;
import { filterWithCache, filterWithSearchResult } from './utils';
import { ResultItem } from './type';

// 判断是否需要刷新缓存
const needRefresh: boolean = Array.from(tjs.args).includes('--r');

// 项目搜索关键词
const keyword: string = (Array.from(tjs.args).pop() as string) ?? '';

async function main() {
  let result: ResultItem[] = await filterWithCache(keyword);
  let fromCache = true;
  // 如果缓存结果为空或者需要刷新缓存，则重新搜索
  if (!result.length || needRefresh) {
    result = await filterWithSearchResult(keyword);
    fromCache = false;
  }
  // 如果是从缓存中获取的内容，最后加上刷新的入口
  if (fromCache) {
    result.push({
      title: '忽略缓存重新搜索',
      subtitle: '以上结果从缓存中获得,选择本条将重新搜索项目并更新缓存',
      arg: keyword,
      valid: true,
      icon: {
        path: 'assets/refresh.png',
      },
    });
  }
  if (!result.length) {
    result.push({
      title: `没有找到名称包含 ${keyword} 的项目`,
      subtitle: '请尝试更换关键词',
      arg: keyword,
      valid: false,
      icon: {
        path: 'assets/empty.png',
      },
    });
  }
  console.log(JSON.stringify({ items: result }));
}

main();
