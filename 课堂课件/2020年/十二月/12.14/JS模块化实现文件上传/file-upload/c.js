
// export let data = llo;
// console.log(data);
export let data = llo.forEach(async (item,index)=>{
    let {
        file,
        card,
        base64
    } = item;
    let data = {
        chunk:base64,
        filename:file.name
    }
    let response = await postMessage('single2',Qs.stringify(data),{
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        onUploadProgress(ev){
            let s = ev.loaded / ev.total * 100 + '%';
            card.querySelector('.line').style.width = s;
        }
    })
    if(response.code == 0){
        //card.remove();
    }
})