$(function(){
    //var domain_url = $('#free_mobile').data('domain');
    //var carid = $('#free_mobile').data('carid');
    //var type = $('#free_mobile').data('type');
	
	var domain_url = TOP_INFO.domain_url;
	var carid = $('#carid').attr('value');
    //免费电话
    $('#vcodeimg_c').click(function(){
        if ($(this).next().hasClass('error_1')||$(this).next().hasClass('sure')){
            $('#vcodeimg_c').next().remove();
        }
        flush_vcode('#vcodeimg_c',domain_url);
    }); 
    $("#btnTel").click(function(e){
        // 诸葛打点
        $.isFunction(tongji_page_car_freecall) && tongji_page_car_freecall(channel, zg_obj);
        e.preventDefault();
        $("#freeTel").toggle();
        $('#piccode_c').val('请输入图片码').css("color", "#bfbfbf");
    });
    $("#freeTel").mouseup(function(){
        return false;
    });
    
    $(document).mouseup(function(e){
        if($(e.target).parent(".tel").length==0){
            $("#freeTel").hide();
            $("#free_mobile").val('请输入手机号').css("color", "#bfbfbf");
            $('.error_1').remove();
        }
    });  

    $('#piccode_c').on('focus',function(e){
        $(this).val('');
        $('.error_1').remove();
    })
    
    $('#free_tel_click').on('click',function(e){
        var mobile = $('#free_mobile').val();
        var piccode = $('#piccode_c').val();
        var valid = is_valid_mobile(mobile);
        if (valid != 1){
            if ($('#free_mobile').next().hasClass('error_1')){
                return false;
            }
            $('#free_mobile').after("<a href='javascript:void(0)' class='error_1'>" + valid + "</a>");
            return false;
        }
        
        if ($('#piccode_c').val() == '请输入图片码'){
            if ($('.error_1').length == 0){
                $('#piccode_c').next().after("<a href='javascript:void(0)' class='error_1'>请输入图片验证码</a>");
            }
            return false;
        }
        
        if ($('#piccode_c').val() == ''){
            if ($('.error_1').length == 0){
                $('#piccode_c').next().after("<a href='javascript:void(0)' class='error_1'>图片验证码不能为空</a>");
            }
            return false;
        }
        // 诸葛打点
        $.isFunction(tongji_page_car_freecallensure) && tongji_page_car_freecallensure(channel, mobile, zg_obj);
        uxl_track('w_vehicle_details/tel_free_confirm/' + mobile + '/' + carid);
        _smq.push(['custom', '免费电话', '输入号码', '提交成功']);
        install_free_call();
        
        // 4s车辆电话切换
        var client_type = $(this).attr('data-type');
        $.ajax({
            url : domain_url + "/car/free_call/?carid="+carid+"&client_phone="+mobile+"&client_type="+client_type+"&piccode="+piccode+"&channel="+channel,
            dataType: 'jsonp',
            success: function(data){
                if (data['code'] == -1){
                    if ($('.error_1').length == 0){
                        $('#piccode_c').next().after("<a href='javascript:void(0)' class='error_1'>图片验证码错误</a>");
                    }
                }else{
                    if (data['code'] == 1){                            
                        $("#freeTel").hide();
                        show_popup('#phone_info_showing','#phone_info_showing .closeJs');
                        // (new Image).src='http://hm.baidu.com/hm.gif?ep=%7Bid%3Afree_tel_click%2CeventType%3Aclick%7D&et=1&nv=0&si=ae57612a280420ca44598b857c8a9712&st=4&v=pixel-1.0&rnd=' + Math.floor(Math.random() * Math.pow(2, 31));
                        (new Image).src='http://hm.baidu.com/hm.gif?ep=%7Bid%3Aqianlongfree_call_sure%2CeventType%3Aclick%7D&et=1&nv=0&si=ae57612a280420ca44598b857c8a9712&st=4&v=pixel-1.0&rnd=' + Math.floor(Math.random() * Math.pow(2, 31));
                        // 诸葛打点
                        $.isFunction(tongji_page_car_freecallensure_ok) && tongji_page_car_freecallensure_ok(channel, mobile, zg_obj);
                        $("#free_mobile").val('请输入手机号').css("color", "#bfbfbf");    
                    }
                }
                flush_vcode('#vcodeimg_c',domain_url);
            },
        });
    });

    //发送到手机弹出JS
    $("#telP").click(function(){
        warning_hidden('', 'mobile_w');
        warning_hidden('', 'vcode_w');
        clear_invalid();
        show_popup("#telPop",".closeJs");
        if ($('#vcodeimg').length == 0){
            var time = new Date();
            var url = domain_url +'/register/get_vcode?r='+time.getTime();
            $('.getNum').html('<img src="' + url +'" id="vcodeimg"/>');
            $('#vcodeimg').bind('click',function(){
                $('#vcodeimg').prop('src', url);
            })
        }
    }); 

    //图集lazyload功能
    $("img.lazy,img.lazyload").lazyload({
        // effect : "fadeIn",
        threshold : 150,
        failure_limit : 10,
        skip_invisible : true
    }); 
    showTabPic('div.rec-tit>a','div.slideRec');
    showTabPic('div.tab-btn>a','div.car-big','img.lazy');
    function showTabPic(s1,s2,sImg) {
        var sImg = sImg || 'img.lazyload';
        $(s1).on('click',function () {
            $(s2).eq($(this).index()).find(sImg).each(function (i,e) {
                $(e).attr('src',$(e).data('original'));
            });
        })
    }
    //图集弹出js
    /*
    $(".img-album").click(function(){
        var index = $(this).data('index');
        $("li[name^='pic_']").hide();
        $("li[name='pic_"+index+"']").show();
        show_popup("#carAtlas",".closeJs");
        $(".shade").addClass("black");
        $('body').css('overflow','hidden');
    });
    */

    altClick('.img-album','#carAtlas'); 
    function altClick(a,b){
            $(a).click(function(){
                $(b).find('img.lazyload').each(function(i,e){
                    var sRealSrc = $(e).data('original');
                    $(e).attr('src',sRealSrc).fadeIn(); 
                });
                var index = $(this).data('index');
                $("li[name^='pic_']").hide();
                $("li[name='pic_"+index+"']").show();
                show_popup($(b),".closeJs",'album');
                //$(".shade").addClass("black");
                $(".album-pic-shade").show();
                $('body').css("overflow","hidden");
                $(".closeJs").click(function(){
                    $('body').css("overflow","scroll");
                    $(".album-pic-shade").hide();
                })
            });
        }

    $(".motor-list").slide({
        titCell:".hd ul",
        mainCell:".bd ul",
        effect:"fold",
        interTime:3500,
        delayTime:500,
        autoPlay:true,
        autoPage:true,
        trigger:"click"
        //startFun:function(i,c){
            // $("li[name=pic_"+i+"] img").attr("src", $("li[name=pic_"+i+"] img").attr("data-original"));
        //},
    });

    $(".banner-box").slide({
        titCell:".hd ul",
        mainCell:".bd ul",
        effect:"fold",
        interTime:3500,
        delayTime:500,
        autoPlay:false,
        autoPage:true,
        trigger:"click",
    });  
    //查看付一半详情弹窗信息
    $(".n-pay").click(function(){
        zhuge_track("C-付一半业务详情页-无月供查看详情",{ "城市": $("#current_city_id").html() });
        uxl_track('w_vehicle_details/half_detail/np/' + carid);
        $(".payNone").toggle(); 
        $(".payHave").hide();;
        $(".hprice-con").scrollTop(0);
        $(this).find('em').toggleClass("active");
        $(".h-pay").find('em').removeClass("active");
    })
    $(".h-pay").click(function(){
        zhuge_track("C-付一半业务详情页-有月供查看详情",{ "城市": $("#current_city_id").html() });
        uxl_track('w_vehicle_details/half_detail/hp/' + carid);
        $(".payHave").toggle();
        $(".payNone").hide();
        $(".hprice-con").scrollTop(220);
        $(this).find('em').toggleClass("active");
        $(".n-pay").find('em').removeClass("active");
    })
    $("#n-pay-down").click(function(){
         zhuge_track("C-付一半业务详情页-无月供-下载APP提审材料",{ "城市": $("#current_city_id").html() });
         uxl_track('w_vehicle_details/half_detail/np/dl_app/' + carid);
    })
    $("#h-pay-down").click(function(){
         zhuge_track("C-付一半业务详情页-有月供-下载APP提审材料",{ "城市": $("#current_city_id").html() });
         uxl_track('w_vehicle_details/half_detail/hp/dl_app/' + carid);
    })
    $(".npay-btn").click(function(){
        $(".payNone").hide();
        $(".n-pay em").removeClass("active");
    })
    $(".hpay-btn").click(function(){
        $(".payHave").hide();
        $(".h-pay em").removeClass("active");
    }) 

    // 返回顶部按钮自动换色
    $(window).scroll(function(){
        if ($(window).scrollTop()>360){
            $('.fixed-tit').show();
        }else if($(window).scrollTop()<360){
            $('.fixed-tit').hide();
        }
        if ($(window).scrollTop()>10){
            $('#goTop').addClass("goTopHover");
            $('.fixed-head-wrap').addClass("addShadow");
        }else if($(window).scrollTop()<10){
            $('#goTop').removeClass("goTopHover");
            $('.fixed-head-wrap').removeClass("addShadow");
        }
    });  
    
});

//添加百度监测
function hmt_add(type,id){
    _hmt.push(['_trackEvent', 'CarInterest', 'CI_'+type, 'CI_'+type+'_'+id] );
    return true;
}

// 安装百度监测免费电话代码
function install_free_call() {
    var _mvq = window._mvq || [];window._mvq = _mvq;
    _mvq.push(['$setAccount', 'm-155044-0']);
    
    var d = new Date();
    var id = d.getYear().toString() + (d.getMonth() + 1).toString() + d.getDate().toString() + d.getHours().toString();
    id += d.getMinutes().toString() + d.getSeconds().toString() + "." + Math.random();
    _mvq.push(['custom', 'jzqu1', /*免费电话*/ id,  '']);
    _mvq.push(['$logConversion']);
}
