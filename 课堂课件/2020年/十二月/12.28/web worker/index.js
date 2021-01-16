// importScripts('./ajax.js','./a.js');
// aaa();
// self.addEventListener('message',e=>{
//     let result = e.data;
//     ajax1({
//         url:'http://localhost:3001/allData',
//         success:(res)=>{
//             result = res;
//             postMessage(result);
//         }
//     })
// })









importScripts('./ajax.js');
addEventListener('message',(e)=>{
    let result = e.data;
    ajax1({
        url:'http://localhost:3001/allData',
        success:(res)=>{
            result = res;
            postMessage(result);
        }
    })
});