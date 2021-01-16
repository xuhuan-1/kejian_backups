// let num = 10;
// let str = 'ddff';
// let ss = null;
// let a = undefined;
// let n = Symbol('n');
// let f = BigInt(10);
// let s = Object.prototype.toString.call(f);
// console.log(s)

// 1、instanceof的实现原理通过:[Symbol.hasInstance]
// let arr1 = [2,3,4];
// Array.prototype[Symbol.isConcatSpreadable] = false;
// let newArr = arr1.concat([4,5,6])
// console.log(newArr)
// Symbol.isConcatSpreadable
// class Person{
//     // 2、存取描述符:Symbol用于设置数据类型
//     get[Symbol.toStringTag](){
//         return 'ZIMO'
//     }
// }
// let p = new Person();
// let s = Object.prototype.toString.call(p);
// console.log(s)

// String
// String.prototype.split = function(){

// }
// let str = 'ddd';
// str.split('=')

// Array
// Array.prototype.myPush = function(){
//     // console.log(arguments)
//     for(var i=0;i<arguments.length;i++){
//         console.log(arguments) //[] 当前数组的length，arguments加的
//         // arr[3] = 4
//         this[this.length] = arguments[i];
//         return this.length;
//     }
// }

// let arr = [1,2,3];
// let d = arr.myPush(4) // [1,2,3,4]
// console.log(arr,d)

// pop shift unshift

// let arr = [3,4,5,6,7];
// let s = arr.some(item => item == 6);
// let d = arr.includes(6);

// console.log(s,d)

// let arr = [4,6,8,10,7];
// let g = arr.every(item => item%2 ==0)
// console.log(g)

// let arr = [7,6,8,10];
// let g = arr.find(item => item%2 ==0)
// console.log(g)

// let arr = [7,6,8,10]; // 31
// let d = arr.reduce((prev,current) =>{
//     return prev += current;
// },0)
// console.log(d)

// let arr = [5,11,4,3,6,7,8,6];
// let s = arr.sort()
// console.log(s)

// let arr = [
//     {name:'张三丰',age:120},
//     {name:'李二牛',age:80},
//     {name:'狗蛋',age:30},
//     {name:'小董',age:1000}
// ];
// let s = arr.sort((a,b) =>{
//     return b.age-a.age;
// })
// console.log(s)

// let arr = [
//     {name:'张三丰',age:120},
//     {name:'李二牛',age:80},
//     {name:'狗蛋',age:30},
//     {name:'狗蛋',age:30},
//     {name:'狗蛋',age:30},
//     {name:'狗蛋',age:30},
//     {name:'小董',age:1000}
// ];

// let s = arr.splice(arr.length-2,1,'紫漠哥哥');
// console.log(s,arr)
// 一页显示5条
// http://localhost:3001/page?page=5
// let size = 5;
// let page = 2;
//            // 5    10==》  5条
// arr.slice((size*page)-size,size*page);

// let arr = [3,4,5];
// let s = arr.join(',');
// console.log(s,arr);

// let arr = [3,4,4,5,6];
// console.log(new Set(arr))

// 数组转对象：new Set();
// 对象转数组：Array.from({})  []
// 字符串转数组：split('=')  []
// 数组转字符串：join()、toString()

// let arr = [3,4,4,5,6];
// let d = arr.values();
// console.log(d);
// console.log(d.next());
// console.log(d.next());
// console.log(d.next());
// console.log(d.next());
// console.log(d.next());
// console.log(d.next());

// let obj = {
//     name:'zimo',
//     age:20
// }
// let h = Object.keys(obj).map(item => item == 'name')
// let k = Object.values(obj)
// console.log(h,'===',k);

// let obj = {
//     0:'zimo',
//     1:20,
//     length:2,
//     [Symbol.iterator]:Array.prototype[Symbol.iterator]
// }
// console.log(obj[0]);

// for(let key of obj){
//     console.log(key);
// }

// let obj = {
//     name:'zimo',
//     age:20,
//     fn:{
//         name:'hh'
//     }
// }
// delete obj.fn;
// console.log(obj);

// [] == []  // false
// [] == ![] // true
// {} == {}  // false
// {} == !{} // false

