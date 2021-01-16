/**
 * 思路：
 * 1、获取最新的cookie数据 渲染页面
 * 2、获取需要操作的DOM元素
 * 3、加 减 删 按钮事件
 * 4、全选 反选事件
 * 5、小计
 * 6、总计
 */

//获取DOM元素
//table表格
let show = document.querySelector('.show'),
//购物车里没有任何商品
box = document.getElementById('box'),
//tbody
tbody = document.querySelector('.tbody');
let list = getAllData();
if(list.length == 0){
    box.style.display = 'block';
    show.style.display = 'none';
}else{
    box.style.display = 'none';
    show.style.display = 'block';
    let domFragment = document.createDocumentFragment();
    for(let i=0;i<list.length;i++){
        let tr = document.createElement('tr');
        tr.setAttribute('pid',list[i].pid);
        tr.innerHTML = `<td>
                            <input class="ck" type="checkbox"/>
                        </td>
                        <td>${list[i].pid}</td>
                        <td>
                            <img src="${list[i].imgSrc}"/>
                        </td>
                        <td>${list[i].info}</td>
                        <td>
                            <button class="down">-</button>
                            <input type="text" value="${list[i].pCount}"/>
                            <button class="up">+</button>
                        </td>
                        <td>
                            ￥<span>${list[i].price}</span>
                        </td>
                        <td>
                            ￥<span class="xj">${list[i].pCount * list[i].price}</span>
                        </td>
                        <td>
                            <button class="del">删除</button>
                        </td>`;
        domFragment.appendChild(tr);
    }
    tbody.appendChild(domFragment);
}
//全选事件
let allCheckbox = document.getElementById('allCheck'),
ck = tbody.querySelectorAll('.ck');
allCheckbox.onclick = function(){
    for(let i=0;i<ck.length;i++){
        if(allCheckbox.checked){
            ck[i].checked = true;
        }else{
            ck[i].checked = false;
        }
    }
    //总价格
    totalPrice.innerText = total();
}
//封装反选事件
function checkedAll(){
    let ck = tbody.querySelectorAll('.ck');
    let trueAllChecked = true;
    for(let i=0;i<ck.length;i++){
        if(ck[i].checked == false){
            trueAllChecked = false;
        }
    }
    allCheckbox .checked = trueAllChecked;
}
//监听
for(let i=0;i<ck.length;i++){
    ck[i].onclick = function(){
        checkedAll();
        //总价格
        totalPrice.innerText = total();
    }
}
//加 减 删
let up = document.querySelectorAll('.up'),
down = document.querySelectorAll('.down'),
del = document.querySelectorAll('.del');
for(let i=0;i<up.length;i++){
    //加事件
    up[i].onclick = function(){
        let tr = this.parentNode.parentNode;
        let pid = tr.getAttribute('pid');
        //单价
        let price = tr.querySelectorAll('td')[5].querySelector('span'),
        //小计
        xiaoji = tr.querySelectorAll('td')[6].querySelector('span');
        //数量
        let inp = this.previousElementSibling;
        inp.value++;
        addPcount(pid,1);
        //小计
        xiaoji.innerText = price.innerText * inp.value;
        //复选框
        tr.querySelector('td').querySelector('input').checked = true;
        //反选按钮方法
        checkedAll();
        //总价格
        totalPrice.innerText = total();
    };
    //减事件
    down[i].onclick = function(){
        let tr = this.parentNode.parentNode;
        let pid = tr.getAttribute('pid');
        //数量
        let inp = this.nextElementSibling,
        //单价
        price = tr.querySelectorAll('td')[5].querySelector('span'),
        //小计
        xiaoji = tr.querySelectorAll('td')[6].querySelector('span');
        if(inp.value <= 1){
            inp.value = 1;
            addPcount(pid,0);
        }else{
            inp.value--;
            addPcount(pid,-1);
            //小计
            xiaoji.innerText = price.innerText * inp.value;
        }
        //复选框
        tr.querySelector('td').querySelector('input').checked = true;
        //反选按钮方法
        checkedAll();
        //总价格
        totalPrice.innerText = total();
    };
    //删事件
    del[i].onclick = function(){
        let tr = this.parentNode.parentNode;
        let pid = tr.getAttribute('pid');
        tr.remove();
        list = removeCookie(pid);
        if(list.length == 0){
            box.style.display = 'block';
            show.style.display = 'none';
        }
        //反选按钮方法
        checkedAll();
        //总价格
        totalPrice.innerText = total();
    };
    //总价格
    function total(){
        let all = 0;
        let tr = tbody.querySelectorAll('tr');
        for(let i=0;i<tr.length;i++){
            let td = tr[i].querySelectorAll('td')[6];
            let span = td.querySelector('span');
            if(ck[i].checked){
                all += parseInt(span.innerText);
            }
        }
        return all;
    }
}