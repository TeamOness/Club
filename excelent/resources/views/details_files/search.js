$(function(){
	function changeRadio(fatherWrap){
		var fatherWrap=$(fatherWrap);
		fatherWrap.find('input').bind('change',function(){
			if($(this).prop('checked')){
				fatherWrap.find('label').removeClass("checked");
				$(this).parent().addClass("checked");
				// if(fatherWrap.hasClass('brand-wrap')){
				// 	$(".car-type").show();
				// }
			}
		})
	}
	changeRadio(".brand-wrap");
	changeRadio(".car-type");
	changeRadio(".car-price");
	changeRadio(".color-type");
    
	var scrollChangeVal  = 0 ;
	
	function moreClick(h,m,openHtml,retractHtml,moreActive){
		
		var handle=$(h),divMore=$(m);
		handle.bind('click',function(){
			var self = $(this);
			if(divMore.css("display")=="block"){
				if(h == '#putaway'){
					if(scrollChangeVal != 0){
						$(document).scrollTop(scrollChangeVal);
					}else{
						$(document).scrollTop(self.parent().attr('scrollVal'));
					}
				}
				divMore.hide();
				handle.html(openHtml).removeClass(moreActive);
			}
			else if(divMore.css("display")=="none"){
				if(typeof(scrollChangeVal) == "undefined"){
					self.parent().attr('scrollVal',$(document).scrollTop());
				}else{
					scrollChangeVal = $(document).scrollTop();
				}				
				divMore.show();
				handle.html(retractHtml).addClass(moreActive);
			}
		})
	}
	moreClick("#moreBtn","#moreInfo","更多<b class='searched-ico more-ico'></b>","收起<b class='searched-ico more-ico'></b>","more-active");
	moreClick("#moreCondition","#conditionInfo","更多条件<b class='searched-ico'></b>","收起条件<b class='searched-ico'></b>","open");
	// moreClick("#putaway","#ulover","新车参数<b class='searched-ico'></b>","收起参数<b class='searched-ico'></b>","open2")
	moreClick("#putads","#ulover2","查看其他城市<b class='sale-icon'></b>","<b class='sale-icon'></b>","arw-more2")
	moreClick("#putaway","#ulover","更多参数配置<b class='searched-ico'></b>","收起<b class='searched-ico'></b>","open2")

	if(!$(".brand-nav li").hasClass("active")){
		$(".brand-nav li:first").addClass("active");
	}
	// $(".brand-info li:first").show();
	$(".brand-nav li").each(function(index){
		$(this).click(function(){
			$(".brand-info li").hide();
			$(".brand-nav li").removeClass("active");
			$(this).addClass("active");
			$(".brand-info li").eq(index).show();
		})
	})

	var num  = $(".car-source input").size()+1;
	for(var i = 1; i<num; i++){
		 $("#sourceCheck_"+i).next().click(function(){
    		if(!$(this).hasClass('source-active')){
			  $(this).addClass("source-active");
			}else{
			  $(this).removeClass("source-active");
			}
		 });
	 }
	 $(".car-source li").each(function(index){
	 	$(".car-source li em").hide();
	 	$(".car-source li em").eq(0).show();
	 	$(this).hover(function(){
	 		$(".car-source li em").hide();
	 		$(".car-source li em").eq(index).show();
	 	},function(){
	 		$(".car-source li em").hide();
	 		$(".car-source li em").eq(0).show();
	 	})
	 })
})