;(function(){
  
  
   //touchstart:     
   //touchmove:     
   //touchend:         
   //touchcancel:        
  
  PanLi(function(){
        var _hostName = window.location.hostname;
     
    
     
    PanLi(".action-bar").html('');
    
    
    PanLi(".action-bar,#detail-base-smart-banner").remove();
      
     PanLi("body").on("touchend click touchmove touchstart",".mask-top,.mask-bottom",function(event){
          console.log("阻止");
          event.stopPropagation();          
          return false;
        
     });      
  })
     
     
   
     
     
      //    var src = 'http://h5.m.taobao.com/awp/core/detail.htm?spm=a21c0.34764.138697.1&id=524047443564';
      // var api = 'http://172.20.7.232:5029/H5API/GetH5Cover';
      //api：服务器请求接口地址
      // src :厂家地址
      // 客户地址信息：国内用户 和 非
      //  addressReact(api,src,'国内用户'); 
     
    
     

    
 
})();
