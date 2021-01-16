import * as types from './utils.js';
import { ADD_NUM,REDUCE_NUM } from './contants.js';
import List from './list.js';

let d = List.filter(item =>item.name != 'zimo2' && item.name != 'zimo4')
console.log(d)
async function a(){
    let timer = new Date();
    let s = types.formateDate(timer);
    await types.delay()
    console.log(s,ADD_NUM,REDUCE_NUM)
}
a();






// 2020-12-15 