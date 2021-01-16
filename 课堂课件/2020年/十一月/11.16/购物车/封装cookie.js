let cookieObj = {
    //设置
    set:function(o){
        let cookieStr = document.cookie = o.name+'='+JSON.stringify(o.value);
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
    //获取
    get:function(name){
        let newArr = document.cookie.split(';');
        for(let i=0;i<newArr.length;i++){
            let value = newArr[i].split('=');
            if(value[0] == name){
                return JSON.parse(value[1]);
            }
        }
    },
    //删除
    remove:function(name,time){
        let date = new Date();
        date.setDate(date.getDate() + time);
        this.set({
            name:name,
            expires:date,
        })
    }
}