[中文](./README.md) | English

# Cheetah

This is a tool based on Alfred Workflows that recursively searches for git projects in a specified local directory, and when selected, can be opened using a specified application.  
Hopefully it will help you open projects as quickly as Cheetah.

## Parameter description

### idePath

The name of the application, which can be filled in directly in the `/Applications` directory, ~~ending with .app~~ (tested without `.app` but you need to make sure the word spelling of the application name is correct). When the application path is empty, the project folder will be opened in the Finder.  
If the application is not in the `/Applications` directory then you need to fill in the absolute path.

### workspace

The directory where the project is stored, the closer to the project's hierarchy the better, the more hierarchy the slower the search will be. The default directory is Documents, such as "/Users/ronglecat/Documents" under the user folder.  
Now supports multiple directory configuration, separated by English comma.

## Use

Download the [latest](https://github.com/RongleCat/cheetah-for-alfred/release) workflows file, double click the downloaded `.alfredworkflow` file and import it into Alfred, configure two parameters and you are ready to use it.

⚠️ If the txiki source is unknown, it will not work because there is no security certificate. You can open the `security and privacy` panel in `system preferences`, you can see a blocked run, click Run Anywhere to run it, if there is no Run Anywhere button, you can run the following command.

```shell
sudo spctl --master-disable
# Enter and it will ask for the system login password
```

If you have security concerns, you can compile your own txiki executable and replace it with the runtime folder in the Alfred Workflows directory.

![](https://pic.fmcat.top/picgo/20211130101413.png)

### Application configuration for individual projects

The project supports customizing the application for each project. This configuration is written in the cache file, so you don't have to worry about the configuration disappearing when you re-search, the program will merge the new search results with the cache.

Note that you need to backup the cache file when updating Workflows, otherwise the application configuration will not be available.

You can open the file by typing `open config` in the Alfred input box.

![](https://pic.fmcat.top/picgo/20211130102413.png)

After opening the file, search for the item that needs to be configured individually, fill in the application path in `idePath` and save it, the next time you will open the item with the configured application.

### Shortcut keys

The first one is to open the project through the configured application and the second one is to open the project folder through the Finder.

## Implementation principle

If there is a .git folder in the directory, it is determined to be a project and the search results are cached for quick opening in the next query. If you add or modify a project, you need to refresh the cache at the bottom of the list.
After selecting the project in the list, you can get the absolute path to the project and open it from the command line of the application.

### Cache directory

The path to the cache is $HOME/.alfred/fmcat/cheetah/config.json

### Development notes

### txiki

In order to implement file operations without configuring Node, a clean javascript runtime project was used, based on [Quick.js](https://bellard.org/quickjs/), which implements some system operations extensions in c.  

The current version of `txiki` is `v19.0.0-alpha`

Project address: https://github.com/saghul/txiki.js

### Build

Running the build.sh file in the root directory will call rollup to build the project and copy the result to the Alfred Workflows folder. Each Workflows has a different id, which is automatically generated when it is created, so you will need to replace it manually.

## Shortcut key entry

Setting up shortcuts allows you to quickly open a project using a specific APP.

![](https://pic.fmcat.top/picgo/20211227233908.png)

Shortcut keys can be set by yourself after importing. Terminal, Git GUI can be set with your favorite app, such as iTerm, SourceTree, Fork, etc., configured in the following location.

![](https://pic.fmcat.top/picgo/20211227234217.png)
