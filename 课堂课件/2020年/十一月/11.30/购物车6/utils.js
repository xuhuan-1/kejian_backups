//获取全部数据
function getAllData(){
    let list = cookie.get('data');
    return list;
}
//检查cookie中是否有对应的商品
function checkByPid(pid){
    let list = getAllData();
    let flag = false;
    for(let i=0;i<list.length;i++){
        if(list[i].pid == pid){
            flag = true;
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
        }
    }
    return upDataCookie(list);
}

//更新cookie 数据
function upDataCookie(arr){
    let list = getAllData();
    cookie.set({
        name:'data',
        value:arr
    });
    return getAllData(list);
}

//计算商品总量 
function allGoodsPcount(){
    let all = 0;
    let list = getAllData();
    for(let i=0;i<list.length;i++){
        all += list[i].pCount;
    };
    return all;
}