;(function(){
  
  
   //touchstart:     
   //touchmove:     
   //touchend:         
   //touchcancel:        
  
  $(function(){     
     $("body").on("touchend click touchmove touchstart",".mask-top,.mask-bottom",function(event){
          console.log("阻止");
          event.stopPropagation();          
          return false;
        
     });    
  });
    
 
})();
