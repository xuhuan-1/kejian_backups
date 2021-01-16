// 服务端框架  Nodejs中的框架  express koa egg
const express = require('express');
// 把express和websocket进行融合
const expressWs = require('express-ws')
// 路由可以声明接口路径
const router = express.Router()
// 使用路由接口
expressWs(router);
// 声明了一个/test接口
router.ws('/test', (ws, req) => {
  ws.send('连接成功')
  // let interval
  // interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify([1,2,3,4]))
    } else {
      // clearInterval(interval)
    }
  // }, 1000)

  ws.on('message', msg => {
    ws.send(msg)
  })
})

// router.ws('/allData',(ws,req) =>{

// })

module.exports = router
