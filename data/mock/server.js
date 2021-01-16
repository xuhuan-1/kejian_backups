let http = require('http');
//node的服务器模块
let fs = require('fs');
//fs node的文件模块
let url = require('url');
  //请求路径和数据解析
  //引入轮播图数据
let sliders = require('./slider');
//将参数转换为串
var querystring = require('querystring');
//readFile 读取文件
// 读取文件 异步操作
function read(cb) {
  //相当于连接数据库
  fs.readFile('./good.json', 'utf8', function(err, data) {
    if (err || data.length == 0) {
      cb([]) //如果有错误 或者文件没长度就是空数组
    } else {
      cb(JSON.parse(data)) //将读出来的内容转化为对象
    }
  })
}
//writeFile 写入文件
function write(data, cb) {
  fs.writeFile('./good.json', JSON.stringify(data), cb)
}
// cros 代理 解决跨域
// 一页只显示5条数据
let size = 5;
http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-withCredentials', 'false');
    res.setHeader("Access-Control-Allow-Headers", "token,Authorization,x-requested-with,x-auth-token,Origin,X-Requested-With, Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By", ' 3.2.1');
    //让options尝试请求快速结束
    if (req.method == 'OPTIONS') return res.end('200');
      
    // 以上是跨域头
    let {
      pathname,
      query
    } = url.parse(req.url, true)
      // path 请求的路径
      //locoalhost:5000/page?page=3
    if (pathname === '/page') {
      res.setHeader('Content-type', 'application/json;charset=utf8');
      // page表示前端发来请求的第几页
      let page = parseInt(query.page) || 1;
      //是否还有下一页
      let hasmore = true;
      read(goods => {
        // 5 -  5      5
        // 0           4
        // 2           10
        // 5           9
        let totleNum = goods.length;
        let glist = goods.slice((page * size) - size, page * size);
        // redata  我们拿到的数组的最大值
        // goods.length 已有数组的最大值
        // redata>goods.length 证明没有数据了
        let redata = page * size;
        if (redata >= goods.length) {
          hasmore = false;
          res.end(JSON.stringify({
            totleNum,
            hasmore,
            glist: glist
          }))
        } else {
          res.end(JSON.stringify({
            hasmore,
            totleNum,
            glist: glist
          }))
        }
        return goods;
      })  
    }
    //获取所有user.json中数据
    if (pathname === '/allData') {
      res.setHeader('Content-type', 'application/json;charset=utf8');
      read(userData=>{
        // console.log(userData)
        res.end(JSON.stringify(userData))
      })
      return
    }
    //获取所有user.json中数据
    if (pathname === '/tableData') {
      res.setHeader('Content-type', 'application/json;charset=utf8');
      read(userData=>{
        // console.log(userData)
        res.end(JSON.stringify(userData))
      })
      return
    }

    //返回给前端的token字段
    if (pathname === '/getToken') {
      res.setHeader('Content-type', 'application/json;charset=utf8');
      var token = 'token='+'fsdhkfhsdkjhfldsjflksdhfjihdlsjk';
      res.end(JSON.stringify(token))
      return;
    }

    // 编辑接口
    if (pathname === '/edits') {
      let id = parseInt(query.id);
      // console.log(id)
      res.setHeader('Content-type', 'application/json;charset=utf8');
      read(goods=>{
        res.end(JSON.stringify(goods))
      })
      return;
    }

    if (pathname === '/slider') {
      res.setHeader('Content-type', 'application/json;charset=utf8');
      return res.end(JSON.stringify(sliders))
    }
    if (pathname === '/hot') {
      res.setHeader('Content-type', 'application/json;charset=utf8');
      read(goods => {
        let hotGood = goods.slice(0, 6);
        res.end(JSON.stringify(hotGood))
      })
      return
    }

    //修改商品接口
    if (pathname ==='/update') {
      // res.setHeader('Content-type', 'application/json;charset=utf8');
      let id = parseInt(query.id);
      let str = '';
      req.on('data',chunk => {
        str += chunk
      })
      req.on('end',()=>{
        let good = querystring.parse(str);
        // 改变id相等的那一项，返回一个新数组
        read(goods=>{
          goods=goods.map(item=>{
            if(item.id==id){
              return good
            }
            return item
          })
          write(goods,()=>{
            res.end(querystring.stringify(good))
          })
        })
      })
      return
    }


    //删除商品接口
    if (pathname === '/delegood') {
      res.setHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf8');
      let id = parseInt(query.id)
      read(goods=>{
        //arr.filter() 是数组新方法，返回一个符合条件的新数组
        goods = goods.filter(item=>item.id!==id);
        write(goods,()=>{
          res.end(JSON.stringify(goods))
        })
        // return goods;
      })
      return 
    }

    // 添加商品接口
    if (pathname === '/add') {
      res.setHeader('content-type', 'application/x-www-form-urlencoded;charset=utf8');
      let str = '';
      req.on('data', chunk => {
           str += chunk;
      })
      req.on('end', () => {
        let good = querystring.parse(str);
        read(function(goods) {
          let gl = goods.length;
          // good.id = gl?goods[gl-1].id+1:1;
          goods.push(good);
          write(goods, function() {
            res.end(querystring.stringify(good))
          })
        })
      })
      return
    }

    if (pathname === '/addUser') {
      res.setHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf8');
      let users = '';
      req.on('data', chunk => {
           users += chunk;
      })
      req.on('end', () => {
        let good = querystring.parse(users);
        read(function(goods) {
          let gl = goods.length;
          // good.id = gl?goods[gl-1].id+1:1;
          goods.push(good);
          write(goods, function() {
            res.end(querystring.stringify(good))
          })
        })
      })
      // return
    }

    if (pathname === '/alllist') {
      let id = parseInt(query.id)
      res.setHeader('Content-type', 'application/json;charset=UTF-8');
      if (id) {
        read(goods => {
          let good = goods.find(item => item.id === id)
          if (good) {
            res.end(JSON.stringify(good))
          } else {
            res.end(JSON.stringify({}))
          }
        })
      } else {
        read(goods => {
          res.end(JSON.stringify(goods))
        })
      }
      return
    }
     //读取静态文件
        // fs.stat('.' + pathname, function(err, stats) {

        //     if (err) {
        //         fs.createReadStream('index.html').pipe(res)
        //     } else {
        //         if (stats.isDirectory()) {


        //             let p = require('path').join('.' + pathname, './index.html')
        //             fs.createReadStream(p).pipe(res)
        //         } else {
        //             fs.createReadStream('.' + pathname).pipe(res)
        //       }
        //     }
        // })
  }).listen(3001,function(){
    console.log('Server is running at 3001')
  })
  //listen 后面是端口号