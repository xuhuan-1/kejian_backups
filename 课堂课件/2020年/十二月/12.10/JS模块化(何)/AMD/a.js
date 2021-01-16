// define函数定义了一个模块
define(['./b.js'],(b) => {
    // 通过 return 暴露方法及变量
    return {
        b,
        a:10,
        delay:function(){}
    }
})