var obj = {_book:'三国演义'}

Object.defineProperty(obj,'book',{
    get: function(){
　　　　　　
        return '<<'+this._book+'>>'
    },
    set: function(val){
　　　　　//this指向原对象，定义一个属性用来接收赋值
        this._book = val
   }    
})

console.log(obj.book) //==> "<<三国演义>>"

obj.book = '水浒传';

console.log(obj.book) //==> "<<水浒传>>"