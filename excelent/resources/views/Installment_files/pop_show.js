$(function(){
	//新车付一半详情页-付一半弹框
        MenuClick('#hprice','#halfPrice'); 
		function MenuClick(a,b){
			$(a).click(function(){
				show_popup($(b),".closeJs");
				$('html').addClass('sidebar-move');
			    // var scroTop = $(document).scrollTop();
	 	    //    	flos = scroTop;
		 	    $(".closeJs").click(function(){
		 	    	$('html').removeClass('sidebar-move');
		 	    })
			});
	    }
	    altClick('#atlas','#carAtlas'); 
		function altClick(a,b){
			$(a).click(function(){
				show_popup($(b),".closeJs");
				$(".shade").addClass("black");
			    $('body').css("overflow","hidden");
		 	    $(".closeJs").click(function(){
		 	    	$('body').css("overflow","scroll");
		 	    })
			});
	    }
    //立即注册弹出js
	$("#reg").click(function(){
		show_popup("#redeemPrizes",".closeJs");
	});
	//登录弹出js
	$("#loginA").click(function(){
		show_popup("#popupLogin",".closeJs");
	});
	//下一步弹出js
	$("#forgetp").click(function(){
		show_popup("#forPass",".closeJs");
	});
	//对比车辆弹出js
	$("#comparecar").click(function(){
		show_popup("#compareC",".closeJs");
	});
	//浏览记录弹出js
	$("#browse").click(function(){
		show_popup("#lookFor",".closeJs");
	});
	//收藏车辆弹出js
	$("#store").click(function(){
		show_popup("#stroeUp",".closeJs");
	})
	//温习提示弹出js
	$("#tip").click(function(){
		show_popup("#warmTip",".closeJs");
	});
	//下一步弹出js
	$("#next").click(function(){
		show_popup("#forgetNext",".closeJs");
	});
	//下载弹出js
	$("#dload").click(function(){
		show_popup("#dloadPage",".closeJs");
	});

	//车辆关键部位js
	$("#key").click(function(){
		show_popup("#kPart",".closeJs");
	});
	//检测报告js
	$("#test").click(function(){
		show_popup("#tItem",".closeJs");
	});
	//非事故车标准js
	$("#stand").click(function(){
		show_popup("#Standard",".closeJs");
	});
	//请输入手机号js
	$("#dtel").click(function(){
		show_popup("#idTel",".closeJs");
	});
	//请输入邀请码js
	$("#dcode").click(function(){
		show_popup("#idCode",".closeJs");
	});
	//请输入完善您的个人信息1js
	$("#contact").click(function(){
		show_popup("#contWay",".closeJs");
	});
	//请输入完善您的个人信息2js
    $("#infor").click(function(){
		show_popup("#idInfor",".closeJs");
	});
	$("#credit").click(function(){
		show_popup("#creditYes",".closeJs");
	});
	$("#oexter").click(function(){
		show_popup("#oDetect",".closeJs");
	});
	$("#iexter").click(function(){
		show_popup("#iDetect",".closeJs");
	});
	$("#bexter").click(function(){
		show_popup("#bDetect",".closeJs");
	});
	$("#dexter").click(function(){
		show_popup("#dDetect",".closeJs");
	});
	$("#sexter").click(function(){
		show_popup("#sDetect",".closeJs");
	});
	$("#gexter").click(function(){
		show_popup("#gDetect",".closeJs");
	});
	$("#invest").click(function(){
		show_popup("#cInvest",".closeJs");
	});
	$("#noinvest").click(function(){
		show_popup("#cnoInvest",".closeJs");
	});
	$("#ftel").click(function(){
		show_popup("#freeTel",".closeJs");
	});
	$("#dhprice").click(function(){
		show_popup("#dhPrice",".closeJs");
	});
	$("#gmotor").click(function(){
		show_popup("#gMotor",".closeJs");
	});
	$("#soil").click(function(){
		show_popup("#sOil",".closeJs");
	});
	$("#gbrand").click(function(){
		show_popup("#gBrand",".closeJs");
	});
	$("#ginter").click(function(){
		show_popup("#gInter",".closeJs");
	});
	$("#store-ads").click(function(){
		show_popup("#storeAds",".closeJs");
	});
	$("#apt-suc").click(function(){
		show_popup("#aptSuc",".closeJs");
	});
	$("#apt-fail").click(function(){
		show_popup("#aptFail",".closeJs");
	});
	$("#wait-half").click(function(){
		show_popup("#wHalf",".closeJs");
	});
	$("#ex-fail").click(function(){
		show_popup("#exFail",".closeJs");
	});
	$("#uxt-ask").click(function(){
		show_popup("#uAsk",".closeJs");
	});
	$("#hlight").click(function(){
		show_popup("#hLight",".closeJs");
	});
})