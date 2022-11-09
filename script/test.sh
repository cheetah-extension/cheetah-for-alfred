#!/bin/zsh
# node_modules/.bin/webpack --mode production
rm -rf $PWD/dist
rollup -c
# rm -rf dist
cp -rf $PWD/runtime $PWD/dist/
cp -rf $PWD/assets $PWD/dist/

cd $PWD/dist

./runtime/txiki ./test.js core
