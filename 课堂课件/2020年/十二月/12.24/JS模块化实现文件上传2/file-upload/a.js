import * as types from './utils.js';
import * as typ from './b.js';

let $ = types.$;
let submit = $('submit');
submit.onclick = function(){
    typ.upLoad.click();
}