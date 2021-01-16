//获取最新数据
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
//有相同商品商量加一
function addPcount(pid,num){
    let list = getAllData();
    for(let i=0;i<list.length;i++){
        if(list[i].pid == pid){
            list[i].pCount += num;
            break;
        }
    }
    return upDataCookie(list);
}
//更新最新数据
function upDataCookie(arr){
    cookieObj.set({
        name:'data',
        value:arr
    })
    return getAllData(list);
}
//计算商品总数量
function totalPcount(){
    let list = getAllData();
    let total = 0;
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
    return upDataCookie(list); 
}