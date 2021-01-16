function ajax(obj) {
    obj.url = obj.url || '';
    obj.method = obj.method || 'get';
    obj.data = obj.data || {};
    obj.dataType = obj.dataType || 'json';
    obj.success = obj.success;
    //创建异步请求对象
    let xhr;
    window.XMLHttpRequest ? xhr = new XMLHttpRequest() : xhr = new ActiveXObject('Microsoft.XMLHTTP');
    //建立连接
    function formate(o) {
        let arr = [];
        for (let key in o) {
            arr.push(key + '=' + o[key]);
        }
        return arr.join('&');
    }
    let params = formate(obj.data);
    let url = obj.url + '?' + params;
    if (obj.method == 'get') {
        xhr.open(obj.method, url, true);
    } else {
        xhr.open(obj.method, obj.url, true);
    }
    //发送/请求数据
    if (obj.method == 'get') {
        xhr.setRequestHeader('Content-type', 'application/json;charset = utf-8');
        xhr.send(null);
    } else {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded,charset = utf-8');
        xhr.send(params);
    }
    //注册监听函数
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 && xhr.status < 300 || xhr.status == 304) {
                if (obj.method == 'get') {
                    obj.success && obj.success(JSON.parse(xhr.responseText));
                } else {
                    obj.success && obj.success(xhr.responseText);
                }
            }
        }
    }
}