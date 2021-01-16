// 获取元素的当前样式
function getStyle(ele,attr){
    return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele,null)[attr];
}
// 动画  
// ele :代表运动的元素
// json :传进来的属性

function animate(ele,json,fn){
    clearInterval(ele.timer);
    ele.timer = setInterval(() => {
        var flag = true;
        
        for(var key in json){
            // 分三种情况去处理
            //  1、处理有像素的属性
            //  2、处理 透明度
            //  3、处理层级 zIndex
            if(key == 'zIndex'){
                ele.style[key] = json[key];
            }else if(key == 'opacity'){
                // 步长  (目标值-当前值)/10;
                var current = parseInt(getStyle(ele,key)*100);
                var step = (json[key]*100 - current)/10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                ele.style[key] = (current + step)/100;
            }else{
                // 步长  (目标值-当前值)/10;
                var current = parseInt(getStyle(ele,key));
                var step = (json[key] - current)/10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                ele.style[key] = current + step + 'px';
                if(json[key] != current){
                    // 永远改变成false
                    flag = false;
                }
            }
        }
        // 代表的是上一次执行完成
        if(flag){
            clearInterval(ele.timer)
            fn && fn();
        }
    }, 20);

}







