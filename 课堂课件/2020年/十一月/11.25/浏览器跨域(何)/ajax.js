function ajax(url, method, data, dataType, success) {
  var url = url || "";
  var method = method || "get";
  var data = data || {};
  var dataType = dataType || "json";
  var success = success;

  // 2、建立连接
  function formate(o) {
    let arr = [];
    for (let key in o) {
      arr.push(key + "=" + o[key]);
    }
    return arr.join("&");
  }

  let params = formate(data);

  function jsonp(data) {
    var callbackName = data.callback;
    var head = document.getElementsByTagName("head")[0];
    data.data["callback"] = callbackName;
    var script = document.createElement("script");
    head.appendChild(script);
    // 全局监听回调函数的返回值
    window[callbackName] = function (res) {
      data.success && data.success(res);
      // html页面会缓存，请求成功之后，移除script，下次再请求是再去创建script
      head.removeChild(script);
      window[callbackName] = null;
    };
    script.src = data.url + "?" + params;
  }

  function json(data) {
    // 1、创建异步请求对象
    let xhr;
    window.XMLHttpRequest
      ? (xhr = new XMLHttpRequest())
      : (xhr = new ActiveXObject("Microsoft.XMLHTTP"));
    let baseURL = params ? url + "?" + params : url;

    if (method == "get") {
      xhr.open(method, baseURL, true);
    } else {
      xhr.open(method, url, true);
    }
    // 3、发送请求
    if (method == "get") {
      xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
      xhr.send(null);
    } else {
      // 请求头部
      xhr.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded;charset=utf-8"
      );
      xhr.send(params);
    }
    // 4、创建监听函数

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if ((xhr.status === 200 && xhr.status < 300) || xhr.status === 304) {
          if (method == "get") {
            success && success(JSON.parse(xhr.responseText));
          } else {
            success && success(xhr.responseText);
          }
        }
      }
    };
  }
  dataType === 'jsonp' ? jsonp(url, method, data, dataType, success):json(url, method, data, dataType, success);
}
