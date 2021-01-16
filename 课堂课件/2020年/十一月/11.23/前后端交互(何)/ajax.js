function formate(o){
    let arr = [];
    for(let key in o){
        arr.push(key + '=' + o[key]);
    }
    return arr.join('&');
}
let params = formate({name:'zimo',pwd:123456});
console.log(params)