#!/bin/zsh
node_modules/.bin/webpack --mode production
# rm -rf dist
cp -rf runtime dist/
cp -rf assets dist/

# 下面复制的目标路径是 Alfred Workflow 的目录
cp -rf dist/* "/Users/ronglecat/Library/Application Support/Alfred/Alfred.alfredpreferences/workflows/user.workflow.453EAFE0-AD58-49CD-AD54-262BCACBBA44"