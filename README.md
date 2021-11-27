# 花喵开门

这是一个基于 Alfred Workflows 的工具，在本地指定目录下递归搜索 git 项目，选择后可以使用指定编辑器打开。

## 参数说明

### idePath

编辑器路径，需要系统绝对路径，以 .app 结尾。目前支持的编辑器有 VSCode、WebStorm、Atom、Sublime Text，使用其他编辑器的朋友可以参考判断条件添加打开命令。当编辑器路径为空时，将在 Finder 中打开项目文件夹。

### workspace

项目存放的目录，距离项目的层级越近越好，层级越多，搜索速度会越慢。默认目录为 用户文件夹下的 Documents,比如 “/Users/ronglecat/Documents”。

## 使用

双击 workflows 目录下的 openProjectWithIDE.alfredworkflow 文件即可导入到 Alfred，配置两个参数即可使用。

### 快捷键

workflows 中提供了两个快捷键的绑定入口，第一个是通过配置的编辑器打开项目，第二个是通过 Finder 打开项目文件夹。

## 实现原理

在输入关键字后会在指定的工作目录下执行递归搜索，目录下有 .git 文件夹则判断是一个项目，搜索结果会缓存下来，便于下一次查询时快速打开。如果新增或者修改了项目需要在列表最下方选择重新搜索刷新缓存。
在列表中选择项目后获得项目的绝对路径，通过编辑器的命令行打开即可。

## 开发注意事项

### txiki

为了实现不需要配置 Node 即可完成文件操作的功能，使用了一个简洁的 javascript 运行时项目，它是基于 [Quick.js](https://bellard.org/quickjs/)开发，以 c 语言实现一些系统操作的扩展。

项目地址：https://github.com/saghul/txiki.js

### 构建

运行根目录下 build.sh 文件会调用 webpack 构建项目并将结果复制到 Alfred Workflows 的文件夹中。每个 Workflows 有不同的 id，新建时会自动生成，所以需要手动替换。
