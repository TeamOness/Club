(function(window){
	function UXHome(){
		var that = this;
    $(function(){
         that._show();
         that._init();
     })
	}
	UXHome.prototype={
    _init:function(){
      var that = this;
        // 登录状态显示隐藏
       $(".person-login .person-wrap").hover(function(){
          $(this).addClass("person-info");
          $(this).children("a.exit").css({"display":"block"});
        },function(){
          $(this).removeClass("person-info");
          $(this).children("a.exit").css({"display":"none"});
        })
        $('.category-title').eq(0).hover(function(){
            $(".brand-all-wrap").show(300);
        },function(){
             $(".brand-all-wrap").hide();
        });
        $('.brand-all-wrap').hover(function(){
            $(this).show();
        },function(){
            $(this).hide(200);
        });
        $(".recommend-title-bar a.more").each(function(i,ele){
            $(ele).attr("href",$(ele).siblings("a").first().attr("data-more"));
        })
        setTimeout(function(){
            $(".recommend-title-bar a.tab-title").mouseover(function(e){
               var index = $(this).index();
               $(this).parent().nextAll(".carList").eq(index-1).show().siblings(".carList").hide();
               $(this).parent().nextAll(".carList").eq(index-1).find("img").each(function(i,ele){
                    that._loadImg(ele,"data-src-on");
               })
               $(this).siblings("a.more").attr("href",$(this).attr("data-more"));
               var wd=0;
               $(this).prevAll("a.tab-title").each(function(i,ele){
                  if(i=index-1){
                    wd += $(ele).width();
                  }
               })
               var mr = 40*(index-1);
               $(this).siblings("p").stop(true,false).animate({"left":wd+mr+138},200);
               $(this).siblings("p").css({"width":$(this).width()})
            })

            $(".seller-title-bar a").mouseover(function(e){
               var index = $(this).index(".seller-title-bar a");
               $(this).parents(".seller-title-bar").nextAll(".seller-car-list").eq(index-1).show().siblings(".seller-car-list").hide();
               $(this).parents(".seller-title-bar").nextAll(".seller-car-list").eq(index-1).find("img").each(function(i,ele){
                    that._loadImg(ele,"data-src-on");
               })
               $(this).siblings("p").stop(true,false).animate({"left":151*(index-1)},200);
            })
      },100);
    },
		_getOffsetTop: function(obje){
            var parent = obje.offsetParent,
                offsetTop = obje.offsetTop;
            do{
                offsetTop += parent.offsetTop;
            }while(parent = parent.offsetParent);

            return offsetTop;
        },
		_load:function(obj){
			$(obj).find("img[data-src]").each(function(i,ele){
				var src =  $(ele).attr("data-src");
					$(ele).attr("src",src);
					$(ele).removeAttr("data-src");
			})
		},
		_show:function(){
			var that = this;
			 var fs = true;
       var currentHeight = $(window).scrollTop();
        if(currentHeight>0){
          $(window).scrollTop(0);
          $(window).scrollTop(currentHeight);
        }
			$(window).scroll(function(e){
               var currentHeight = $(window).scrollTop(),
                    screenHeight = window.screen.height,
                    // TODO:compatibility
                   		allObj=document.getElementsByName("data-show"),
                   		len = $(".data-show").length;
                   var allImages = document.querySelectorAll('img[data-src]');
                   if(currentHeight>95){
                     if(!$("#cityWrap").is(":hidden")){
                          $("#cityWrap").hide();
                          $("#cityWrap").siblings("dt").removeClass("active");
                      }
                   		if(fs){
	                   		$(".header-wrap").css({"top":-45+"px"});
                        $(".header-wrap").addClass("header-active");
	                   		$(".header-wrap").animate({ "top":0}, 300);
	                   		fs =false;
                   		}
                   }else{
                        $(".header-wrap").css({"top":30+"px"});
                         $(".header-wrap").removeClass("header-active");
						            fs =true;
                   }

                for(var j=0;j< allImages.length; j++){
                   var imgOffsetTop = that._getOffsetTop(allImages[j]);
                   if((currentHeight+screenHeight) > (imgOffsetTop+200)){
                       that._loadImg(allImages[j],'data-src');
                   }
                }   
                for(var i = 0;i < len;i++){
                     var obje = $(".data-show").eq(i),
                    	offsetTop = that._getOffsetTop(obje[0]);
                    if((currentHeight + screenHeight) > (offsetTop+300)){
                        $(obje).children("div.story-self").fadeIn(2000);
                    }
                }
            });
		},
    _loadImg:function(image,src){

        if(!image || typeof($(image).attr(src))=="undefined"){
            return ;
        } 
          //image.style.cssText= '-webkit-animation: fadeIn 01s ease 0.2s 1 both;animation: fadeIn 1s ease 0.2s 1 both;';

          var srcv = image.getAttribute(src);

          image.setAttribute('src', srcv);

          image.removeAttribute(src);
    }
	}	
	window.UXHome = new UXHome;
})(window);