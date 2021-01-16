

/***
 * 异步代码：【I：input   O：output】
 *  AJAX，定时器，回调，I/O操作  Promise  async-await【终极异步解决方案】  
 * 
 * ES6 class类是function的语法糖，原理还是function模拟出来的
 * 语法糖：写法简单，实现的功能一样，用起来舒服
 * try catch(){}语法：
 *  如何使用try{}catch(){}
 */

function Promise(executor){
    this.status = 'pendind';
    this.data = undefined;
    resolve = function(){};
    reject = function(){};

    try{
        // 努力的执行正确代码 
        executor(resolve,reject);
    }
    // 搜集错误信息，并处理
    catch(err){
        console.log(err)
    }
}
// 原型方法
Promise.prototype = {
    then:function(){},
    catch:function(){}
}

let status = 'PENDING';
let cheng = 'CHENG';
let shi = 'SHI';
let data = undefined;

class Promise{
    // 默认有一个构造器
    constructor(executor){
        try {
            executor(this.resolve.bind(this),this.reject.bind(this));
        }
        catch(e){
            // new Error()  也是专门汇集错误的构造函数
            throw new Error(e);
        }
    }
    // 成功
    resolve(value){
        if(status !== 'PENDING')return;
        status = cheng;
        data = value;
    }
    reject(e){
        if(status !== 'PENDING')return;
        status = shi;
        data = e;
    }
    
    finally(){}
    static race(){}
    static all(){}
    static reject(){}
    static resolve(){}
}



