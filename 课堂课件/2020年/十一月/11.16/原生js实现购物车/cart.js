// 专门写购物车逻辑

// nextElementSibling:下一个兄弟元素
// previousElementSibling:上一个兄弟元素

/**
 * 思路：
 *     1、获取最新的cookie数据，渲染页面
 *     2、获取需要操作的DOM元素
 *     3、全选、反选功能，全选或者反选时，计算出勾选的商品总价
 *     4、加 减功能，操作时，选中当前商品，调用addPcount方法
 *     5、小计功能：单价 * 数量
 *     6、总价：所有选中的商品的小计 相加  = 总价
 *     7、删除：删除当前商品
 */

// 获取需要操作的DOM元素
let show = document.querySelector(".show"), //table表格
  //  没有商品的显示元素
  box = document.querySelector(".box"),
  tbody = document.getElementById("tbody"),
  allCheck = document.getElementById("allCheck"),
  totalPrice = document.getElementById('totalPrice');

let list = getAllData();
if (list.length == 0) {
  box.className = "box";
  show.className = "show hide";
} else {
  box.className = "box hide";
  show.className = "show";
  // 性能优化
  let trFrame = document.createDocumentFragment();
  for (let i = 0; i < list.length; i++) {
    let tr = document.createElement("tr");
    tr.setAttribute("pid", list[i].pid);
    tr.innerHTML = `<td>
        <input type="checkbox" class="ck"  />
        </td>
        <td>
        ${list[i].pid}
        </td>
        <td>
            <img src="${list[i].imgSrc}" alt="" />
        </td>
        <td>
        ${list[i].info}
        </td>
        <td>
            <button class="down">-</button>
            <input type="text" value="${list[i].pCount}" readonly="readonly" />
            <button class="up">+</button>
        </td>
        <td>
            ￥<span class="price">${list[i].price}</span>
        </td>
        <td>
            ￥<span class="xiaoji">${list[i].price * list[i].pCount}</span>
        </td>
        <td>
            <button class="del" >删除</button>
        </td>`;
    trFrame.appendChild(tr);
  }
  tbody.appendChild(trFrame);
}

// 全选事件   只要全选为true，则下面的所有数据都选择true
let ck = document.querySelectorAll(".tbody .ck");
allCheck.onchange = function () {
  if (this.checked) {// true
    for (let i = 0; i < ck.length; i++) {
      ck[i].checked = true;
    }
  } else {
    for (let i = 0; i < ck.length; i++) {
      ck[i].checked = false;
    }
  }
  totalPrice.innerHTML = getTotalPrices();
};

// 反选封装
function checkedTrSelected(){
    let isSelected = true;  // 真
    ck = document.querySelectorAll('.tbody .ck');
    for(let i=0;i<ck.length;i++){
        if(!ck[i].checked){
            isSelected = false;
        }
    }
    allCheck.checked = isSelected;
    totalPrice.innerHTML = getTotalPrices();
}

// 监听功能
for (let i = 0; i < ck.length; i++) {
  ck[i].onchange = function () {
    checkedTrSelected();
  };
}

// 计算总价
function getTotalPrices(){
    let sum = 0;
    let xiaoji = document.querySelectorAll('.xiaoji');
    for(let i=0;i<ck.length;i++){
        if(ck[i].checked){
            sum += Number(xiaoji[i].innerText);
        }
    }
    return sum;
}

//  加 减 删
let up = document.querySelectorAll(".up"),
  down = document.querySelectorAll(".down"),
  del = document.querySelectorAll(".del");

for (let i = 0; i < del.length; i++) {
  // 删除
  del[i].onclick = function () {
    let tr = this.parentNode.parentNode;
    let pid = tr.getAttribute("pid");
    tr.remove(); //原生JS中DOM删除操作
    list = removeCookie(pid);
    if (list.length == 0) {
      box.className = "box";
      show.className = "show hide";
    } else {
      box.className = "box hide";
      show.className = "show";
    }
    checkedTrSelected();
    //总价
    totalPrice.innerHTML = getTotalPrices();
  };
  // 加
  up[i].onclick = function () {
    let tr = this.parentNode.parentNode;
    //货物id
    let pid = tr.getAttribute("pid");
    //单价
    let price = tr.querySelector(".price");
    //小计
    let xiaoji = tr.querySelector(".xiaoji");
    let ipt = this.previousElementSibling;
    //反选封装的方法
    tr.children[0].firstElementChild.checked = true;
    checkedTrSelected();
    ipt.value++;
    //小计
    xiaoji.innerText = Number(ipt.value) * Number(price.innerText);
    list = addPcount(pid, 1);
    //总价
    totalPrice.innerHTML = getTotalPrices();
  };
  // 减
  down[i].onclick = function () {
    let tr = this.parentNode.parentNode;
    let pid = tr.getAttribute("pid");
    let ipt = this.nextElementSibling;
    let textVal = this.nextElementSibling.value;
    let price = tr.querySelector(".price");
    let xiaoji = tr.querySelector(".xiaoji");
    if (textVal <= 1) {
      ipt.value = 1;
      list = addPcount(pid, 0);
    } else {
      ipt.value--;
      xiaoji.innerText = Number(ipt.value) * Number(price.innerText);
      list = addPcount(pid, -1);
    }
    tr.children[0].firstElementChild.checked = true;
    checkedTrSelected();
    //总价
    totalPrice.innerHTML = getTotalPrices();
  };
