//获取本地文件
let fileReader = function fileReader(file) {
    return new Promise(resolve => {
        let reader = new FileReader;
        reader.readAsDataURL(file);
        reader.onload = e => {
            resolve(e.target.result);
        }
    })
}
//获取后台数据
let postMessage = function postMessage(url,data,config){
    return axios.post(`http://localhost:8888/${url}`,data,config).then(res=>{
        return res.data;
    })
}
//延迟函数
let delay = function delay(timer){
    var timer = timer || 2000;
    return new Promise(resolve=>{
        return setTimeout(()=>{
            resolve();
        },timer)
    })
}
//通过ID获取DOM元素
let $ = function $(id){
    return document.getElementById(id);
}
export {
    $,
    postMessage,
    delay,
    fileReader
}