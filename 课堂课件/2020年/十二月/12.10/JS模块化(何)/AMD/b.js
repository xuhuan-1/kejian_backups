define(function(){
    function delay(timer){
        var timer = timer || 2000;
        return new Promise(resolve =>{
            setTimeout(() =>{
                resolve()
            },timer)
        })
    }
    return {
        delay
    }
})