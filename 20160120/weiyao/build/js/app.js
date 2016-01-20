document.body.addEventListener("touchstart",function(e){
	e.preventDefault();
	e.target.click();
}, false);
function ShakeHandler(callback,threshold){
	callback._threshold = threshold || 800;
	if(ShakeHandler._inited){
		callbacks.push(callback);
		return;
	}
	if (!window.DeviceMotionEvent) {
		alert('本设备不支持 devicemotion 事件');
		return; 
	}
	ShakeHandler._inited = true;
	var callbacks = [];

	var last_update = 0;
	var x = y = z = last_x = last_y = last_z = 0;
	window.addEventListener('devicemotion',function(eventData) {
		var acceleration = eventData.accelerationIncludingGravity;
		var curTime = new Date().getTime();

		if ((curTime - last_update) > 100) {
			var diffTime = curTime - last_update;
			last_update = curTime;
			x = acceleration.x;
			y = acceleration.y;
			z = acceleration.z;
			var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
			for(var n in callbacks){
				if (speed > callbacks[n]._threshold) {
					callbacks[n]();
				}
			}
			last_x = x;
			last_y = y;
			last_z = z;
		}
	});
	callbacks.push(callback);
}
footer.addEventListener("click",function(e){
				var li = e.target;
				if("LI"===li.tagName){
					document.title = "摇"+li.innerHTML;
					onShake();
					var lis = footer.getElementsByTagName("li");
					for(var n=0,len=lis.length;n<len;n++){
						lis[n].setAttribute("class","");
					}
					li.setAttribute("class","active");
				}
			});
			function animationend(e){
				var div = e.target;
				div.className = "";
				loading.className = "active";
				result.className = ""; 
				setTimeout(function(){
					audio_match.play();
					loading.className = "";
					result.className = "result-in";
				},1200);
			}
			handsome.addEventListener("animationend",animationend);
			handsome.addEventListener("webkitAnimationEnd",animationend);

			var hands = handsome.getElementsByTagName("div");
			function onShake(){
				if(hands[1].className){
					return;
				}
				audio_male.play();
				hands[0].setAttribute("class","hand-up");
				hands[1].className = "hand-down";
				if(result.className === "result-in"){
					result.className = "result-out";
				}
			}
ShakeHandler(onShake,2500);