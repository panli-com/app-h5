document.ontouchmove = function(event) {
    event.preventDefault();
}


var imgHeight = $("#mainCanvas").height();
var sceneWidth = $("#mainCanvas").width();
var sceneHeight = 1206;
var screenRate = sceneHeight / sceneWidth;
var canvasWidth;
var canvasHeight;
var spriteScale, bgScale;

$(window).resize(Resize);
Resize();

function Resize() {
    canvasWidth = $("#canvas").width();
    canvasHeight = $("#canvas").height();

    if((canvasHeight / canvasWidth) > (sceneHeight / sceneWidth)){
        canvasHeight = screenRate * canvasWidth;
        spriteScale = canvasWidth / sceneWidth;
    } else {
        canvasWidth = canvasHeight / screenRate;
        spriteScale = canvasHeight / sceneHeight;
    }   

    $(".wrapper").css({
        left: "50%",
        marginLeft: -sceneWidth / 2,
        width: sceneWidth,
        height: sceneHeight,
        zoom: spriteScale.toPrecision(2)
    });
}

// Init Orientation
var start_gamma = 0;
var start_beta = 0;
var start_alpha = 0;

var current_gamma = 0;
var current_beta = 0;
var current_alpha = 0;

var check_orientation = true;

if (window.DeviceOrientationEvent) {
    // document.getElementById("doEvent").innerHTML = "DeviceOrientation";
    // Listen for the deviceorientation event and handle the raw data
    window.addEventListener('deviceorientation', function(eventData) {
        // gamma is the left-to-right tilt in degrees, where right is positive
        current_gamma = eventData.gamma;
        // beta is the front-to-back tilt in degrees, where front is positive
        current_beta = eventData.beta;
        // alpha is the compass direction the device is facing in degrees
        current_alpha = eventData.alpha 
    }, false);
}

var backgroundMusic;
var preloadQueue = new createjs.LoadQueue();
preloadQueue.installPlugin(createjs.Sound);
preloadQueue.setMaxConnections(5);
preloadQueue.on("complete", preloadComplete, this);

preloadQueue.loadManifest([{
    id: "audio_bg",
    src: "sound/background.mp3"
}, {
    id: "audio_countdown1",
    src: "sound/countdown1.mp3"
}, {
    id: "audio_countdown2",
    src: "sound/countdown2.mp3"
}, {
    id: "audio_countdown3",
    src: "sound/countdown3.mp3"
}, {
    id: "audio_countdown4",
    src: "sound/countdown4.mp3"
}, {
    id: "audio_countdown5",
    src: "sound/countdown5.mp3"
}, {
    id: "audio_countdown6",
    src: "sound/countdown6.mp3"
}, {
    id: "audio_countdown7",
    src: "sound/countdown7.mp3"
}, {
    id: "audio_countdown8",
    src: "sound/countdown8.mp3"
}, {
    id: "bg_0",
    src: "img/bg_0.jpg"
}, {
    id: "bg_1",
    src: "img/bg_1.jpg"
}, {
    id: "bg_2",
    src: "img/bg_2.jpg"
}, {
    id: "bg_3",
    src: "img/bg_3.jpg"
}, {
    id: "bg_4",
    src: "img/bg_4.jpg"
}, {
    id: "bg_countdown",
    src: "img/bg_countdown.jpg"
}, {
    id: "bg_front",
    src: "img/bg_front.jpg"
}, {
    id: "bg_end",
    src: "img/bg_end.jpg"
}, {
    id: "bg_popup_fail",
    src: "img/bg_popup_fail.png"
}, {
    id: "bg_popup_share",
    src: "img/bg_popup_share.png"
}]);

// loading
var loadingDeg = 0;
var loadingCouter = setInterval(function(){
    $("#loading > .icon").css({
        "transform": "rotate("+loadingDeg+"deg)"
    });
    loadingDeg += 30;
    if(loadingDeg >= 360){
        loadingDeg = 0;
    }
}, 100);

