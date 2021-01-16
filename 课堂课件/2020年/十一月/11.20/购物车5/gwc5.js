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
//table
let table = document.querySelector('.show'),
//tbody
tbody = document.querySelector('.tbody'),
//购物车里没有任何商品
box = document.querySelector('.box');
let list = getAllData();
if(list.length == 0){
    box.style.display = 'block';
    table.style.display = 'none';
}else{
    box.style.display = 'none';
    table.style.display = 'block';
    let domFragment = document.createDocumentFragment();
    for(let i=0;i<list.length;i++){
        let tr = document.createElement('tr');
        console.log(tr);
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
                            <button class="del">X</button>
                        </td>`;
        domFragment.appendChild(tr);
    }
    tbody.appendChild(domFragment);
}