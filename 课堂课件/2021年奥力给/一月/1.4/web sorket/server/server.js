const express = require('express')
// express:应用，可以直接调用
const app = express();
const expressWs = require('express-ws')
// 引入模块
const websocket = require('./websocket')
// 将express应用融合到express和websocket中
expressWs(app);
// 将最后的结果导入到client文件夹中
app.use(express.static('client'))
// ws://localhost:3000/websocket/test
// ws://localhost:3000/websocket/allData
// 使用当前接口  /websocket 公共路径
app.use('/websocket', websocket)
app.get('*', (req, res) => {})
app.listen(3004, () => {
  console.log('server is listening on port 3004')
})

