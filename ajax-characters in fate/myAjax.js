function myAjax (option){
    //0. 将对象转换为字符串
    var str = objToStr(option.data);
    //1. 创建异步对象
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }   
    //2.设置请求方式和请求地址
    // method：请求的类型；GET 或 POST
    // url：文件在服务器上的位置
    //async：true（异步）或 false（同步）
    //3.发送请求
    //post一定要放在open和send之间
    if(option.type.toLowerCase() === "post"){
        xmlhttp.open(option.type,option.url,true)
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(str);
    }else{
        xmlhttp.open(option.type,option.url+"?"+str,true)
        xmlhttp.send();
    }
    //4.监听状态的变化
    //0: 请求未初始化
    //1: 服务器连接已建立
    //2: 请求已接收
    //3: 请求处理中
    //4: 请求已完成，且响应已就绪
    xmlhttp.onreadystatechange = function(ev2){
           //判断是否请求成功
            if (xmlhttp.readyState === 4){
                // clearInterval(timer);
                if(xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status == 304){
                    //5.处理返回的结果
                    option.success(xmlhttp);
                }else{
                    option.error(xmlhttp);
                    
                }
            }      
    }
    // 转换函数
    function objToStr(data){
        var res = [];
        if(data){
            data.time = new Date().getTime;
        }
        for (var key in data){
            //url不能出现中文，利用encode转码
            res.push(encodeURIComponent(key)+"="+encodeURIComponent(data[key]));
        }
        return res.join("&");
    }
    //设置超时时间
    if(option.time){
        timer = setInterval(function(){
            console.log("中断请求");
            xmlhttp.abort();
            clearInterval(timer);         
        },option.time)       
    }    
}