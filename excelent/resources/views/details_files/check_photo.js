$(function(){
	if( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ) {
		if(navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] && navigator.mimeTypes['application/x-shockwave-flash'].description){
        	var desc = navigator.mimeTypes['application/x-shockwave-flash'].description.toLowerCase();
        	if (desc.indexOf('adobe') > -1) $("#carAtlas .closeJs").css({'top':-5});
        }
	}
	$(".slide-pic").slide({
		titCell:".hd ul",
		mainCell:".bd ul",
		effect:"fold",
		interTime:3500,
		delayTime:500,
		autoPlay:false,
		autoPage:true,
		trigger:"click",
		defaultIndex:0,
		endFun: function(i,c){
			$('.tab-mode a').attr('data-page', i + 1);
		}
	});
	$(".cpic").click(function(){//弹框弹出关闭
	    	$(".pic-shade").show();
        	$(".popup-pic").show();
	    })
	    $(".car-cls").click(function(){
	    	$(".pic-shade").hide();
        	$(".popup-pic").hide();
	})
	$(".list-pic li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var page = 0;
		$(".list-con.actived .list-pic li").each(function(i, ele){
			if($(ele).hasClass('active')) page = i;
		});
		$('.tab-mode a').attr('data-page', page + 1);
	})
	$(".tab-mode a").on('click', function(){
		var mode = $(this).attr('data-mode');
		switch(mode){
			case 'list':
				$(".tab-mode a").html("<i></i>列表模式").children().removeClass("return");
	    		$(".list-con .list-pic").hide();
	    	    $(".list-con .slide-pic").show();
	    	    $(this).attr('data-mode','photo');
				$(".slide-pic").slide({
					titCell:".hd ul",
					mainCell:".bd ul",
					effect:"fold",
					interTime:3500,
					delayTime:500,
					autoPlay:false,
					autoPage:true,
					trigger:"click",
					defaultIndex:(parseInt($(this).attr('data-page')) - 1),
					endFun: function(i,c){
						$('.tab-mode a').attr('data-page', i + 1);
					}
				});	    	    
				break;
			case 'photo':
				$(".tab-mode a").html("<i></i>返回大图").children().addClass("return");
				$(".list-con .slide-pic").hide();
	    		$(".list-con .list-pic").show();
	    		$(this).attr('data-mode','list');
	    		$(".list-pic li").removeClass('active');
	    		$(".list-pic li:nth-of-type(" + $(this).attr('data-page') + ")").addClass("active")
				break;
		}

	})

})