var backgroundMusic;
var clockEffectTimer1;
var clockEffectTimer2;
var checkStart = false;
var btnLock = false;
function preloadComplete() {
    // add page
    addPage($(preloadQueue.getResult("bg_front")).attr("src"), 0);
    addPage($(preloadQueue.getResult("bg_0")).attr("src"), 1);
    addPage($(preloadQueue.getResult("bg_1")).attr("src"), 2);
    addPage($(preloadQueue.getResult("bg_2")).attr("src"), 3);
    addPage($(preloadQueue.getResult("bg_3")).attr("src"), 4);
    addPage($(preloadQueue.getResult("bg_4")).attr("src"), 5);
    addPage($(preloadQueue.getResult("bg_end")).attr("src"), 6);

    sharePage($(preloadQueue.getResult("bg_popup_share")).attr("src"));

    $("#countDown").css({
        backgroundImage: "url(" + $(preloadQueue.getResult("bg_countdown")).attr("src") + ")"
    });
    $("#popupFail > .dialog").css({
        backgroundImage: "url(" + $(preloadQueue.getResult("bg_popup_fail")).attr("src") + ")"
    });
    // $("#popupShare").css({
    //     backgroundImage: "url(" + $(preloadQueue.getResult("bg_popup_share")).attr("src") + ")"
    // });

    setTimeout(function() {
        $("#loading > .dialog").fadeIn(200, function(){
            $("#loading > .btnClose").fadeIn(200);
        });

        if (backgroundMusic) {
            backgroundMusic.stop();
        }
        backgroundMusic = createjs.Sound.play("audio_bg");
        backgroundMusic.setLoop(99999);
    }, 2000);

    $(".btnStartArea").bind("touchstart", function(e) {
        if(!btnLock){
            if(!checkStart){
                $('.btnStart').addClass("selected");
            }else{
                gameFailure(true);
            }
        }
    })
    .bind("touchend", function(e) {
        if(!checkStart && !btnLock){
            $('.btnStart').removeClass("selected");
            createjs.Sound.play("audio_countdown2");

            // clock start
            clearInterval(counter);
            initialMillis = Date.now();
            counter = setInterval(timer, 1);
            count = initial;
            step = 0;

            min2.removeClass();
            min2.addClass("num0");
            sec1.removeClass();
            sec1.addClass("num5");
            sec2.removeClass();
            sec2.addClass("num9");

            $("#countDown > div").stop(true, true).fadeTo(0, 0.2, "easeInOutExpo", function(){
                $(this).stop(true, true).fadeTo(500, 0.3, "easeInOutExpo");
            });
            setTimeout(function(){
                $("#countDown > div").stop(true, true).fadeTo(500, 0.2, "easeInOutExpo", function(){
                    $(this).stop(true, true).fadeTo(500, 0.3, "easeInOutExpo");
                });
                clearInterval(clockEffectTimer1);
                clockEffectTimer1 = setInterval(function(){
                    $("#countDown > div").stop(true, true).fadeTo(500, 0.2, "easeInOutExpo", function(){
                        $(this).stop(true, true).fadeTo(500, 0.3, "easeInOutExpo");
                    });
                }, 1000);
                clearInterval(clockEffectTimer2);
                clockEffectTimer2 = setInterval(function(){
                    var op = $("#countDown > div").css("opacity");
                    $("#countDown > div").fadeTo(50, op*1.1, function(){
                        $(this).fadeTo(30, op);
                    });
                }, 110);
            }, 300);

            // Set Orientation 
            start_gamma = current_gamma;
            start_beta = current_beta;
            start_alpha = current_alpha;
            $("#countDown")
                .css({"bottom": -206})
                .stop(true, true)
                .animate({
                    bottom: 0
                }, 300, "easeInOutExpo");
            $(".btnStart")
                .stop(true, true)
                .fadeOut(300, "easeInOutExpo");
            checkStart = true;
        }
    });
}



// init
var sliceCount = 25;
var sliceHeight = imgHeight / sliceCount;
var totalPage = 7;


var clockFade = 0;
$("#countDown > div").fadeTo(0, 0.3);
$("#countDown > #clock > .arrow").css({
    transform: "rotate(51deg)"
});

// Init Page Line
for(var i=0; i<sliceCount; i++){
    var _div = $("<div></div>");
    var left = 0;
    if(i%2==0){
        left = -sceneWidth*(totalPage-1);
    }
    _div.addClass("lineGroup"+i)
        .css({
            "position": "absolute",
            "top": i*sliceHeight,
            "left": left,
            "width": sceneWidth*totalPage,
            "height": sliceHeight
        });
    $("#mainCanvas").append(_div);
}

function sharePage(imgPath){
    for(var i=0; i<6; i++){
        var _div = $("<div></div>");
        _div.css({
            "float": "left",
            "background-image": "url("+imgPath+")",
            "background-position-x": -i*(41+42+42),
            "width": 41,
            "height": 1206
        });
        $("#popupShare").append(_div);
        var _div = $("<div></div>");
        _div.css({
            "float": "left",
            "background-image": "url("+imgPath+")",
            "background-position-x": -(i*(41+42+42)+41),
            "width": 42,
            "height": 1206
        });
        $("#popupShare").append(_div);
        var _div = $("<div></div>");
        _div.css({
            "float": "left",
            "background-image": "url("+imgPath+")",
            "background-position-x": -(i*(41+42+42)+41+42),
            "width": 42,
            "height": 1206
        });
        $("#popupShare").append(_div);
    }
}

