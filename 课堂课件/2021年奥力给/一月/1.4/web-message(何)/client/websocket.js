// 获取需要操作的DOM元素
let receiveBox = document.getElementById('receive-box'),
    sendBox = document.getElementById('msg-need-send'),
    sendBtn = document.getElementById('send-btn'),
    exit = document.getElementById('exit');

// 连接服务器 通过实例化
let ws = new WebSocket('ws://localhost:3004/websocket/test');

// 监听是否连接成功
ws.onopen = () =>{
    console.log(`您的连接状态是：${ws.readyState}`);
}
// 传输数据
ws.onmessage = (e) =>{
    console.log(e);
    // let message = JSON.parse(e.data);
    let message = e.data;
    receiveBox.innerHTML += `<p>${message}</p>`;
    // 设置滚动条 behavior:'smooth' 让滚动条滑动的时候更圆滑
    receiveBox.scrollTo({
        top:receiveBox.scrollHeight,
        behavior:'smooth'
    })
}

sendBtn.onclick = () =>{
    ws.send(sendBox.value);
}

// 监听关闭
ws.onclose = (e) =>{
    console.log('WebSocket连接已关闭');
}
//手动关闭连接 
exit.onclick = function(){
    ws.close();
}

