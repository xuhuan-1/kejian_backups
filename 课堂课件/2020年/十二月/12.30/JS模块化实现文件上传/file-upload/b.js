import * as types from './utils.js';
//获取元素
let upLoad = types.$('upLoad'),
uploadBox = types.$('uploadBox');
upLoad.onchange = async (e)=>{
    let file = e.target.files;
    file = Array.from(file);
    if(file.length == 0)return;
    let newLoadList = [];
    file.forEach((item,index)=>{
        newLoadList[index] = {
            card:null,
            base64:null,
            file:item
        }
    })
    let BASE64 = await Promise.all(file.map(item=>types.fileReader(item)));
    let frag = document.createDocumentFragment();
    BASE64.forEach((item,index)=>{
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${item}"/>
                            <div class="progress">
                                <div class="line"></div>
                            </div>
                            <div class="mark"></div>`;
        frag.appendChild(card);
        newLoadList[index].card = card;
        newLoadList[index].base64 = item;
    })
    uploadBox.appendChild(frag);
    await types.delay(3000);
    newLoadList.forEach(async (item,index)=>{
        let {
            card,
            base64,
            file
        } = item;
        let data = {
            chunk:base64,
            filename:file.name
        }
        let response = await types.postMessage('single2',Qs.stringify(data),{
            headers:{
                'Content-type':'application/x-www-form-urlencoded'
            },
            onUploadProgress(ev){
                let s = ev.loaded / ev.total * 100 + '%';
                card.querySelector('.line').style.width = s;
            }
        })
        if(response.code == 0){
            // card.remove();
        }
    })
}
//暴漏文件
export {
    upLoad
}