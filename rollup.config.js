import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

const production = process.env.NODE_ENV === 'production';

const devInput = {
  test: 'src/test.ts',
};

const productionInput = {
  index: 'src/index.ts',
  hits: 'src/hits.ts',
  choose: 'src/choose.ts'
};

export default {
  // 这里input要改成数组形式或者对象形式，对象形式可以修改打包的文件名，键对应的就是打包的文件名
  input: production ? productionInput : devInput,
  // 输出配置要改成拆分包的配置，以为多入口打包默认会执行打包拆分的特性。所以输出格式要改成amd
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    production && uglify(),
  ]
}