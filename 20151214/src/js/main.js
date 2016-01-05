;(function(){
  
  
   //touchstart:     
   //touchmove:     
   //touchend:         
   //touchcancel:        
  
  $(function(){
     
     var winH = $(window).height();
    
     $("#iframe").css("height",winH);     
     
     $(".switch-bottom2").on("touchend",function(){
         var host = $("#iframe").attr("src");
     
         alert(host); 
           
     });
    
     $(".switch-bottom").on("touchend",function(){
         var _t = $(this),
            _tb = _t.attr("data-btn"),
            _top = $(".mask-top"),
            _bottom = $(".mask-bottom");
            if(_tb == 1){
              _top.hide();
              _bottom.hide();
               _t.attr("data-btn",0)
            }else{
              _top.show();
              _bottom.show();
              _t.attr("data-btn",1)
            }
           
     });
     
     
     $(".mask-top,.mask-bottom").on("touchend click touchmove touchstart",function(event){
          event.stopPropagation();
          console.log("阻止");
          return false;
        
     });
     
      // $(".go-to-btn").on("touchstart touchmove",function(){
      //   $(this).addClass("on");
      // });
      
      // $(".go-to-btn").on("touchend touchcancel",function(){
      //   $(this).removeClass("on");
      // });
    // $(".red-packet-btn").on("touchend",function(){
    //   var _t = $(this);     
    //     PL.open({
    //       type: 2,
    //       content: '正在加载中',
    //       shadeClose: false
    //     });
       
    // })
    
    // $(".red-packet-btn-no").on("touchend",function(){     
    //    PL.open({            
    //         content: '啊喔, 这张券已经被大家抢光了呢'
    //     });
    //       Log(_t);
    // });    
    
    // $(".red-packet-btn-yes").on("touchend",function(){   
     
    //    PL.open({            
    //         content: '这张券已经抢过了哦'
    //     });
    //     Log(_t);
    // });
    
    // $(".red-packet-btn-2").on("touchend",function(){   
    //  PL.open({            
    //         content: '每个人只能领两张券哦'
    //     });
    //    Log(_t);
    // });
    
    
    
  });
    
 
})();
