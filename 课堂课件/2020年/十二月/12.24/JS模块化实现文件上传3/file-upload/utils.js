 let fileReader = function fileReader(file){
    return new Promise(resolve=>{
        let reader = new FileReader;
        reader.readAsDataURL(file);
        reader.onload = e=>{
            resolve(e.target.result);
        }
    })
}
let postMessage = function postMessage(url,data,config){
    return axios.post(`http://localhost:8888/${url}`,data,config).then(res=>{
        return res.data;
    })
}
let delay = function delay(timer){
    var timer = timer || 2000;
    return new Promise(resolve=>{
        return setTimeout(()=>{
            resolve();
        },timer);
    })
}
let $ = function $(id){
    return document.getElementById(id);
}
export {
    $,
    postMessage,
    delay,
    fileReader
}