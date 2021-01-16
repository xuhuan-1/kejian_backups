function getStyle(ele,name){
    return ele.currentStyle?ele.currentStyle[name]:getComputedStyle(ele,null)[name]
} //参数：元素、属性、目标位置、速度、函数
function move(ele,attr,target,speed,fn){
    clearInterval(ele.timer);
    //获取元素的当前位置
    let current = parseInt(getStyle(ele,attr));
    //判断是正值还是负值
    if(current > target){
        speed = -speed;
    }
    //定时器
    ele.timer = setInterval(function(){
        //获取元素的当前位置
        let old_left = parseInt(getStyle(ele,attr));
        //元素当前位置 + 速度
        let new_left = old_left + speed;
        //比如：元素位置：0   目标：800  速度：10
        //10 < 0负值      20 < 800正值              10 > 0正值    20 > 负值    
        if((speed < 0 && new_left < target) || (speed > 0 && new_left > target)){
            new_left = target;
        }
        ele.style[attr] = new_left + 'px';
        if(new_left == target){
            clearInterval(ele.timer);
            fn && fn()
        }
    },10)
}