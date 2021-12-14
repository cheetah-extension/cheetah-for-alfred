# 花喵开门

这是一个基于 Alfred Workflows 的工具，在本地指定目录下递归搜索 git 项目，选择后可以使用指定编辑器打开。

## 参数说明

### idePath

编辑器路径，需要系统绝对路径，以 .app 结尾。目前支持的编辑器有 VSCode、WebStorm、Atom、Sublime Text，使用其他编辑器的朋友可以参考判断条件添加打开命令。当编辑器路径为空时，将在 Finder 中打开项目文件夹。

### workspace

项目存放的目录，距离项目的层级越近越好，层级越多，搜索速度会越慢。默认目录为 用户文件夹下的 Documents,比如 “/Users/ronglecat/Documents”。  
现已支持多目录配置，以英文逗号分隔。

### force

值为 1 时强制使用变量中配置的编辑器打开项目，为 0 时则按照项目编辑器配置的权重，cache 中单个项目编辑器 > 项目类型编辑器 > idePath 变量配置的编辑器。（尽量不要修改）

## 使用

双击 workflows 目录下的 openProjectWithIDE.alfredworkflow 文件即可导入到 Alfred，配置两个参数即可使用。

⚠️ 如果出现 txiki 来源未知无法运行是因为没有安全证书。可以打开 `系统偏好设置` 中的 `安全性与隐私` 面板，可以看到一个被拦截的运行，点击任然运行即可，如果没有任然运行按钮，可以运行以下命令。

```shell
sudo spctl --master-disable
# 回车后会要求输入系统登录密码
```

完成以后再尝试运行，如果有安全性方面的顾虑可以自己编译 txiki 可执行文件替换到 Alfred Workflows 目录下的 runtime 文件夹。

![](https://pic.fmcat.top/picgo/20211130101413.png)

### 针对单个项目的编辑器配置

1.1.0 版本支持了对每个项目自定义编辑器，这个配置是写在缓存文件里的，重新搜索的时候不用担心配置会消失，程序会把新的搜索结果与缓存合并。

要注意的是更新 Workflows 的时候需要备份一下缓存文件，不然编辑器配置就没有啦。

这边提供了一个关键字用于打开配置文件的关键词，在 Alfred 输入框中输入 `open config` 即可通过配置的编辑器打开文件了。

![](https://pic.fmcat.top/picgo/20211130102413.png)

打开文件以后搜索需要单独配置的项目，在 `idePath` 中填写编辑器路径并保存，下一次就是使用配置的编辑器打开这个项目了。

### 快捷键

workflows 中提供了两个快捷键的绑定入口，第一个是通过配置的编辑器打开项目，第二个是通过 Finder 打开项目文件夹。

## 实现原理

在输入关键字后会在指定的工作目录下执行递归搜索，目录下有 .git 文件夹则判断是一个项目，搜索结果会缓存下来，便于下一次查询时快速打开。如果新增或者修改了项目需要在列表最下方选择重新搜索刷新缓存。
在列表中选择项目后获得项目的绝对路径，通过编辑器的命令行打开即可。

### 缓存目录
缓存的路径为 $HOME/.alfred/fmcat/openProject/config.json

## 开发注意事项

### txiki

为了实现不需要配置 Node 即可完成文件操作的功能，使用了一个简洁的 javascript 运行时项目，它是基于 [Quick.js](https://bellard.org/quickjs/)开发，以 c 语言实现一些系统操作的扩展。

项目地址：https://github.com/saghul/txiki.js

### 构建

运行根目录下 build.sh 文件会调用 webpack 构建项目并将结果复制到 Alfred Workflows 的文件夹中。每个 Workflows 有不同的 id，新建时会自动生成，所以需要手动替换。
