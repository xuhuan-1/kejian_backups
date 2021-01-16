// define((require,exports,module)=>{
// //CommonJS规范单个暴漏
//     //exports.b = '你好'
// //CommonJS暴漏规范【默认暴漏】
//     // module.exports = {
//         // a:1,
//         // b:2,
//         // c:3,
//         // d:4
//     // };
// //AMD规范暴漏
//     return {
//         a:1,
//         b:2,
//         c:3,
//         d:4
//     }
// })


// define((require,exports,moudle)=>{
//     moudle.exports = {
//         p:1,
//         P2:2
//     }

// })









define((require,exports,module)=>{
    let o = {
        a:['n','u','m','b','e','r','?']
    }
    return o.a;
})