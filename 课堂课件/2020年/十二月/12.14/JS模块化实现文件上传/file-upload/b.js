import * as types from './utils.js';
let upLoad = types.$('upLoad');
let uploadBox = types.$('uploadBox');
upLoad.onchange = async e=>{
    let file = e.target.files;
    file = Array.from(file);
    if (file.length == 0) return;
    let upLoadList = [];
    file.forEach((item, index) => {
        upLoadList[index] = {
            file: item,
            card: null,
            base64: null
        }
    })
    let BASE64 = await Promise.all(file.map(item=>types.fileReader(item)));
    console.log(BASE64);
    let frag = document.createDocumentFragment();
    BASE64.forEach((item,index)=>{
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${item}" alt="">
                            <div class="progress">
                                <div class="line"></div>
                            </div>
                            <div class="mark"></div>`;
        frag.appendChild(card);
        upLoadList[index].card = card;
        upLoadList[index].base64 = item;
    })
    uploadBox.appendChild(frag);
    // export let aass = upLoadList;
    await types.delay(3000);
    upLoadList.forEach(async (item,index)=>{
        let {
            file,
            card,
            base64
        } = item;
        let data = {
            chunk:base64,
            filename:file.name
        }
        let response = await types.postMessage('single2',Qs.stringify(data),{
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
}
export {
    upLoad,
}