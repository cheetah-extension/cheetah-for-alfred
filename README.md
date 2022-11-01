中文 | [English](./README-EN.md)

# 猎豹

这是一个基于 Alfred Workflows 的工具，在本地指定目录下递归搜索 git 项目，选择后可以使用指定应用打开。  
希望它能像猎豹一样快速地帮您打开项目。

## 参数说明

### idePath

应用名称，在`/Applications`目录下的应用可以直接填入名称，~~以 .app 结尾~~(经测试可以不加`.app`但是需要保证应用名称单词拼写是正确的)。当应用路径为空时，将在 Finder 中打开项目文件夹。  
如果应用不在`/Applications`目录下则需要填入其绝对路径。

### workspace

项目存放的目录，距离项目的层级越近越好，层级越多，搜索速度会越慢。默认目录为 用户文件夹下的 Documents,比如 “/Users/ronglecat/Documents”。  
现已支持多目录配置，以英文逗号分隔。

## 使用

下载[最新](https://github.com/RongleCat/cheetah-for-alfred/release) workflows 文件，双击下载后的 `.alfredworkflow` 文件导入 Alfred，配置两个参数即可使用。

⚠️ 如果出现 txiki 来源未知无法运行是因为没有安全证书。可以打开 `系统偏好设置` 中的 `安全性与隐私` 面板，可以看到一个被拦截的运行，点击任然运行即可，如果没有任然运行按钮，可以运行以下命令。

```shell
sudo spctl --master-disable
# 回车后会要求输入系统登录密码
```

完成以后再尝试运行，如果有安全性方面的顾虑可以自己编译 txiki 可执行文件替换到 Alfred Workflows 目录下的 runtime 文件夹。

![](https://pic.fmcat.top/picgo/20211130101413.png)

### 针对单个项目的应用配置

项目支持对每个项目自定义应用，这个配置是写在缓存文件里的，重新搜索的时候不用担心配置会消失，程序会把新的搜索结果与缓存合并。

要注意的是更新 Workflows 的时候需要备份一下缓存文件，不然应用配置就没有啦。

这边提供了一个关键字用于打开配置文件的关键词，在 Alfred 输入框中输入 `open config` 即可通过配置的应用打开文件了。

![](https://pic.fmcat.top/picgo/20211130102413.png)

打开文件以后搜索需要单独配置的项目，在 `idePath` 中填写应用路径并保存，下一次就是使用配置的应用打开这个项目了。

### 快捷键

workflows 中提供了两个快捷键的绑定入口，第一个是通过配置的应用打开项目，第二个是通过 Finder 打开项目文件夹。

## 实现原理

在输入关键字后会在指定的工作目录下执行递归搜索，目录下有 .git 文件夹则判断是一个项目，搜索结果会缓存下来，便于下一次查询时快速打开。如果新增或者修改了项目需要在列表最下方选择重新搜索刷新缓存。
在列表中选择项目后获得项目的绝对路径，通过应用的命令行打开即可。

### 缓存目录

缓存的路径为 $HOME/.alfred/fmcat/cheetah/config.json

## 开发注意事项

### txiki

为了实现不需要配置 Node 即可完成文件操作的功能，使用了一个简洁的 javascript 运行时项目，它是基于 [Quick.js](https://bellard.org/quickjs/)开发，以 c 语言实现一些系统操作的扩展。  

当前 `txiki` 版本为 `v19.0.0-alpha`

项目地址：https://github.com/saghul/txiki.js

### 构建

运行根目录下 build.sh 文件会调用 rollup 构建项目并将结果复制到 Alfred Workflows 的文件夹中。每个 Workflows 有不同的 id，新建时会自动生成，所以需要手动替换。

## 快捷键入口

设置快捷键能够快速完成使用指定 APP 打开项目。

![](https://pic.fmcat.top/picgo/20211227233908.png)

快捷键可以在导入后自行设置，终端、Git GUI 可以设置自己喜欢的应用，比如 iTerm、SourceTree、Fork 等等，在下图所示位置配置：

![](https://pic.fmcat.top/picgo/20211227234217.png)
