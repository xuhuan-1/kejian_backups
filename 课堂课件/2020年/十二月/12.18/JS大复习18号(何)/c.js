window.onload = () =>{
    // 获取元素当前属性值
    // function getStyle(ele,attr){
    //     return getComputedStyle ? window.getComputedStyle(ele,null)[attr]:ele.currentStyle[attr];
    // }
    // let root = document.getElementById('root')
    // console.log(root);
    // 强类型转换
    // console.log(parseInt(getStyle(root,'width'))); //400
    // 隐式类型转换
    // console.log(getStyle(root,'width')*1);

    // 双精度问题造成的

    // let a = 0.1;  //0.0001100110011001
    // let b = 0.2;
    // let c = a + b;
    // 解决方案一 toFixed()
    // console.log(Number(c.toFixed(1)));
    // 解决方案二 parseFloat配合toFixed()
    // console.log(parseFloat(c.toFixed(1)));
    // 解决方案三 插件
    // bignumber.js
    

    // parseInt():接收两个参数，第一个是你的字符串，第二个参数是
    // 转换的进制，进制范围在2-36之间，如果超出当前进度范围则返回
    // NaN,如果解析不了，都返回NaN

    // parseInt第二个参数，如果为0，则以10进制进行解析，如果为0x或者
    // 0X，则以16进制解析数据

    // console.log(parseInt("10"));         //返回 10
    // console.log(parseInt("19",10));      //返回 19 
    // console.log(parseInt("11",2));       //返回 3 
    // console.log(parseInt("17",8));       //返回 15 
    // console.log(parseInt("1f",16));      //返回 31 

    // console.log(parseInt('100px',0));       //NaN


    // item index arr
    // let arr = [1,2,3].map((item,index,arr) =>{
    //     return parseInt(item,index,arr) // 
    // })
    // [1,0,[1,2,3]] ===>[1]
    // [2,1,[1,2,3]] ===>[1,NaN]
    // [3,2,[1,2,3]] ===>[1,NaN,NaN]
    // console.log(arr); //[1, NaN, NaN]




    // let arr = [3,4,5,8,7].map(parseInt);
    // console.log(arr);

    //  0 1 2 3 4

    // [3,NaN,NaN,NaN,NaN]

   // 1 1 1 1 
   // c= 1*2



}


