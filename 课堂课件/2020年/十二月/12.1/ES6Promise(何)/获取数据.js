let p = new Promise((resolved,rejected) =>{
    // rejected('失败');
    resolved('成功');   
});  // {}.__proto__   === 构造函数.prototype

p.then(res =>{
    console.log(res)
})

// p.catch(res =>{
//     console.log(res)
// })

Promise.resolve('foo')
    .then(res =>{
        console.log(res)  // foo
    })
    .then(function(result){
      console.log(result) // undefined
    })

    function a(){
        // Promise的静态方法，失败的静态方法，通过构造函数调用
        return Promise.reject('失败');
    }






