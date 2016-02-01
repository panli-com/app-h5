;(function(){ 
  
   //touchstart:     
   //touchmove:     
   //touchend:          
   //touchcancel:        
  
  PanLi(function(){
      
      
          var _hostName = window.location.hostname;    
     
          PanLi(".action-bar").html('');
           
          
         // PanLi(".action-bar,#detail-base-smart-banner,.tryme,.cart-concern-btm-fixed,.item-action,.guang-smart-banner,#J_BottomSmartBanner").remove();
          
          var url= '';
          
          if(_hostName == 'localhost'){
              url = 'taobao.com';
          }else{
              url = tldjs.getDomain(window.location.href);
          }
          
        //   if(window.location.pathname == '/Special/sale201602_H5.html'){
        //       PD('#appHideDownload').remove();
        //   }
          
          console.log(PLElements[url]);
          
          PanLi(PLElements[url]).remove();
          
          if(_hostName == 'h5.m.taobao.com'){
              console.log("竟然是手淘 == h5.m.taobao.com")
              PanLi('body').css({'paddingTop':'0'});             
              
          } 
          
          
          if(_hostName == 'detail.m.tmall.com'){
            PanLi("#content").css({'paddingTop':'0'});
          }
          
          
          setTimeout(function(){
            var taobaoClose = PanLi("[id$='-close']");
           	
            taobaoClose.parent().remove();
            if(_hostName == 'h5.m.taobao.com'){
              
              PanLi('body').css({'paddingTop':'0'});
            }
          },500)
      
      
  })
     
 

    
 
})();
