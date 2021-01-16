import * as types from './utils.js';
import * as typ from './b.js';
    //获取本地文件
let fileReader = types.fileReader,
    //获取后台数据
    postMessage = types.postMessage,
    //延迟函数
    delay = types.delay,
    //通过ID获取DOM元素
    $ = types.$;
// 获取元素
let submit = $('submit'),
upLoad = $('upLoad'),
uploadBox = $('uploadBox');
export let sub = submit.onclick = function(){
    typ.upLoad.click();
}
