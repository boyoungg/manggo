$(document).ready(function(){
    // 무한 반복 슬라이딩 //
    
    let current= 0;
    let show = 5;
    let container = $('.sliding-view .container');
    let length = container.find('>li').length;
    let view =  $('.sliding-view').width();
    let tt = view/show; //이동거리 -한칸씩 움직이기//
    let next = $('.sliding-box .right');
    let prev = $('.sliding-box .left');
    
    container.css('width','length*tt');//컨테이너 길이 초기화//
    
    next.on({
    click:function(){
    
    if(current == length) {//마지막 엘리먼트에 다다르면 current 초기화//
    current = 0;
    }
    
    if(current == 0){
    //먼저 복사된 엘리먼트 삭제하고 위치 초기화//
    container.find('>li').eq(length-1).nextAll().remove();
    container.css({left:0}).stop();
    
    //이동//
    current++;
    container.stop().animate({left:tt*current*-1},{duration:900});	
    
    //엘리먼트 복사 - 컨네이너의 자식 모두 복사//
    let cloneEl = container.children().clone();
    //복사된 엘리먼트 수 만큼 길이 늘리고 붙이기//
    container.css({width:container.innerWidth()+(tt*length)});
    cloneEl.appendTo(container);
    }
    else if(current >= 1){
    
    current++;
    container.stop().animate({left:tt*current*-1},{duration:900});	
    }			
    
    },
    mouseenter:function(){
    clearInterval(Sliding);
    },
    mouseleave:function(){
    slidingTimer();
    }
    });
    
    prev.on({
    click:function(){
    if(current == 0){
    //먼저 복사된 엘리먼트 삭제하고 위치 초기화//
    container.find('>li').eq(length-1).nextAll().remove();
    container.css({left:0}).stop();
        
    //인덱스 순서를 length로 치환해줌//
    current=length;
    
    //앞쪽으로 엘리먼트 복사해서 붙이기//
    //길이 & 위치 초기화 -앞쪽으로 붙었기 떄문에 늘어난 길이 만큼 left시작 위치가 -가 되어야함//
    let cloneEl = container.children().clone();
    
    container.css({left:tt*length*-1,width:container.innerWidth()+(tt*length)}).stop();
    cloneEl.prependTo(container);
    
    //붙이고 나서 바로 이동 되도록//
    current--;
    container.stop().animate({left:tt*current*-1},{duration:900});
    }
    else if(current > 0 ){
    current--;
    container.stop().animate({left:tt*current*-1},{duration:900});
    }
    
    },
    mouseenter:function(){
    clearInterval(Sliding);
    },
    mouseleave:function(){
    slidingTimer();
    }
    });
    
    
    //컨테이너에 hover 되면 타이머 일시정지//
    container.on({
    mouseenter:function(){
    clearInterval(Sliding);
    },
    mouseleave:function(){
    slidingTimer();
    }
    });
    
    slidingTimer();
    
    //자동 슬라이딩 타미머 함수 정의//
    function slidingTimer(){
    Sliding = setInterval(function(){
    
    next.trigger('click');
    
    },3000);
    }
    });