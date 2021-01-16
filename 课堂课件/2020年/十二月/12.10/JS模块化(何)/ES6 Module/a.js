// 当引入单个暴露的对象或者变量时 必须加 {} 
// import { add } from './b.js';
// add();
// 或者用 * as语法代替
// import * as types from './b.js';
// types.add1()
// types.add2()
// types.add3()
// types.add4()
// types.add5()

// 当引入默认暴露的对象或者变量时，如下引用
import xxx from './c.js';
console.log(xxx)
