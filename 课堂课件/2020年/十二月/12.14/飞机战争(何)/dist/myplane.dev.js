"use strict";

function MyPlane() {
  this.x = 0;
  this.y = 0; //初始化时飞机的初始位置

  this.width = 66;
  this.height = 80; //我方飞机的宽高

  this.planeImg = null; //未来要创建飞机的容器标签  img标签

  this.imgUrl = './images/my.gif'; //是我的飞机路径

  this.bullUrl = './images/bullet1.png'; //子弹的路径

  this.bullSpeed = 10; //子弹移动的时间  10ms间隔内子弹就得向上移动1像素

  this.container = null; //装飞机的盒子

  this.bullHeight = 16; // 子弹自身的高度

  this.arrBull = []; //存放子弹的数组

  this.createBullTime = 300; //创建子弹的时间
}

; // 将方法封装到prototype中，可以在多处使用，一个方法，多地方使用 （封装公共方法）

MyPlane.prototype = {
  // 初始化方法，为了调用初始时所有的需要的方法
  init: function init() {
    // 创建飞机
    this.createPlane(); // 让飞机和鼠标一起移动 鼠标移动事件

    this.events(); // 创建子弹

    this.createBull(); // 子弹动起来

    this.moveBull(); // 删除子弹

    this.removeBull();
    var that = this;
    setInterval(function () {
      that.createBull();
      that.moveBull();
    }, this.createBullTime);
  },
  // 创建飞机的方法
  createPlane: function createPlane() {
    this.planeImg = document.createElement('img');
    this.planeImg.src = this.imgUrl;
    this.planeImg.style.cssText = "position:absolute;left:" + this.x + "px;top:" + this.y + "px;";
    this.container.appendChild(this.planeImg);
  },
  // 让飞机动起来，飞机跟随鼠标的移动而移动 鼠标移动事件 
  events: function events() {
    // 有兼容性 W3C浏览器的鼠标事件和IE浏览器的鼠标事件不一样  60-70%的市场是IE的 浪费
    var that = this;

    this.container.onmousemove = function (event) {
      // window.event:IE的鼠标事件函数
      // event:是标准浏览器的鼠标事件
      // 上面是为了处理兼容性
      var e = event || window.event; // 0<=x<=最大值
      // 0<=y<=最大值
      // that.width:飞机自身有的属性 

      var x = e.clientX - this.offsetLeft - that.width / 2;
      var y = e.clientY - this.offsetTop - that.height / 2; // 自定义的  动态的left值
      // 元素的宽度 = width + 内边距 + border
      // 元素的offsetWidth = width + 内边距 + border
      // Math.max(x,0)  x  限制x左侧边界
      // Math.min(x,this.offsetWidth - that.width) x 限制x右侧边界
      // Math.min(x,this.offsetWidth - that.width)   0<=x<= this.offsetWidth - that.width
      // this.offsetWidth - that.width 飞机活动最大范围 （距离）
      // 此时用Math的第二个参数就是一个判断条件

      that.planeImg.style.left = Math.max(Math.min(x, this.offsetWidth - that.width), 0) + "px";
      that.planeImg.style.top = Math.max(Math.min(y, this.offsetHeight - that.height), 0) + "px"; // that.planeImg.style.left = x +'px';
      // that.planeImg.style.top = y +'px';
    };
  },
  // 创建子弹
  createBull: function createBull() {
    this.bull = document.createElement('img');
    this.bull.src = this.bullUrl; // 飞机在盒子内距离左侧距离 + 飞机本身宽度

    this.bull.style.cssText = "position:absolute;left:" + (this.planeImg.offsetLeft + this.width / 2 - 2) + "px;top:" + (this.planeImg.offsetTop - 16) + "px;";
    this.container.appendChild(this.bull);
  },
  //子弹动起来
  moveBull: function moveBull() {
    var bull = this.bull;
    var that = this;
    this.arrBull.push(bull);
    this.bull.timer = setInterval(function () {
      //不能使用that    此时this指向window
      bull.style.top = bull.offsetTop - 1 + "px"; // 超出边界的判断

      if (bull.offsetTop <= 0 - that.bullHeight) {
        // 超出边界，关闭定时器  定时器不会主动的释放内存 必须手动释放
        clearInterval(bull.timer); //定时器指向window
        // 删除子弹

        that.arrBull.removeDom(bull); // 也删除子弹父级容器里面的子弹

        bull.parentNode.removeChild(bull);
      }
    }, this.bullSpeed);
    console.log(this.arrBull);
  },
  // 删除超出容器子弹这个元素
  removeBull: function removeBull() {
    Array.prototype.removeDom = function (item) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == item) {
          this.splice(i, 1);
        }
      }
    };
  }
};