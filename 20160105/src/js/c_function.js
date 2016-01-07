// v  
function appV(){
  return "0.0.6";
}

//获取服务端数据   
function getSeverData(url,obj,callback) {
   
     PanLi.ajax({
            type: "get",
            url: url,
            dataType: "json",
            data: obj,
            cache: false,
            contentType: "application/json;utf-8",
            timeout: 20000,
            error: function () {
                console.log('请求错误，请再试');              
               
            },
            success: function (data) {
                callback(data);
            }
        });    
}

// 获取域名
function domainURI(str){
		var durl=/https?:\/\/(?:[^/]+\.)?([^./]+\.(?:cn|com|top))(?:PanLi|\/)/;
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
    if(data){
       maskStyleReact(data); 
    }else{
        alert("返回数据错误")
    }
    
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
        
        var styleC = 'position: fixed;left:0;right:0;width:100%;background:#FFF;';
        var html = '<div class="mask-bottom" style="'+ styleC +'"></div><div class="mask-top" style="'+ styleC +'"></div>';       
        
        PanLi("body").append(html);             
        PanLi(".mask-top").css(data['topmask']);
        PanLi(".mask-bottom").css(data['bottommask']);
        
}




function addressReact(api,iframeSrc,address) {
    var obj = { url: domainURI2(iframeSrc) };
            // 获取域名遮罩 层信息
    getSeverData(api, obj, function (data) {
        console.log(data);     
        if (address == '国内用户') {
            chinaAddressReact(data);
        } else {
            noChinaAddressReact(data);
        }
    })
}


