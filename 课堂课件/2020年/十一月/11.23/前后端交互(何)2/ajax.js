// 


function ajax(obj){
    obj.url = obj.url || '';
    obj.method = obj.method || 'get';
    obj.data = obj.data || {};
    obj.dataType = obj.dataType || 'json';
    obj.success = obj.success;

    // 1、创建异步请求对象
    let xhr;
    window.XMLHttpRequest ? xhr = new XMLHttpRequest() : xhr = new ActiveXObject("Microsoft.XMLHTTP");

    // 2、建立连接
    function formate(o){
        let arr = [];
        for(let key in o){
            arr.push(key +'='+ o[key])
        }
        return arr.join('&');
    }
    let params = formate(obj.data);
    let url = obj.url + '?' + params;

    if(obj.method == 'get'){
        xhr.open(obj.method,url,true);
    }else{
        xhr.open(obj.method,obj.url,true);
    }
    
    // 3、发送数据
    if(obj.method == 'get'){
        xhr.setRequestHeader('Content-type','application/json;charset=utf-8');
        xhr.send(null);
    }else{
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded;charset=utf-8')
        xhr.send(params);  // 请求体 里面
    }

    // 4、注册监听函数 onreadystatechange
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200 && xhr.status< 300 || xhr.status == 304){
                if(obj.method == 'get'){
                    obj.success && obj.success(JSON.parse(xhr.responseText));
                }else{
                    obj.success && obj.success(xhr.responseText);
                }
            }
        }
    }
}
// ajax({
//     url:'http://localhost:3001/add',
//     data:{username:'剑哥哥',age:16},
//     method:'post',
//     success:function(res){
//         console.log(res)
//     }
// })
//[username='剑哥哥',age=16]