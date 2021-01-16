export let formateDate = (time) =>{
    let years = time.getFullYear();
    let month = time.getMonth() +1;
    let day = time.getDate();
    return `${years}-${month}-${day}`
}


export let delay = (timer) =>{
    var timer = timer || 2000;
    return new Promise(resolve =>{
        setTimeout(()=>{
            resolve()
        },timer)
    })
}






