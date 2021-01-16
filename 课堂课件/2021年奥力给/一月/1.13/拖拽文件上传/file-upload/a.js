import * as types from './utils.js';
import * as typ from './b.js';
//获取元素
let submit = types.$('submit');
submit.onclick = function(){
    typ.upLoad.click();
}