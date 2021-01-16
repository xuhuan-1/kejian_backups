//封装cookie 数据
/*依据：
    document.cookie = "name=value[;expires=date]
    [;path=path-to-source][;domain=域名][;secure]";
*/
let cookieObj = {
    set(o){
        let cookieStr = document.cookie = o.name + '=' + JSON.stringify(o.value);
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
        let newArr = document.cookie.split(';');
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