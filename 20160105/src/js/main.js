;(function(){
  
  
   //touchstart:     
   //touchmove:     
   //touchend:         
   //touchcancel:        
  
  PanLi(function(){
      
      
          var _hostName = window.location.hostname;    
     
          PanLi(".action-bar").html('');
          
          
          PanLi(".action-bar,#detail-base-smart-banner,.tryme,.cart-concern-btm-fixed,.item-action").remove();
          
          
          console.log(_hostName);
          
          if(_hostName == 'h5.m.taobao.com'){
              console.log("==h5.m.taobao.com")
              PanLi('body').css({'paddingTop':'0'});             
              
          } 
          
          
          if(_hostName == 'detail.m.tmall.com'){
            PanLi("#content").css({'paddingTop':'0'});
          }
          
          
          setTimeout(function(){
            var taobaoClose = PanLi("[id$='-close']");
            console.log(taobaoClose.html());			
            taobaoClose.parent().remove();
            if(_hostName == 'h5.m.taobao.com'){
              console.log("==h5.m.taobao.com")
              PanLi('body').css({'paddingTop':'0'});
            }
          },500)
      
      
  })
     
     
   
     
     
      //    var src = 'http://h5.m.taobao.com/awp/core/detail.htm?spm=a21c0.34764.138697.1&id=524047443564';
      // var api = 'http://172.20.7.232:5029/H5API/GetH5Cover';
      //api：服务器请求接口地址
      // src :厂家地址
      // 客户地址信息：国内用户 和 非
      //  addressReact(api,src,'国内用户'); 
     
    
     

    
 
})();
