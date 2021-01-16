//获取元素
let btn = document.querySelectorAll('button'),
ccount = document.getElementById('ccount');
let list = getAllData();
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
        //id
        let pid = dl.getAttribute('pid');
        //名称
        let pName = dl.querySelectorAll('dd')[0].innerText,
        //描述
        info = dl.querySelectorAll('dd')[1].innerText,
        //价格
        price = dl.querySelectorAll('dd')[2].querySelector('span').innerText,
        //图片
        imgSrc = dl.querySelector('dt').querySelector('img').src,
        pCount = 1;
        if(checkByPid(pid)){
            list = addPcount(pid,1);
        }else{
            let obj = {
                pid:pid,
                pName:pName,
                info:info,
                price:price,
                imgSrc:imgSrc,
                pCount:pCount
            }
            list.push(obj);
            list = upDataCookie(list);
        }
        ccount.innerText = totalPcount();
    }
}
