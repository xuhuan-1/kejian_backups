// 引入一个js脚本
importScripts('./ajax.js','./a.js');
aaa();
// 子线程代码
addEventListener('message',e =>{
    // e.data:主线程接收的变量   e.data === 主线程的result
    let result = e.data;
    // 请求后台数据
    ajax1({
        url:'http://localhost:3001/allData',
        method:'get',
        success: data =>{
            result = data;
            postMessage(result);
        }
    })
})
