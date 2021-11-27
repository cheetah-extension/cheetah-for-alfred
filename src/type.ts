// 遍历文件夹时获取的文件信息
export interface ChildInfo {
  name: string;
  path: string;
  isDir: boolean;
}

// 项目信息
export interface Project {
  name: string;
  path: string;
  type: string;
}

// 返回给 Alfred 的条目信息
export interface resultItem {
  title: string;
  subtitle: string;
  arg: string;
  valid: boolean;
  icon: {
    path: string;
  };
}