function addPage(imgPath, pageNum){
    for(var i=0; i<sliceCount; i++){
        var x = sceneWidth;
        var _div = $("<div></div>");
            _div.css({
                "float": "left",
                "background-image": "url("+imgPath+")",
                "background-position-y": -i*sliceHeight,
                "width": sceneWidth,
                "height": sliceHeight
            });
        if(i%2==0){
            $('#mainCanvas > .lineGroup'+i).prepend(_div);
        }else{

            $('#mainCanvas > .lineGroup'+i).append(_div);
        }
    }
}

var min1 = $("#countDown > #min1");
var min2 = $("#countDown > #min2");
var sec1 = $("#countDown > #sec1");
var sec2 = $("#countDown > #sec2");
var msec1 = $("#countDown > #msec1");
var msec2 = $("#countDown > #msec2");

var initial = 60000;
var count;
var counter;
var initialMillis;

function timer() {
    if (count <= 0) {
        clearInterval(counter);
        sec1.removeClass();
        sec1.addClass("num0");
        sec2.removeClass();
        sec2.addClass("num0");
        msec1.removeClass();
        msec1.addClass("num0");
        msec2.removeClass();
        msec2.addClass("num0");
        $("#countDown > #clock > .arrow").css({
            transform: "rotate(51deg)"
        });
        $("#endPage").fadeIn(0);
        return;
    }

    var current = Date.now();
    count = count - (current - initialMillis);
    initialMillis = current;
    displayCount(count);
}

var step = 0;
var curSec = 0;
function displayCount(count) {
    var res = count / 1000;
    var sec = parseInt(res);
    var msec = parseInt(res%1*100);

    updateMsec(msec);

    if(sec != curSec){
        curSec = sec;
        var randMusic = Math.floor((Math.random() * 8) +1);
        createjs.Sound.play("audio_countdown"+randMusic);

        $("#countDown > #clock > .arrow").css({
            transform: "rotate("+(step*6+51)+"deg)"
        });
        playSceneAnimation(step, 1000);
        updateSec(sec);
        step++;
    }

    if(!check_orientation ||
       Math.abs(start_gamma-current_gamma) > 5 || 
       Math.abs(start_beta-current_beta) > 5){
        gameFailure(true);
    }
}

function updateSec(sec){
    sec1.removeClass().addClass("num"+parseInt(sec/10));
    sec2.removeClass().addClass("num"+sec%10);
}

function updateMsec(msec){
    msec1.removeClass().addClass("num"+parseInt(msec/10));
    msec2.removeClass().addClass("num"+msec%10);
}

function gameFailure(showPopup){
    var res = (initial - count) / 1000;
    var sec = parseInt(res);

    btnLock = true;
    check_orientation = false; 
    clearInterval(counter);

    $("#popupFail > .dialog > #sec1").removeClass().addClass("num"+parseInt(sec/10));
    $("#popupFail > .dialog > #sec2").removeClass().addClass("num"+sec%10);
    reverseTimer(count, showPopup);
}

var reverseCounter;
function reverseTimer(count, showPopup){
    if(showPopup){
        reverseSceneAnimation(parseInt((initial-count)/(step/2)));
    }else{
        reverseSceneAnimation(parseInt((initial-count)/(step/5)));
    }
    
    curSec = -1;
    reverseCounter = setInterval(function(){
        count+=200;
        var res = count/1000;
        var sec = parseInt(res);
        var msec = parseInt(res%1*100);

        updateMsec(msec);

        if(sec != curSec){
            curSec = sec;
            step--;
            $("#countDown > #clock > .arrow").css({
                transform: "rotate("+(step*6+51)+"deg)"
            });
            updateSec(sec);            

            if(count >= initial){
                if(showPopup){
                    $("#popupFail").fadeIn(300);
                }

                clearInterval(reverseCounter);
                $(".btnStart").fadeIn(300, function(){
                    btnLock = false; 
                });
                checkStart = false;
                check_orientation = true;
                setTimeout(function(){
                    

                }, 1000);

                for(var i=0; i<sliceCount; i++){
                    $("#mainCanvas > .lineGroup"+i).stop(true, true);
                }

                min2.removeClass();
                min2.addClass("num1");
                sec1.removeClass();
                sec1.addClass("num0");
                sec2.removeClass();
                sec2.addClass("num0");
                msec1.removeClass();
                msec1.addClass("num0");
                msec2.removeClass();
                msec2.addClass("num0");
            }
        }
    }, 5);
}

