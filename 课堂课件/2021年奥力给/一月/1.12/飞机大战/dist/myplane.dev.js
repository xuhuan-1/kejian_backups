"use strict";

function MyPlane() {
  // 初始化时飞机的初始位置
  this.x = 0;
  this.y = 0; // 我方飞机的宽高

  this.width = 66;
  this.height = 80; // 未来要创建飞机的容器标签     img标签

  this.planeImg = null; // 飞机的路径

  this.imgUrl = './images/my.gif'; // 子弹的路径

  this.bullUrl = './images/bullet1.png'; // 子弹移动的时间，10ms间隔子弹向上移动1px;

  this.bullSpeed = 10; // 装飞机的盒子

  this.container = null; // 子弹自身的高度

  this.bullHeight = 16; // 存放子弹的数组

  this.arrBull = []; // 创建子弹的时间

  this.createBullTime = 300;
}

MyPlane.prototype = {
  // 初始化方法，为了调用初始化时所有需要的方法
  init: function init() {
    // 创建飞机
    this.createPlane(); // 飞机随着鼠标移动

    this.events(); // 创建子弹

    this.createBull(); // 让子弹动起来

    this.moveBull(); // 删除子弹

    this.removeBull(); // 一直调用 创建子弹 和 让子弹动起来方法

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
    this.planeImg.style.cssText = "position: absolute; left: ".concat(this.x, "px;top: ").concat(this.y, "px;");
    this.container.appendChild(this.planeImg);
  },
  // 飞机跟着鼠标移动的方法     鼠标移动事件
  events: function events() {
    var that = this;

    this.container.onmousemove = function (e) {
      var eve = e.event || window.event; // 飞机X轴的位置 = 鼠标X轴的位置 - 背景距离左侧的距离 - 飞机宽度的一半

      var x = eve.clientX - this.offsetLeft - that.width / 2; // 飞机Y轴的位置 = 鼠标Y轴的位置 - 背景距离顶部的距离 - 飞机宽度的一半

      var y = eve.clientY - this.offsetTop - that.height / 2; // 飞机盒子的位置

      that.planeImg.style.left = Math.max(Math.min(x, this.offsetWidth - that.width), 0) + 'px';
      that.planeImg.style.top = Math.max(Math.min(y, this.offsetHeight - that.height), 0) + 'px';
    };
  },
  // 创建子弹的方法
  createBull: function createBull() {
    this.bull = document.createElement('img');
    this.bull.src = this.bullUrl; // 

    this.bull.style.cssText = "position: absolute; left: ".concat(this.planeImg.offsetLeft + this.width / 2 - 2, "px; top: ").concat(this.planeImg.offsetTop - 16, "px;");
    this.container.appendChild(this.bull);
  },
  // 让子弹动起来的方法
  moveBull: function moveBull() {
    // 子弹
    var bull = this.bull; // 我方飞机实例对象

    var that = this; // 把子弹收集在数组里

    this.arrBull.push(bull);
    this.bull.timer = setInterval(function () {
      bull.style.top = bull.offsetTop - 1 + 'px'; // 超出界限的判断
      // 当子弹距离顶端的距离< 0 - 子弹的高度时

      if (bull.offsetTop <= 0 - that.bullHeight) {
        // 清除定时器，定时器不会主动释放内存，必须手动释放
        clearInterval(bull.timer); // 删除子弹img

        that.arrBull.removeDom(bull); // 删除子弹父级容器里面的子弹

        bull.parentNode.removeChild(bull);
      }
    }, this.bullSpeed);
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