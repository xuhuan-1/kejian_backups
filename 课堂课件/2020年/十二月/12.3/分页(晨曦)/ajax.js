function ajax(o){
    o.method = o.method || 'get';
    o.url = o.url || '';
    o.data = o.data || {};
    o.dataType = o.dataType || 'json';
    o.success = o.success ;

    let xhr;
    xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    
    function urlChange(data){
        let arr = [];
        for(let key in data){
            arr.push(key +'='+ data[key]);
        }
        return arr.join('&')
    }
    let params = urlChange(o.data);
    let url = o.url +'?'+ params;
    if(o.method == 'get'){
        xhr.open(o.method,url,true);
        xhr.setRequestHeader('Content-type','application/json;charset=utf-8');
        xhr.send(null);
    }else{
        xhr.open(o.method,o.url,true);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded;charset=utf-8');
        xhr.send(params);
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState ==4){
            if(xhr.status == 200 && xhr.status < 300 || xhr.status == 304){
                if(o.method == 'get'){
                    o.success && o.success(JSON.parse(xhr.responseText));
                }else{
                    o.success && o.success(xhr.responseText);
                }
            }
        }
    }
}