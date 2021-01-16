/**
 * 思路：
 * 1、获取cookie数据渲染页面
 * 2、获取需要操作的DOM元素
 * 3、加 减 删 事件
 * 4、小计
 * 5、总计
 * 6、全选、反选事件
 */
//获取元素
let show = document.querySelector('.show'),
tbody = document.querySelector('.tbody'),
box = document.querySelector('.box');
let list = getAllData();
if(list.length == 0){
    box.style.display = 'block';
    show.style.display = 'none';
}else{
    box.style.display = 'none';
    show.style.display = 'block'
    let createFragment = document.createDocumentFragment();
    for(let i=0;i<list.length;i++){
        let tr = document.createElement('tr');
        tr.setAttribute('pid',list[i].pid);
        tr.innerHTML = `<td>
                            <input type="checkbox"/>
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
                            ￥<span>${list[i].pCount * list[i].price}</span>
                        </td>
                        <td>
                            <button class="del">删除</button>
                        </td>`
        createFragment.appendChild(tr);
    }
    tbody.appendChild(createFragment);
}
//全选事件
let allCheck = document.querySelector('#allCheck'),
ck = tbody.querySelectorAll('input[type="checkbox"]');
allCheck.onclick = function(){
    for(let i=0;i<ck.length;i++){
        if(allCheck.checked){
            ck[i].checked = true;
        }else{
            ck[i].checked = false;
        }
    }
    totalPrice.innerText = total();
}
//封装反选事件
function reverseSelect(){
    let trueAllcheck = true;
    ck = tbody.querySelectorAll('input[type="checkbox"]');
    for(let i=0;i<ck.length;i++){
        if(ck[i].checked == false){
            trueAllcheck = false;
        }
    }
    allCheck.checked = trueAllcheck;
}
//监听
for(let i=0;i<ck.length;i++){
    ck[i].onclick = function(){
        reverseSelect();
        totalPrice.innerText = total();
    }
}
//总价格
function total(){
    let tr = tbody.querySelectorAll('tr');
    let all = 0;
    for(let i=0;i<tr.length;i++){
        let td = tr[i].querySelectorAll('td')[6].querySelector('span');
        if(ck[i].checked){
            all += parseInt(td.innerText);
        }
    }
    return all;
}

//获取加减删
let up = document.querySelectorAll('.up'),
down = document.querySelectorAll('.down'),
del = document.querySelectorAll('.del');
for(let i=0;i<up.length;i++){
    //加事件
    up[i].onclick = function(){
        let tr = this.parentNode.parentNode;
        //商品id
        let pid = tr.getAttribute('pid');
        //数量
        let inp = this.previousElementSibling,
        //单价
        price = tr.querySelectorAll('td')[5].querySelector('span'),
        //小计
        xioaji = tr.querySelectorAll('td')[6].querySelector('span');
        inp.value++;
        addPcount(pid,1);
        //计算小计
        xioaji.innerText = price.innerText * inp.value;
        //反选事件方法
        tr.querySelector('td').querySelector('input').checked = true;
        reverseSelect();
        totalPrice.innerText = total();
    };
    //减事件
    down[i].onclick = function(){
        let tr = this.parentNode.parentNode;
        //商品id
        let pid = tr.getAttribute('pid');
         //数量
        let inp = this.nextElementSibling,
        //单价
        price = tr.querySelectorAll('td')[5].querySelector('span'),
        //小计
        xioaji = tr.querySelectorAll('td')[6].querySelector('span');
        if(inp.value <= 1){
            inp.value = 1;
            addPcount(pid,0)
        }else{
            inp.value--;
            addPcount(pid,-1)
            //计算小计
            xioaji.innerText = price.innerText * inp.value;
        }
        //反选事件方法
        tr.querySelector('td').querySelector('input').checked = true;
        reverseSelect();
        totalPrice.innerText = total();
    }
    //删除
    del[i].onclick = function(){
        let list = getAllData();
        let tr = this.parentNode.parentNode;
        //商品id
        let pid = tr.getAttribute('pid');
        tr.remove();
        list = removeCookie(pid);
        if(list.length == 0){
            box.style.display = 'block';
            show.style.display = 'none';
        }
        //反选事件方法
        reverseSelect();
        totalPrice.innerText = total();
    }
}