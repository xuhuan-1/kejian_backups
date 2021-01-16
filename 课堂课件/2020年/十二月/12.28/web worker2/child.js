//监听主线程传递的数据
self.addEventListener('message',(e)=>{
    let result = e.data;
    let s = result.map(item=>item*10);
    //子线程完成的任务传递给主线程
    self.postMessage(s);
});