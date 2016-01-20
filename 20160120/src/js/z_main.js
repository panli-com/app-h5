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