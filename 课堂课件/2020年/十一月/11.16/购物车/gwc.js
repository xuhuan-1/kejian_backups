/**
 * 1、获取最新的cookie数据 渲染页面
 * 2、获取需要操作的元素
 * 3、全选、反选功能。全选或者反选时，计算出总价
 * 4、小计功能：单价 * 数量
 * 5、加、减按钮功能，
 * 6、总价功能
 * 7、删除功能
 */
//获取元素
//table表格
let show = document.querySelector('.show'),
box = document.querySelector('.box'),
tbody = document.getElementById('tbody');
let list = getAllData();
if(list.length == 0){
    show.style.display = 'none';
    box.style.display = 'block';
}else{
    show.style.display = 'block';
    box.style.display = 'none';
    //创建DOM片段
    let trFrame = document.createDocumentFragment();
    //创建
    for(let i=0;i<list.length;i++){
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
                            <input type="text" value="${list[i].pCount}"readonly="readonly"/>
                            <button class="up">+</button>
                        </td>
                        <td>
                            ￥<span class="price">${list[i].price}</span>
                        </td>
                        <td>
                            ￥<span class="xiaoji">${list[i].price * list[i].pCount}</span>
                        </td>
                        <td>
                            <input type="button" value="X" class="del"/>
                        </td>`
        trFrame.appendChild(tr);
    }
    tbody.appendChild(trFrame);
}
//全选按钮
allChecked = document.getElementById('allCheck');
//全选事件
// tbody 里所有的单选框按钮
let ck = document.querySelectorAll('.tbody .ck');
allChecked.onchange = function(){
    //全选事件
    for(let i=0;i<ck.length;i++){
        if(allChecked.checked){
            ck[i].checked = true;
        }else{
            ck[i].checked = false;
        }
    }
    //总价格方法
    totalPrice.innerHTML = totalPrices();
}
//封装反选按钮
function checkedSelect(){
    ck = document.querySelectorAll('.tbody .ck');
    let falsechecked = true;
    for(let i=0;i<ck.length;i++){
        if(!ck[i].checked){
            falsechecked = false;
        }
    }
    allChecked.checked = falsechecked;
}
//监听
for(let i=0;i<ck.length;i++){
    ck[i].onchange = function(){
        checkedSelect();
        //总价格方法
        totalPrice.innerHTML = totalPrices();
    }
}
//计算总价
function totalPrices(){
    let all = 0;
    let xiaoji = document.querySelectorAll('.xiaoji');
    for(let i=0;i<ck.length;i++){
        if(ck[i].checked){
            all += Number(xiaoji[i].innerText);
        }
    }
    return all;
}
//加、减、删除
//获取元素
let up = document.querySelectorAll('.up'),
down = document.querySelectorAll('.down'),
del = document.querySelectorAll('.del');
for(let i=0;i<up.length;i++){
//加事件
    up[i].onclick = function(){
        let tr = this.parentNode.parentNode;
        //货物ID
        let pid = tr.getAttribute('pid');
        //单价
        let price = tr.querySelector('.price'),
        //小计
        xiaoji = tr.querySelector('.xiaoji');
        //获取点击按钮的上一个兄弟元素
        let inp = this.previousElementSibling;
        //单选框
        let trParent = this.parentNode.parentNode.querySelector('td').querySelector('input');
        trParent.checked = true;
        //反选按钮方法
        checkedSelect();
        inp.value++;
        //计算小计
        xiaoji.innerText = inp.value * price.innerText;
        //如果cookie中有当前商品 更新cookie数据
        list = addPcount(pid,1);
        //总价格方法
        totalPrice.innerHTML = totalPrices();
    }
//减事件
    down[i].onclick = function(){
        let tr = this.parentNode.parentNode;
        //货物id
        let pid = tr.getAttribute('pid');
        //单价
        let price = tr.querySelector('.price'),
        //小计
        xiaoji = tr.querySelector('.xiaoji');
        //获取点击按钮的下一个兄弟元素
        let inp = this.nextElementSibling;
        if(inp.value <= 1){
            inp.value = 1;
            //如果cookie中有当前商品 更新cookie数据
            list = addPcount(pid,0)
        }else{
            inp.value--;
            //小计
            xiaoji.innerText = inp.value * price.innerText;
            list = addPcount(pid,-1);
        }
        getAllData();
        //单选框
        let trParent = this.parentNode.parentNode.querySelector('td').querySelector('input');
        trParent.checked = true;
        //反选按钮方法
        checkedSelect();
        //总价格方法
        totalPrice.innerHTML = totalPrices();
    }
//删除事件
    del[i].onclick = function(){
        let tr = this.parentNode.parentNode;
        let pid = tr.getAttribute('pid');
        tr.remove();
        //删除cookie数据
        list = removeCookie(pid);
        if(list.length == 0){
            box.style.display = 'block';
            show.style.display = 'none';
        }
        //反选按钮方法
        checkedSelect();
        //总价格方法
        totalPrice.innerHTML = totalPrices();
    }
}
