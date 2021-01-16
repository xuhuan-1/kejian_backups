// let name = 'wang',age=17;
// var obj = {
//     fn:function() {
//         console.log(this);
//     },

//     aaa:this.age
// }
// var aaa = obj.aaa = window.age; //指针引用
// console.log(window.obj.aaa);
// obj.fn();


// let sss = (a,...b) =>{
//     console.log(a,...b);
// }
// sss(1,2,3,4,5);

class Person{
    constructor(){
    }
    static bbb(){
        console.log('静态方法');
    }
    aaa(){
        console.log('原型方法');
    }
}
Person.bbb();
let p = new Person();
p.aaa();

