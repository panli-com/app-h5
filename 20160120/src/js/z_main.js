
if (window.DeviceMotionEvent) {  
       window.addEventListener('devicemotion',deviceMotionHandler, false);  
} else {
    alert('你的手机太差了，扔掉买个新的吧 ');
}


var speed = 30;//speed
var x = y = z = lastX = lastY = lastZ = 0;
function deviceMotionHandler(eventData) {  
    var acceleration =eventData.accelerationIncludingGravity;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed || Math.abs(z-lastZ) > speed) {
            //简单的摇一摇触发代码
            alert(x);
            
            
        }
        lastX = x;
        lastY = y;
        lastZ = z;
}
        
        
PD(".text").html('1111111111111111111111111');     