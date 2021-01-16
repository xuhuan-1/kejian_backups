//获取所有的数据
function getAllData(){
    let list = cookieObj.get('data');
    return list;
}
//检车数据中是否有对应的商品
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
//检查数据中是否有对应的商品，有就pCount + 1
function addPcount(pid,num){
    let list = getAllData();
    for(let i=0;i<list.length;i++){
        if(list[i].pid == pid){
            list[i].pCount += num;
        }
    }
    return upDataCookie(list);
}
//更新cookie数据
function upDataCookie(arr){
    cookieObj.set({
        name:'data',
        value:arr
    })
    return getAllData(list);
}
//商品数量
function getTotalPcount(){
    let list = getAllData();
    let all = 0;
    for(let i=0;i<list.length;i++){
        all += list[i].pCount;
    }
    return all;
}