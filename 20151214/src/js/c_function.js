

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
使用方法

生成3-32位随机串：randomWord(true, 3, 32)
生成88位随机串：randomWord(false, 88)
*/
 
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}


// v  
function appV(){
  return "0.0.4";
}

//获取服务端数据 
function getSeverData(url,obj,callback) {
    var radNub = randomWord(false, 18);
     $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            data: obj,
            cache: false,
            contentType: "application/json;utf-8",
            timeout: 20000,
            error: function () {
                PL.open({
                    content: '请求错误，请再试',
                    time: 2
                });
               
            },
            success: function (data) {
                callback(data);
            }
        });    
}


// 这里是一些常用的函数
// 2015年9月25日 11:38:51




// 获取服务器时间 
function getServerTimeStamp(callback){
  $.ajax({
       type: "POST",
       cache: false,
       async: false,
       url: "/App_Services/wsDefault.asmx/GetDateTimeStamp",
       dataType: "json",
       contentType: "application/json;utf-8",
       timeout: 10000,
       error: function () {
       },
       success: function (data) {
           if(data){
             callback(parseInt(data.d * 1000));
           }
       }
    });
}

function get_Cookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};
function del_Cookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=get_Cookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
};

function set_Cookie(name,value,time,path)
{

    var exp = new Date();
    exp.setTime(time);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+"; path=" + path;
};
function getsec(str)
{

    var str1=str.substring(1,str.length)*1;
    var str2=str.substring(0,1);
    if (str2=="s")
    {
        return str1*1000;
    }
    else if (str2=="h")
    {
        return str1*60*60*1000;
    }
    else if (str2=="d")
    {
        return str1*24*60*60*1000;
    }
};
// 今日 结束时间
function getDateEnd(date) {
    var _date = new Date(date);
    var year = _date.getFullYear(), 
       month = _date.getMonth(),
       day = _date.getDate();
    return new Date(year, month, day, 23, 59, 59);
}

function removeEle(removeObj) {
    removeObj.parentNode.removeChild(removeObj);
};


// JavaScript Document
function loadjscssfile(filename,filetype){

    if(filetype == "js"){
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);
    }else if(filetype == "css"){
    
        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);
    }
   if(typeof fileref != "undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    
}


// 获取域名
function domainURI(str){
		var durl=/https?:\/\/(?:[^/]+\.)?([^./]+\.(?:cn|com|top))(?:$|\/)/;
		var domain = str.match(durl); 
		return domain[1];
 }


// 获取域名
function domainURI2(str){
		var durl= /(\w*\.\w*\.(?:com|cn|top)).*/;
		var domain = str.match(durl); 
		return domain[1];
 }

//中国地址数据响应		
function chinaAddressReact(obj){				
    var data = obj['china'];
    console.log(data);
    maskStyleReact(data);
}


//国外地址数据响应	
function noChinaAddressReact(obj){		
    
    var status = obj['status'];
    var data = '';
    console.log(status);
    if(status == 0){
        data = obj['nochina'];
    }else{
        data = obj['china'];
    };	
    maskStyleReact(data);
    
}

//遮罩层页面响应
function maskStyleReact(data){			
        $(".mask-top").css(data['topmask']);
        $(".mask-bottom").css(data['bottommask']);
}






//js获取url参数


function GetDomainUrl(num)
{
     //var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     
     //var r = window.location.search.substr(1).match(reg);
     var sea = window.location.search;
     sea = sea.substr(num,sea.length);
     if(sea!=null)return sea;return null;
     //if(sea!=null)return  unescape(r[2]); return null;
}