// let s = 3+7-2+{}-[]+null*[]-6+''+undefined;
//              'NaN'+undefined == 'NaNundefined'
// console.log(s);// NaNundefined

// let s =
// Number([]) + '[' + 9 * '' + '[]' + '[object Object]'+{} - true;

// '0[0[][object Object][object Object]' - 1
// console.log(s);     // NaN

// let obj = {
//     name:'zimo',
//     age:20
// }
// let d = new Set(Object.values(obj));
// let s = Object.keys(obj).map(item => item =='name');

// console.log(s,d);

// let obj = {
//     name:'zimo',
//     age:20
// }
// let obj1 = obj;
// // console.log(obj1 === obj); //true
// let s = Object.is(obj,obj1);
// console.log(s);

// state:数据
// let initState = {
//     num:100,
//     list:[3,4,5]
// }
// let add = (num) =>({
//     type:'ADD',
//     num
// })

// let reducer = (state = initState,action) =>{
//     switch(action.type){
//         case 'ADD':
//             return Object.assign({},state,{num:state.num += add} )
//         default:
//             return {...state}
//     }
// }

// let obj = {
//     name:'zimo',
//     age:20
// }
// let s = Object.assign({},obj);
// let d = Object.is(obj,s)
// console.log(s,d);

// let obj = {
//     name:'zimo',
//     age:20
// }
// obj.age = 10;
// let s = Object.freeze(obj);
// let g = Object.isFrozen(obj)
// s.name = '剑哥哥！';
// console.log(s,g);

// let obj = {
//     name:'zimo',
//     age:20
// }
// let f = Object.create(obj);
// console.log(f);

// let obj = {
//     name:'zimo',
//     age:20
// }
// let s = Object.seal(obj);
// obj['sex'] = '男';
// console.log(obj.name,'===');
// delete obj.name;
// console.log(obj);
// let d = Object.isSealed(obj)
// console.log(s,obj,d);

// var obj = {
//     book:'三国演义'
// }

// Object.defineProperty(obj,'book',{
//     writable:true,
//     // 读
// //     get: function(){
// // 　　　　　　//返回经过处理后的变量
// //         return  `我是：${book}`;;
// //     },
//     // 改
// //     set: function(val){
// // 　　　　//利用临时变量接收赋值
// //         book = val;
// //    }
// })

// console.log(obj.book) //调用了get方法  ==> "<<三国演义>>"

// obj.book = '西游记' // 调用了了set方法

// console.log(obj.book) //调用了get方法  ==> "<<西游记>>"

// var obj = {
//     book:'fff',
//     age:null
// }

// Object.defineProperty(obj,'age',{
//     value:100,     //默认值是undefined，
//     writable:true, //设置为true 则才能进行写入
//     configurable:true,//设置true，才能删除
//     enumerable:true,//设置当前对象是否可枚举
// })
// obj.book = '西游记'
// obj.age = 20;
// delete obj.age
// for(let key in obj){
//     console.log(obj[key])
// }
// console.log(obj.book,obj.age,obj);

//生成器函数 generatorFunction
//函数生成器：通过一个函数生成多个函数


let arr = [
    "Undefined",
    "Null",
    "Boolean",
    "String",
    "Number",
    "Symbol",
    "BigInt",
    "Array",
    "Object",
    "Function",
    "Date",
    "RegExp",
];
function isType(type){
    // obj是具体的第二个小括号的实参
    return function(obj){
        return Object.prototype.toString.call(obj).includes(type);
    }
}
let fn = {};
arr.forEach(item =>{
    // fn['is'+item]:给fn对象添加属性
    fn['is'+item] = isType(item);
})

let a = fn.isUndefined(undefined);
let b = fn.isNull(null);
let c = fn.isBoolean(false);
let d = fn.isNumber(10);
let e = fn.isString('aa');
let f = fn.isSymbol(Symbol('sss'));
let g = fn.isBigInt(BigInt(10));
let h= fn.isArray([]);
let i = fn.isObject({});
let j = fn.isFunction(()=>{});
let k = fn.isDate(new Date());
let l = fn.isRegExp(/\.txt/);
console.log(a,b,c,d,e,f,g,h,i,j,k,l);












