/*封装cookie的依据：
    document.cookie = "name=value[;expires=date]
    [;path=path-to-source][;domain=域名][;secure]";
*/
let cookie = {
    set(o){
        let cookieStr = document.cookie = o.name +'='+ JSON.stringify(o.value);
        if(o.expires){
            cookieStr += o.expires;
        }
        if(o.path){
            cookieStr += o.path;
        }
        if(o.secure){
            cookieStr += o.secure;
        }
    },
    get(name){
        let newArr = document.cookie.split(';');
        for(let i=0;i<newArr.length;i++){
            let value = newArr[i].split('=');
            if(value[0] == name){
                return JSON.parse(value[1]);
            }
        }
    },
    remove(name,time){
        let date = new Date;
        date.setDate(date.getDate + time);
        this.set({
            name,
            expires:date
        })
    }
}
// cookie.set({
//     name:'张三',
//     value:[1,2,3,4,56,]
// });
// let p = cookie.get('张三');
// console.log(p);