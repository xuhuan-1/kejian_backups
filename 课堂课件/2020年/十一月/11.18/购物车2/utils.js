//获取所有的数据
function getAllData(){
    let list = cookieObj.get('data');
    return list;
}
//检查cookie中是否有对应的商品
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
//检查cookie中是否有对应的商品，有就数量++ 
function addPcount(pid,num){
    let list = getAllData();
    for(let i=0;i<list.length;i++){
        if(list[i].pid == pid){
            list[i].pCount += num;
            break;
        }
    }
    return upDateCookie(list)
}
//更新 cookie数据
function upDateCookie(arr){
    cookieObj.set({
        name:'data',
        value:arr
    })
    return getAllData(list);
}
//计算商品总量
function getTotalPcount(){
    let total = 0;
    let list = getAllData();
    for(let i=0;i<list.length;i++){
        total += list[i].pCount;
    }
    return total;
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
