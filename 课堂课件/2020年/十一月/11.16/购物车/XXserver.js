//获取所有的数据
function getAllData(){
    let list = cookieObj.get('data');
    return list;
}
//检查cookie中是否有对应的商品，有就+1，没有就手动添加，返回布尔值
function checkByPid(pid){
    let list = getAllData();
    let flag = false;
    for(let i=0;i<list.length;i++){
        if(list[i].pid == pid){
            flag = true;
            break;
        }
    }
    return flag;
}
//如果cookie中有当前商品，则数量加1   加 减
function addPcount(pid,num){
    let list = getAllData();
    for(let i=0;i<list.length;i++){
        if(list[i].pid == pid){
            list[i].pCount += num;
            break;
        }
    }
    return upDateCookie(list);
}
//更新cookie数据
function upDateCookie(arr){
    cookieObj.set({
        name:'data',
        value:arr,
    });
    return getAllData(list);
}
//删除cookie数据
function removeCookie(pid){
    let list = getAllData();
    for(let i=0;i<list.length;i++){
        if(list[i].pid == pid){
            list.splice(i,1);
        }
    }
    return upDateCookie(list);
}
//计算商品总数量
function getTotalPcount(){   
    let total = 0;
    let list = getAllData();
    for(let i=0;i<list.length;i++){
        total += list[i].pCount;
    }
    return total;
}