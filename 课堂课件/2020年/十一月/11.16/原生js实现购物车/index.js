// 商品列表功能

/**
 * 思路：
 *  1、获取所需要的元素
 *  2、点击添加购物车，判断【如果cookie中已经有当前商品了，则数量+1】
 *     否则手动添加当前商品的所有信息到cookie中
 *  3、添加过程中，计算出cookie中总数量 给ccount进行赋值
 * 
*/

let ccount = document.getElementById('ccount');
let btn = document.querySelectorAll('button');

// 初始化cookie
let list = getAllData();
if(!list){
    cookieObj.set({
        name:'data',
        value:[]
    });
    list = cookieObj.get('data');
}

// 初始化总数量
ccount.innerText = getTotalPcount();

for(let i=0;i<btn.length;i++){
    btn[i].onclick = function(){
        let dl = this.parentNode.parentNode,
        pid = dl.getAttribute('pid'),
        pName = dl.querySelectorAll('dd')[0].innerText,
        info =  dl.querySelectorAll('dd')[1].innerText,
        price =  dl.querySelectorAll('dd')[2].firstElementChild.innerText,
        imgSrc = dl.querySelector('dt').firstElementChild.src,
        pCount = 1;
        if(checkByPid(pid)){
            // 赋值
            list = addPcount(pid,1);
        }else{
            let obj = {
                pid,
                pName,
                info,
                price,
                imgSrc,
                pCount
            }
            list.push(obj);
            list = upDateCookie(list);
        }
        ccount.innerText = getTotalPcount();
    }
}



