
// if (window.DeviceMotionEvent) {  
//        window.addEventListener('devicemotion',deviceMotionHandler, false);  
// } else {
//     alert('你的手机太差了，扔掉买个新的吧 ');
// }


// var speed = 30;//speed
// var x = y = z = lastX = lastY = lastZ = 0;
// function deviceMotionHandler(eventData) {  
//     var acceleration =eventData.accelerationIncludingGravity;
//         x = acceleration.x;
//         y = acceleration.y;
//         z = acceleration.z;
//         if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed || Math.abs(z-lastZ) > speed) {
//             //简单的摇一摇触发代码
//             alert(y);
            
//         }
//         lastX = x;
//         lastY = y;
//         lastZ = z;
// }
        
        
// PD(".text").html('1111111111111111111111111');     



// window.onload = function (){
// 	var lastLeft = new Date();
// 	var lastRight = new Date();
// 	var shaking = false;	//是否晃动
// 	var sound = new Audio('build/music/load.mp3');	//添加音乐
// 	sound.load();
// 	window.addEventListener("devicemotion",sharkItOff,false);
// 	//添加 devicemotion（晃动）监听，可移除 window.removeEventListener("devicemotion",sharkItOff,false)
// 	if ( typeof window.DeviceMotionEvent != 'undefined'){	//如果支持DeviceMotionEvent事件，或者写成 (window.DeviceMotionEvent)
// 		var sensitivity = 10;	//灵敏度
// 		function sharkItOff(e) {
// 			var x1 = e.accelerationIncludingGravity.x;	//x轴的重力加速度
// 			if (x1 > sensitivity)
// 				lastLeft = new Date();
// 			if (x1 < -sensitivity)
// 				lastRight = new Date();
// 			if (x1 > sensitivity / 2 && !shaking && new Date().getTime() - lastRight.getTime() < 100) {		//右侧晃动
// 			//如果x1 (x轴的重力加速度) > sensitivity (灵敏度的/2) && !shaking (没有晃动)
// 				shaking = true;
// 				sound.play();	//播放音乐
// 				begin();
// 			} else if (x1 < -sensitivity / 2 && !shaking && new Date().getTime() - lastLeft.getTime() < 100) {		//左侧晃动
// 				shaking = true;
// 				sound.play();	//播放音乐
// 				begin();
// 			} else if (x1 >= -sensitivity / 2 && x1 <= sensitivity / 2) {
// 				shaking = false;
// 			}
// 		}
// 	}
// 	function begin(){
// 		alert("摇一摇");
// 	}
// }




PD(document).ready(function() {
	if (window.DeviceMotionEvent){
		shakYoPan()
	}else {
    alert('你的手机太差了，不支持摇一摇 ');
}
    
    
    
    
    
    function shakYoPan(){
        var speed = 25;
		var audio = document.getElementById("shakemusic");
		var openAudio = document.getElementById("openmusic");
		var x = t = z = lastX = lastY = lastZ = 0;
		window.addEventListener('devicemotion',
			function () {
				var acceleration = event.accelerationIncludingGravity;
				x = acceleration.x;
				y = acceleration.y;
				if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
					audio.play();
					PD('.red-ss').addClass('wobble')
					setTimeout(function(){
						audio.pause();
						openAudio.play();
						PD('.red-tc').css('display', 'block');
					}, 1500);
				};
				lastX = x;
				lastY = y;
			},false);
    }
	
});




