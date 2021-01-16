let obj = {
    0:'zimo',
    1:20,
    length:2,
    // 手动部署的iterator接口   借用了数组的iterator
    [Symbol.iterator]:Array.prototype[Symbol.iterator]
}
for(let key of obj){
    console.log(key)
}



