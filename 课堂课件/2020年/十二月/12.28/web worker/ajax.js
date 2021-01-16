function ajax1(options) {
    options.method = options.method || 'get';
    options.data = options.data || {};
    options.url = options.url;  //必传
    options.success = options.success;  //必须传参
    options.dataType = options.dataType;
    // options.callback = options.callback;
    // 格式化参数的函数  get请求把参数拼接到url地址栏里面去，post请求参数直接在请求体发送
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return arr.join('&');
    }
    var params = formatParams(options.data);
    
    function jsonp(data){
        var callbackName = data.callback;
        var head = document.getElementsByTagName('head')[0];
        data.data['callback'] = callbackName;
        var script = document.createElement('script');
        head.appendChild(script);
        // 全局监听回调函数的返回值
        window[callbackName] = function(res){
            data.success && data.success(res);
            // html页面会缓存，请求成功之后，移除script，下次再请求是再去创建script
            head.removeChild(script);
            window[callbackName] = null;   
        }
        script.src = data.url + '?' + params;
    }
    function json(data){
        var xhr;
        XMLHttpRequest ? xhr = new XMLHttpRequest() : xhr = new ActiveXObject('Microsoft.XMLHTTP');

        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                data.method == 'get' ? data.success && data.success(JSON.parse(xhr.response)) : data.success && data.success(xhr.response);
            }
        }
        xhr.open(data.method, data.url, true);
        if (data.method == 'post') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf8');
            xhr.send(params);
        } else {
            data.url = data.url + '?' + params;
            xhr.setRequestHeader('Content-type', 'application/json;charset=utf8');
            xhr.send(null);
        }
    }
    options.dataType == 'jsonp' ? jsonp(options) : json(options);
}