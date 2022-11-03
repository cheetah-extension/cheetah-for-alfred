
// 返回给 Alfred 的条目信息
export interface ResultItem {
  title: string;
  subtitle: string;
  arg: string;
  valid: boolean;
  icon: {
    path: string;
  };
}