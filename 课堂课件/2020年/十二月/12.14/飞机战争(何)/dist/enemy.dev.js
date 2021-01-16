"use strict";

// 敌方飞机
function Enemy() {
  this.x = 0;
  this.y = 0;
  this.width = 34;
  this.height = 24;
  this.speedTime = 20;
  this.fly1 = './images/enemy1_fly_1.png';
  this.boomUrl = './images/enemy1_fly_3.gif';
  this.bullList = []; //存放子弹的数组

  this.container = null;
  this.boomTime = 400;
  this.createTime = 1000; //创建飞机的时间
} // 只要一个敌机放入容器内，并向下移动（速度是动态） X：X坐标随机


Enemy.prototype = {
  init: function init() {
    this.createPlane();
    this.movePlane();
    var that = this;
    setInterval(function () {
      that.createPlane();
      that.movePlane();
    }, this.createTime);
  },
  // 创建敌机功能完成
  createPlane: function createPlane() {
    this.enemy = document.createElement('img');
    this.enemy.src = this.fly1; // Math.random():返回的是0-1之间的随机数，不包括 0和1
    // this.x:在最大范围内随机出现飞机
    // y:保证飞机从顶端飞入

    var y = this.y - this.height;
    this.x = parseInt((this.container.offsetWidth - this.width) * Math.random()); //有边界    随机数

    this.enemy.style.cssText = "position:absolute;left:" + this.x + "px;top:" + y + "px";
    this.container.appendChild(this.enemy);
  },
  // 移动敌机
  movePlane: function movePlane() {
    // 敌机向下移动的随机速度   速度是动态的   
    // parseInt():可以将字符串转数字，可以接收两个参数，parseInt()
    var speed = parseInt(Math.random() * 3) + 2;
    var that = this;
    var enemy = this.enemy;
    this.enemy.flag = true; //为true时代表飞机和子弹碰撞了   标识

    this.enemy.timer = setInterval(function () {
      // 让飞机下降的速度变的随机
      enemy.style.top = enemy.offsetTop + speed + "px"; // 如果飞机飞入容器底部，则清除定时器，移除敌机

      if (enemy.offsetTop >= enemy.parentNode.offsetHeight) {
        // 关闭定时器
        clearInterval(enemy.timer); // 移除敌机这个DOM元素

        enemy.parentNode.removeChild(enemy);
      }

      ; // 循环每个子弹，碰撞飞机，换图片（爆炸），移除敌机，关闭定时器

      for (var i = 0; i < that.bullList.length; i++) {
        var bull = that.bullList[i]; // 双保险   两个判断 ，
        // 1、判断子弹x轴坐标在飞机宽度内 
        // 2、判断子弹的y轴在飞机的高度内  碰撞

        if (bull.offsetLeft + bull.offsetWidth > enemy.offsetLeft && bull.offsetLeft < enemy.offsetLeft + enemy.offsetWidth) {
          if (bull.offsetTop + bull.offsetHeight > enemy.offsetTop && bull.offsetTop < enemy.offsetTop + enemy.offsetHeight) {
            // 子弹已经在飞机区域内了 
            // 自出子弹的定时器
            clearInterval(bull.timer); // 移除子弹

            bull.parentNode.removeChild(bull); // 判断为真 时，则替换图片 又一次确定子弹和飞机发生了碰撞

            if (enemy.flag) {
              enemy.flag = false;
              enemy.src = that.boomUrl;
              setInterval(function () {
                // 后面处理
                enemy.parentNode.removeChild(enemy);
              }, that.boomTime);
              clearInterval(enemy.timer);
            }
          }
        }
      }
    }, this.speedTime);
  }
}; // 敌机二的构造函数

function Enemy1() {
  // 继承Enemy构造函数内所有属性
  Enemy.call(this);
  this.width = 46;
  this.height = 60; // 修改飞机图片 

  this.fly1 = './images/enemy2_fly_1.png';
  this.boomUrl = './images/enemy2_fly_3.gif';
} // 将Enemy的原型方法全部继承下来给Enemy1飞机


Enemy1.prototype = Enemy.prototype; // // 敌机三的构造函数

function Enemy2() {
  Enemy.call(this);
  this.width = 110;
  this.height = 164;
  this.fly1 = './images/enemy3_fly_1.png';
  this.boomUrl = './images/enemy3_fly_3.gif';
}

Enemy2.prototype = Enemy.prototype; // 今天的作业：
//     1、完成游戏  
//     2、复习咱们学过的知识点