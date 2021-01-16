// 命名空间，防止污染环境、防止起冲突 【目的是为了解耦】
/**
 * 思想：高内聚，低耦合
 */

// 封装cookie  []包裹的可以省略不写，
// document.cookie = "name=value[;expires=date]
// [;path=path-to-source][;domain=域名][;secure]";
let cookieObj = {
    // ES6写法
    set(o){
        let cookieStr = document.cookie = o.name +'='+ JSON.stringify(o.value);
        if(o.expires){
            cookieStr += `;${o.expires}`;
        }
        if(o.path){
            cookieStr += `;${o.path}`;
        }
        if(o.domain){
            cookieStr += `;${o.domain}`;
        }
    },
    get(name){
        let newArr = document.cookie.split(';')
        for(let i=0;i<newArr.length;i++){
            let value = newArr[i].split('=');
            if(value[0] == name){
                return JSON.parse(value[1]);
            }
        }
    },
    remove(name,time){
        let date = new Date();
        date.setDate(date.getDate() + time);
        this.set({
            name:name,
            expires:date
        })
    }
}

