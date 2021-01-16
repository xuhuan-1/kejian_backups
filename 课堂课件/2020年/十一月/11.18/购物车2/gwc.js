/**
 * 思路：
 * 1、获取最新的cookie数据 渲染页面
 * 2、获取需要操作的元素
 * 3、加 减 删按钮事件
 * 4、全选 反选 
 * 5、小计功能 单价*数量
 * 6、总价共能
 */
//获取元素
//tbody
let tbody = document.querySelector('tbody'),
//购物车里没有任何商品
box = document.querySelector('.box'),
//表格
show = document.querySelector('.show');
let list = getAllData();
if(list.length == 0){
    box.style.display = 'block';
    show.style.display = 'none';
}else{
    box.style.display = 'none';
    show.style.display = 'block';
    //创建DOM片段
    let domFragment = document.createDocumentFragment();
    for(let i=0;i<list.length;i++){
        //创建tr
        let tr = document.createElement('tr');
        tr.setAttribute('pid',list[i].pid);
        tr.innerHTML = `<td>
                            <input type="checkbox" class="ck"/>
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
                            ￥<span class="price">${list[i].price}</span>
                        </td>
                        <td>
                            ￥<span class="xiaoji">${list[i].price * list[i].pCount}</span>
                        </td>
                        <td>
                            <button class="del">X</button>
                        </td>`;
        domFragment.appendChild(tr);
    }
    tbody.appendChild(domFragment)
}
//全选按钮
let allCheck = document.getElementById('allCheck');
// tbody 里所有的单选框按钮
let ck = document.querySelectorAll('.tbody .ck');
allCheck.onchange = function(){
    for(let i=0;i<ck.length;i++){
        if(allCheck.checked){
            ck[i].checked = true;
        }else{
            ck[i].checked = false;
        }
    }
    //总价格
    totalPrice.innerHTML = total();
}
//封装反选按钮
function checkedSelect(){
    ck = document.querySelectorAll('.tbody .ck');
    let trueAllCheck = true;
    for(let i=0;i<ck.length;i++){
        if(!ck[i].checked){
            trueAllCheck = false;
        }
    }
    allCheck.checked = trueAllCheck;
}
//监听
for(let i=0;i<ck.length;i++){
    ck[i].onchange = function(){
        checkedSelect();
        //总价格
        totalPrice.innerHTML = total();
    }
}
//总价格
function total(){
    let all = 0;
    let xiaoji = document.querySelectorAll('.xiaoji');
    for(let i=0;i<xiaoji.length;i++){
        if(ck[i].checked){
            all += Number(xiaoji[i].innerText);
        }
    }
    return all;
}
//获取加 减 删除 按钮
let up = document.querySelectorAll('.up'),
down = document.querySelectorAll('.down'),
del = document.querySelectorAll('.del');
for(let i=0;i<up.length;i++){
    //加事件
    up[i].onclick = function(){
        //tr
        let tr = this.parentNode.parentNode;
        //货物id
        let pid = tr.getAttribute('pid');
        //数量
        let inp = this.previousElementSibling;
        //单价
        let price = tr.querySelector('.price'),
        //小计
        xiaoji = tr.querySelector('.xiaoji');
        inp.value++;
        list = addPcount(pid,1);
        //计算小计
        xiaoji.innerText = inp.value * price.innerText;
        let trParent = tr.querySelector('td').querySelector('input');
        trParent.checked = true;
        //反选按钮方法
        checkedSelect()
        //总价格
        totalPrice.innerHTML = total();
    }
    //减事件
    down[i].onclick = function(){
        //tr
        let tr = this.parentNode.parentNode;
        //货物id
        let pid = tr.getAttribute('pid');
        //数量
        let inp = this.nextElementSibling;
        //单价
        let price = tr.querySelector('.price'),
        //小计
        xiaoji = tr.querySelector('.xiaoji');
        if(inp.value <= 1){
            inp.value = 1;
            list = addPcount(pid,0);
        }else{
            inp.value--;
            list = addPcount(pid,-1);
            //计算小计
            xiaoji.innerText = inp.value * price.innerText;
        }
        let trParent = tr.querySelector('td').querySelector('input');
        trParent.checked = true;
        //反选按钮方法
        checkedSelect()
        //总价格
        totalPrice.innerHTML = total();
    }
    //删除事件
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
        checkedSelect()
        //总价格
        totalPrice.innerHTML = total();
    }
}