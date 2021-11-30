#!/bin/zsh
node_modules/.bin/webpack --mode production
# rm -rf dist
cp -rf runtime dist/
cp -rf assets dist/

# 下面复制的目标路径是 Alfred Workflow 的目录
cp -rf dist/* "/Users/caohaoxia/Library/Application Support/Alfred/Alfred.alfredpreferences/workflows/user.workflow.EDEBD42E-0A18-4E3D-9F19-5DA177D08DD1"