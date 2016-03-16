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
              //url = tldjs.getDomain(window.location.href); 
              url = domainURI(window.location.href);
          }
          
          
          
          console.log(PLElements[url]);
          
          
          
          PanLi(PLElements[url]).remove();
          
          function setTimeoutF(){
               setTimeout(function(){
                    PanLi(PLElements[url]).remove();
                   setTimeoutF()
               },600)
          }
          
          
          if(_hostName == 'h5.m.taobao.com'){
              console.log("竟然是手淘 == h5.m.taobao.com")
              PanLi('body').css({'paddingTop':'0'});             
              
          } 
          
          
          if(_hostName == 'detail.m.tmall.com'){
            PanLi("#content").css({'paddingTop':'0'});
          }
          console.log(new Date);
          if(url == 'tmall.com'){
              console.log(url);
              setTimeout(function(){
                  
                   console.log(new Date);
                PanLi('.app-download-popup,#J_BottomSmartBannerLink').remove();   
               },3200)

          }
         
          console.log(url); 
           if(url == 'meilishuo.com'){
               
               console.log(url);
               PanLi('#poster_blcok').css({'marginTop':'0'})
               
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
