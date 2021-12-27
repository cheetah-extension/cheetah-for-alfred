#!/bin/zsh
# node_modules/.bin/webpack --mode production
rm -rf dist/utils*.js
rollup -c
# rm -rf dist
cp -rf runtime dist/
cp -rf assets dist/

# 下面复制的目标路径是 Alfred Workflow 的目录
cp -rf dist/* "/Users/ronglecat/Library/Application Support/Alfred/Alfred.alfredpreferences/workflows/user.workflow.DE450374-4E48-44E7-9F05-71A643A630D1"