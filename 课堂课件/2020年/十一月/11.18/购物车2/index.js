/**
 * 思路：
 * 1、获取所需要的元素
 * 2、点击加入购物车，判断【如果cookie中已经有当前商品了，则数量+1】
 *     否则手动添加当前商品的所有信息到cookie中
 * 3、添加过程中，计算出cookie中总数量 给ccount进行赋值
 */

//获取元素
let btn = document.querySelectorAll('button'),
ccount = document.getElementById('ccount');
let list = getAllData();
console.log(list);
if(!list){
    cookieObj.set({
        name:'data',
        value:[]
    })
    list = cookieObj.get('data');
}
for(let i=0;i<btn.length;i++){
    btn[i].onclick = function(){
        let dl = this.parentNode.parentNode;
        //商品id
        let pid = dl.getAttribute('pid');
        //名称
        let pName = dl.querySelectorAll('dd')[0].innerText,
        //描述
        info = dl.querySelectorAll('dd')[1].innerText,
        //价格
        price = dl.querySelectorAll('dd')[2].querySelector('span').innerText,
        //图片
        imgSrc = dl.querySelector('dt').querySelector('img').src;
        //数量
        pCount = 1;
        if(checkByPid(pid)){
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
        ccount.innerText = getTotalPcount()
    }
}