function playSceneAnimation(curStep, duration){
    var moveX = sceneWidth/4;
    for(var i=0; i<sliceCount; i++){
        var randMove = Math.floor(Math.random() * moveX);
        
        if(curStep%10 != 0 || curStep == 0){
            if(i%2==0){
                if(curStep%10 == 9){
                    $("#mainCanvas > .lineGroup"+i).stop(true, true).animate({
                        left: -sceneWidth*(parseInt(((totalPage*10-10)-curStep)/10))
                    }, duration, "easeInOutExpo");
                }else{
                    $("#mainCanvas > .lineGroup"+i).stop(true, true).animate({
                        left: '+='+randMove
                    }, duration, "easeInOutExpo");
                }
            }else{
                if(curStep%10 == 9){
                    $("#mainCanvas > .lineGroup"+i).stop(true, true).animate({
                        left: -sceneWidth*(parseInt(curStep/10)+1)
                    }, duration, "easeInOutExpo");
                }else{
                    $("#mainCanvas > .lineGroup"+i).stop(true, true).animate({
                        left: '-='+randMove
                    }, duration, "easeInOutExpo");
                }
            }
        }
    }
}

function reverseSceneAnimation(duration){
    for(var i=0; i<sliceCount; i++){
        if(i%2==0){
            $("#mainCanvas > .lineGroup"+i).stop(true, true).animate({
                left: -sceneWidth*(totalPage-1)
            }, duration, "easeInOutExpo");
        }else{
            $("#mainCanvas > .lineGroup"+i).stop(true, true).animate({
                left: 0
            }, duration, "easeInOutExpo");
        }
    }
}

$("#endPage > .btnAgain").bind("touchstart", function(e) {
    $(this).addClass("selected");
}).bind("touchend", function(e) {
    _hmt.push(['_trackEvent', 'button_again', 'click', 'PlayAgain']);
    $(this).removeClass("selected");
    createjs.Sound.play("audio_countdown2");
    $("#endPage").fadeOut(0, function(){
        gameFailure(false);
    });
});

$("#endPage > .btnShare").bind("touchstart", function(e) {
    $(this).addClass("selected");
}).bind("touchend", function(e) {
    _hmt.push(['_trackEvent', 'button_share_wechat', 'click', 'ShareWeChat']);
    $(this).removeClass("selected");
    createjs.Sound.play("audio_countdown2");
    popupShow();
});

$("#endPage > .btnLink").bind("touchstart", function(e) {
    $(this).addClass("selected");
}).bind("touchend", function(e) {
    _hmt.push(['_trackEvent', 'button_link_dp', 'click', 'LinkDPMovieFestival']);
    $(this).removeClass("selected");
    createjs.Sound.play("audio_countdown2");
    window.open("http://zan3.com");
});


$("#loading > .btnClose").bind("touchstart", function(e) {
    $(this).addClass("selected");
}).bind("touchend", function(e) {
    $(this).removeClass("selected");
    clearInterval(loadingCouter);
    $("#loading").fadeOut(200);
});

$("#popupFail > .dialog").bind("touchstart", function(e) {
    $(this).find(".btnClose").fadeIn(0);
}).bind("touchend", function(e) {
    $(this).find(".btnClose").fadeOut(0);
    $("#popupFail").fadeOut(200);
});

function popupShow(){
    $("#popupShare > div").css({
        marginTop: 0
    });
    $("#popupShare").fadeIn(200, function(){
        $("#popupShare > div").eq(0).animate({
            marginTop: "+=100"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(1).animate({
            marginTop: "-=50"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(2).animate({
            marginTop: "+=30"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(3).animate({
            marginTop: "-=70"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(4).animate({
            marginTop: "+=20"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(5).animate({
            marginTop: "-=20"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(6).animate({
            marginTop: "+=80"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(7).animate({
            marginTop: "-=30"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(8).animate({
            marginTop: "+=40"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(9).animate({
            marginTop: "-=40"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(10).animate({
            marginTop: "+=10"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(11).animate({
            marginTop: "-=70"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(12).animate({
            marginTop: "+=30"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(13).animate({
            marginTop: "+=20"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(14).animate({
            marginTop: "-=40"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(15).animate({
            marginTop: "+=60"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(16).animate({
            marginTop: "-=30"
        }, 400, "easeInOutExpo");
        $("#popupShare > div").eq(17).animate({
            marginTop: "+=40"
        }, 400, "easeInOutExpo");
    });

    setTimeout(function(){
        $("#popupShare").bind("click", function(){
            $(this).fadeOut(200, function(){
                $(this).unbind("click");
            });
        });
    }, 1000);
}
