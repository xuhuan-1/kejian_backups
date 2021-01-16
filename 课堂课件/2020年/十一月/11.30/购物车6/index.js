let btn = document.querySelectorAll('button'),
ccount = document.querySelector('#ccount');
let list = getAllData();
if(!list){
    cookie.set({
        name:'data',
        value:[]
    })
    list = cookie.get('data');
}
for(let i=0;i<btn.length;i++){
    btn[i].onclick = function(){
        let dl = this.parentNode.parentNode;
        let pid = dl.getAttribute('pid');
        let pName = dl.querySelectorAll('dd')[0].innerText,
        info = dl.querySelectorAll('dd')[1].innerText,
        price = dl.querySelectorAll('dd')[2].querySelector('span').innerText,
        imgSrc = dl.querySelector('dt').querySelector('img').src,
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
            list = upDataCookie(list);
        }
        ccount.innerText = allGoodsPcount();
    }
}