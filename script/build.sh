#!/bin/zsh
# node_modules/.bin/webpack --mode production
rm -rf $PWD/dist
export NODE_ENV=production
rollup -c
# rm -rf dist
cp -rf $PWD/runtime $PWD/dist/
cp -rf $PWD/assets $PWD/dist/

# 下面复制的目标路径是 Alfred Workflow 的目录
cp -rf $PWD/dist/* "/Users/caohaoxia/Library/Application Support/Alfred/Alfred.alfredpreferences/workflows/user.workflow.37EAE88B-2588-4C52-95D8-272748DE8E53"