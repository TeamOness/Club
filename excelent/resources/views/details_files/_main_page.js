$(function(){
	//通用header-top初始化
	var ename = TOP_INFO.location.ename||'';
	var domain_url = TOP_INFO.domain_url||'';
	$.ajax({
            url : domain_url+"/ajax/top_load/?ename="+ename,
            dataType: 'jsonp',
            success: function(data){
				TOP_INFO.user = data['user'];
				TOP_INFO.half_city = data.half_city || [];
				if($.isEmptyObject(TOP_INFO.location)){
					TOP_INFO.location = data.location;
				}
		        if (window.location.search.indexOf('channel')===-1){
		            $(".a_buypage").attr('href', $('#php_half_city_link').attr('sname') + "/" + TOP_INFO.location.ename + "/s/");
		        } else {
		            $(".a_buypage").attr('href', $('#php_half_city_link').attr('sname') + "/" + TOP_INFO.location.ename + "/s/" + '?channel=' + location.search.replace(/.*?channel=([^\s&]+).*/, "$1")) ;
		        }
				$("#cityWrap ul li a").each(function(i,item){
					$(this).removeClass('cur');
					if($(this).text() == TOP_INFO.location.cityname){
						$(this).addClass('cur');
					}
				})				
				$('#current_city_id').html(TOP_INFO.location.cityname);

				if(( TOP_INFO.half_city.indexOf(TOP_INFO.location.cityid.toString()) != -1 )||(TOP_INFO.location.cityid == 0)){
				 	$("#li_halfprice").show();
				 	$(".php_li_half").show();
		            if (window.location.search.indexOf('channel')===-1){
		            	$('#php_half_city_link').attr('href', $('#php_half_city_link').attr('sname') + '/' + TOP_INFO.location.ename + '/h/');
		            } else {
		            	$('#php_half_city_link').attr('href', $('#php_half_city_link').attr('sname') + '/' + TOP_INFO.location.ename + '/h/' + '?' + 'channel=' + location.search.replace(/.*?channel=([^\s&]+).*/, "$1"));
		            }
				 }else{
				 	$("#li_halfprice").hide();
				 	$(".php_li_half").hide();
				 }
				if( !$.isEmptyObject(TOP_INFO.user) ){
					//提示成功注册时，执行以下语句
					_hmt.push(['_trackEvent', 'Login', ' Login_auto']);
				
					var html = '<div class="person-wrap" >'+
									'<p class="phone-info"><b class="ico person-ico"></b>'+
									'<a href="'+domain_url+'/i/">'+TOP_INFO.user.mobile+'</a></p>'+
									'<a href='+domain_url+"/login/out/"+' class="exit">退出</a>'+
								'</div>';
					
					$("#xin_top_userinfo").html(html);
					$(".person-wrap").hover(
						function(){ $(this).addClass("person-info"); },
						function(){ $(this).removeClass("person-info"); }
					);
					
				} else {
					var html = '<div class="person-wrap" style="top:0px;">'+
								'<a href="javascript:clear_invalid();show_popup(\'#popupLogin\',\'#popupLogin .closeJs\');" id="loginA" >登录</a>/'+
								'<a href="' + $('#xin_top_userinfo').attr('sname') + '/register/" id="regA"  rel="nofollow">注册</a>'+
								'</div>';
					$("#xin_top_userinfo").html(html);
					var url = domain_url + "/register/get_vcode/";
					$('#loginA,#store').bind('click',function(e){
        				$('#popupLogin .PageNum').eq(0).html('<img src="' + url +'" id="vcodeimg_l"/>');
		                $('#vcodeimg_l').bind('click', function () {
		                    if ($('#vcodeimg_l').next().hasClass('error') || $('#vcodeimg_l').next().hasClass('sure')) {
		                        $('#vcodeimg_l').next().remove();
		                    }
		                    flush_vcode('#vcodeimg_l',domain_url);
		                });
		            })	
					
					//需要登陆时 弹出登陆框
					if (typeof TOP_GET !== 'undefined'){
						if(TOP_GET.login){
							clear_invalid();
							show_popup('#popupLogin','#popupLogin .closeJs');
						}
					}	
				}
				//头部信息加载后执行的逻辑
				if(typeof _top_info_end =="function"){
					_top_info_end();
				}

				if (typeof _top_info_star == 'function'){
					_top_info_star();
				}
            },
        });
   /**
 	* 验证码60秒倒计时功能
 	* @param {[type]} o [description]
 	*/
    function get_code_time(o){
    	this.wait = 120;
    	this.o = o ;
    	this.timer = null;
    	this.exec = function(){
    		if(!$(this.o).is(":visible")){
    			this.wait = 0;
    		}
	    	if (this.wait == 0){
	    		this.o.removeAttribute("disabled");
	    		this.o.value = "获取验证码";  
				this.wait = 120;
				clearTimeout(this.timer)
	    	} else {
	    		this.o.setAttribute("disabled", true);
	    		this.o.value = this.wait + 's后重新发送';
				this.wait--;
				this.timer = setTimeout(function(){
                	this.exec();
            	}, 1000);		
	    	}
    	}
		this.exec();
    }
    // 获取验证码处理函数
   $("#need_code,#need_code1,#need_code3,#need_code4,#need_code_studio").click(function(e){
		var o = this;
		var piccode = ''
    	var id = $(o).parent().prev().children(":input").attr("id"); 
    	var typeVal = get_type(id);
    	if ($(this).attr('id') == 'need_code'){
    		var mobile = $('#regi_mobile').val();
    		var typeVal = 'reg';
    		piccode = $('#piccode').val();
    	}
    	else if ($(this).attr('id') == 'need_code1'){
    		var mobile = $('#search1').val();
    		var typeVal = 'login';
    		piccode = $('#piccode_r').val();

    	}
    	else if ($(this).attr('id') == 'need_code3'){
    		var mobile = $('#search3').val();
    		var typeVal = 'get';
    		piccode = $('#piccode_g').val();
    	}
    	else if ($(this).attr('id') == 'need_code_studio'){
    		var mobile = $('#studio_mobile').val();
    		var typeVal = 'order';
    		piccode = $('#piccode_o').val();
    	}
    	else{
    		var mobile = $("#"+id).val();
    	}
    	if (mobile == '请输入手机号'){
    		if ($(this).attr('id') == 'need_code'){
    			add_hint($('#regi_mobile'),'<b class="error">请输入手机号</b>','error');
    		}
    		else if ($(this).attr('id') == 'need_code1'){
	    		add_hint($('#search1'),'<b class="error">请输入手机号</b>','error');
	    	}
	    	else if ($(this).attr('id') == 'need_code3'){
	    		add_hint($('#search3'),'<b class="error">请输入手机号</b>','error');
	    	}
	    	else if ($(this).attr('id') == 'need_code_studio'){
	    		add_hint($('#studio_mobile'),'<b class="error">请输入手机号</b>','error');
	    	}
    		else{
    			add_hint($('#'+id),'<b class="error">请输入手机号</b>','error');	
    		}	
    		return false;
    	}

    	if (is_valid_mobile(mobile) != 1){
    		if ($(this).attr('id') == 'need_code'){
    			add_hint($('#regi_mobile'),'<b class="error">无效的手机号</b>','error');
    		}
    		else if ($(this).attr('id') == 'need_code1'){
	    		add_hint($('#search1'),'<b class="error">无效的手机号</b>','error');
	    	}
	    	else if ($(this).attr('id') == 'need_code3'){
	    		add_hint($('#search3'),'<b class="error">无效的手机号</b>','error');
	    	}
	    	else if ($(this).attr('id') == 'need_code_studio'){
	    		add_hint($('#studio_mobile'),'<b class="error">无效的手机号</b>','error');
	    	}
    		else{
    			add_hint($('#'+id),'<b class="error">无效的手机号</b>','error');	
    		}	
    		return false;
    	}

    	if ($(this).attr('id') == 'need_code'){
    		var piccode = $('#piccode').val();
    		if (piccode == '请输入图片码'){
    			add_hint($('#piccode').next(),'<b class="error">请输入图片码</b>','error');
    			return false;
    		}
    	}else if ($(this).attr('id') == 'need_code1'){
    		var piccode = $('#piccode_r').val();
    		if (piccode == '请输入图片码'){
    			add_hint($('#piccode_r').next(),'<b class="error">请输入图片码</b>','error');
    			return false;
    		}
    	}
    	else if ($(this).attr('id') == 'need_code3'){
    		var piccode = $('#piccode_g').val();
    		if (piccode == '请输入图片码'){
    			add_hint($('#piccode_g').next(),'<b class="error">请输入图片码</b>','error');
    			return false;
    		}
    	}
    	else if ($(this).attr('id') == 'need_code_studio'){
    		var piccode = $('#piccode_o').val();
    		if (piccode == '请输入图片码'){
    			add_hint($('#piccode_o').next(),'<b class="error pos-error">请输入图片码</b>','error');
    			return false;
    		}
    	}
    	if (($('.error').length > 0)&&(!$('#need_code1').next().hasClass('.error'))&&(!$('#need_code3').next().hasClass('.error'))){
    		return false;
    	}

    	$.ajax({
            url : domain_url+"/register/send/?mobile="+mobile+"&login="+typeVal+"&piccode="+piccode,
            dataType: 'jsonp',
            success: function(data){
                if (data['code'] == 1){
	    			get_code_time(o);
	    		}else{
	    			if ($(o).attr('id') == 'need_code'){
			    		add_hint($('#piccode').next(),'<b class="error">图片码验证码错误</b>','error');
			    	}else if ($(o).attr('id') == 'need_code1'){
			    		add_hint($('#piccode_r').next(),'<b class="error">图片验证码错误</b>','error');
			    	}
			    	else if ($(o).attr('id') == 'need_code3'){
			    		add_hint($('#piccode_g').next(),'<b class="error">图片验证码错误</b>','error');
			    	}
			    	else if ($(o).attr('id') == 'need_code_studio'){
			    		add_hint($('#piccode_o').next(),'<b class="error pos-error">图片验证码错误</b>','error');
			    	}
	    		}
            },
        });	
	})
	/**
	 * 点击注册
	 */
	$("#register_now").click( function () {
		_hmt.push(['_trackEvent', 'Register', 'Register_submit']); 
		var mobile = $('#regi_mobile').val();
		var password=  $('#psw2').val();
		var cpassword =  $('#psw4').val();
		var validatecode = $('#validatecode').val();
		var piccode = $('#piccode').val();
		var typeVal = 'reg';
		if (mobile == '请输入手机号'){
			add_hint($('#regi_mobile'),'<b class="error">手机号错误</b>','error');
			return false;
		}
		if (piccode == '请输入图片码'){
			add_hint($('#piccode').next(),'<b class="error">请输入图片码</b>','error');
			return false;
		}
		if (validatecode == '六位数字验证码'){
			add_hint($('#validatecode').next(),'<b class="error">请输入验证码</b>','error');
			return false;
		}
		if ($('#psw1').css("display")=="inline-block"){
			add_hint($('#psw1'),'<b class="error">请输入密码</b>','error');
			return false;
		}
		if ($('#psw3').css("display")=="inline-block"){
			add_hint($('#psw3'),'<b class="error">密码不一致</b>','error');
			return false;
		}
		if ($('#redeemPrizes .error').length > 0){
			return false;
		}
		//
		$.post('/register/register_user/',{ 'mobile':mobile, 'password':password, 'validatecode' :validatecode, 'login':typeVal, type:'ajax' },function(data){
			if (data == -1){
				add_hint($('#validatecode').next(),'<b class="error">验证码错误</b>','error');
			}
			else
			if (data == -6){
				add_hint($('#regi_mobile'),'<b class="error">手机号错误</b>','error');
			}
			else
			if (data == -2){
				add_hint($('#validatecode').next(),'<b class="error">验证码已过期</b>','error');
			}
			else{
				_hmt.push(['_trackEvent', 'Register', 'Register_done']);
				if (TOP_INFO.location.ename){
					window.location.href='/'+TOP_INFO.location.ename+'/';
				}
				else{
					window.location.href = '/quanguo/';
				}
			}
		});	
	});
	
	//下一步，
	$("#next_step").click( function () {
		var mobile = $('#search3').val();
		var code =  $('#search4').val();
		var piccode = $('#piccode_g').val();
		if((typeof mobile == 'undefined')||(mobile.toString().length < 1)||(mobile =='请输入手机号')){
			add_hint($('#search3'),'<b class="error">请输入手机号</b>','error');
			return false;
		}		
		if (piccode == '请输入图片码'){
			add_hint($('#piccode_g').next(),'<b class="error">请输入图片码</b>','error');
			return false;
		}
		if ((typeof code == 'undefined')||(code.toString().length < 1)||(code =='六位数字验证码')){
			add_hint($('#search4').next(),'<b class="error">请输入验证码</b>','error');
			return false;
		}
		if ($('#search3').next().hasClass('error')||$('#search4').next().hasClass('error')){
			return false;
		}
		var typeVal = 'get';

		$.ajax({
            url : domain_url+"/register/check_vcode/?mobile="+mobile+"&validatecode="+code+"&login="+typeVal,
            dataType: 'jsonp',
            success: function(data){
                if(data['code'] == 1){
					$(".shade").remove();
					$("#forPass").hide();
					show_popup("#forgetNext","#forgetNext .closeJs");
				}
				else
				if (data['code'] == -1){
					add_hint($('#search4').next(),'<b class="error">验证码错误</b>','error');
				}
				else
				if (data['code'] == -2){
					add_hint($('#search4').next(),'<b class="error">验证码已过期</b>','error');
				}
				else
				if (data['code'] == -5){
					add_hint($('#search3'),'<b class="error">验证码已过期</b>','error');
				}
            },
        });	
	}) 
	
	//重置密码
	$("#reset_passwd").click( function () {
		var passwd = $('#psw8').val();
		var cpasswd =  $('#psw10').val();
		if ($('#psw7').css("display")=="inline-block"){
			add_hint($('#psw7'),'<b class="error">请输入密码</b>','error');
			return false;
		}
		if ($('#psw9').css("display")=="inline-block"){
			add_hint($('#psw9'),'<b class="error">请输入密码</b>','error');
			return false;
		}
		if (passwd != cpasswd){
			add_hint($('#psw10'),'<b class="error">两次输入的密码不一致</b>','error');
			return false;
		}
		$.ajax({
            url : domain_url+"/getpasswd/reset_passwd/?passwd="+passwd,
            dataType: 'jsonp',
            success: function(data){
                if(data['code'] == 1){
					window.location.reload();
				}
				else{
					add_hint($('#psw10'),'<b class="error">两次输入的密码不一致</b>','error');
				}
            },
        });	
	})
	
	//重置密码
	$("#change_pass").click( function () {
		var passwd = $('#psw14').val();
		var cpasswd =  $('#psw16').val();
		if ($('#psw11').css("display")=="inline-block"){
			add_hint($('#psw11'),'<b class="error">请输入原密码</b>','error');
			return false;
		}
		if ($('#psw13').css("display")=="inline-block"){
			add_hint($('#psw13'),'<b class="error">请输入密码</b>','error');
			return false;
		}
		if ($('#psw15').css("display")=="inline-block"){
			add_hint($('#psw15'),'<b class="error">请输入密码</b>','error');
			return false;
		}
		if (is_valid_pass(passwd) != 1){
			return false;
		}
		if (passwd != cpasswd){
			add_hint($('#psw16'),'<b class="error">两次输入的密码不一致</b>','error');
			return false;
		}
		if ($('#psw12').next().hasClass('error')){
			return false;
		}
		
		$.post('/i/resetpasswd/reset_passwd/',{ 'passwd':passwd, type:'ajax' },function(data){
			if(data == 1){
				var msg = '主人，密码修改成功啦';
				$("#warmTip10 .span_xin_msg").text(msg);
				show_popup("#warmTip10","#warmTip10 .closeJs");
				setTimeout("window.location.href='/i/favorite/'",3000);
			}
			else{
				add_hint($('#psw10'),'<b class="error">两次输入的密码不一致</b>','error');
			}
		});
	})
	//登录
	$("#login_btn").click(function(){		
		if($(".logintab a").first().hasClass("active")){
			//手机号密码登陆
			var mobile = $("#search").val();
			var piccode = $('#piccode_l').val();
			var password = $("#psw6").val();
			var valid = is_valid_mobile(mobile);
			if (valid != 1){
				add_hint($('#search'),'<b class="error">' + valid + '</b>','error');
				return false;
			}
			var vapass = is_valid_pass(password);
			if (vapass != 1){
				add_hint($('#psw6'),'<b class="error">' + vapass + '</b>','error');
				return false;
			}
			var login_type = 'p';
		}
		else{
			// 手机号验证码登陆
			var mobile = $("#search1").val();
			var password = $("#search2").val();
			var valid = is_valid_mobile(mobile);
			var piccode = $('#piccode_r').val();
			if (valid != 1){
				add_hint($('#search1'),'<b class="error">' + valid + '</b>','error');
				return false;
			}
			if (piccode == '请输入图片码'){
				add_hint($('#piccode_r').next(),'<b class="error">请输入图片码</b>','error');
				return false;
			}
			if (isNaN(password)&&(password.toString().length != 6)){
				add_hint($('#search2').next(),'<b class="error">验证码错误</b>','error');
				return false;
			}
			if (($("#search2").next().next().hasClass('error') == true)||($('#search1').next().hasClass('error') == true)){
				return false;
			}
			var login_type = 'c';
		}


		$.ajax({
            url : domain_url+"/login/check/?mobile="+mobile+"&password="+password+"&login="+login_type+"&piccode="+piccode,
            dataType: 'jsonp',
            success: function(data){
            	if (data < 0){
            		flush_vcode('#vcodeimg_r',domain_url);
            		flush_vcode('#vcodeimg_l',domain_url);
            	}
                if (data['code'] == -1){			
					add_hint($('#search2').next(),'<b class="error">验证码错误</b>','error');
				}
				else
				if (data['code'] == -2){
					add_hint($('#search2').next(),'<b class="error">验证码已过期</b>','error');
				}
				else
				if (data['code'] == -5){
					add_hint($('#search1'),'<b class="error">手机号错误</b>','error');
				}
				else
				if (data['code'] == -4){
					add_hint($('#search1'),'<b class="error">手机号不存在</b>','error');
				}
				else
				if (data['code'] == -3){
					add_hint($('#psw6'),'<b class="error">密码错误</b>','error');
				}
				else{
					window.location.reload();
				}
            },
        });
	});
	/*
    * 验证码onblur事件
    */
	$("#validatecode,#search4,#search2,#valicode1").bind("blur",function(){
		var self = this;
    	var code = $(this).val();
    	var id = $(this).parent().prev().children(":input").attr('id');
    	var typeVal = get_type(id);
    	if ($(this).attr('id') == 'validatecode'){
    		var mobile = $('#regi_mobile').val();
    		typeVal = 'reg';
    	}
    	else if ($(this).attr('id') == 'search2'){
    		var mobile = $('#search1').val();
    		typeVal = 'login';
    	}
    	else if ($(this).attr('id') == 'search4'){
    		var mobile = $('#search3').val();
    		typeVal = 'get';
    	}
    	else{
    		var mobile = $(this).parent().prev().children(":input").val();
    	}
    	if ((code == '')||(code == '六位数字验证码')){
    		return false;
    	}
    	if (isNaN(code)||(code.toString().length != 6)){
    		if ($(this).attr('id') == 'validatecode'){
    			add_hint($(this).next(),'<b class="error">验证码格式错误</b>','error',1);
    		}
    		else{
    			add_hint($(this).next(),'<b class="error">验证码格式错误</b>','error');
    		}
    	} 
    	else{
    		$.ajax({
	            url : domain_url+"/register/check_vcode/?mobile="+mobile+"&validatecode="+code+"&login="+typeVal,
	            dataType: 'jsonp',
	            success : function(data){  
	            	if (data['code'] == -1){
			    		add_hint($(self).next(),'<b class="error">验证码错误</b>','error');
			    	}
			    	else
			    	if (data['code'] == -2){
			    		add_hint($(self).next(),'<b class="error">验证码已过期</b>','error');
			    	}
			    	else
			    	if (data['code'] == -6){
			    		add_hint($(self).next(),'<b class="error">手机号错误</b>','error');
			    	}
			    	else
			    	if (data['code'] == 1){
			    		add_hint($(self).next(),'<b class="sure"></b>','sure');
			    	}
	          	}
	        });
    	}
    })

    // 禁止对按钮进行拖拽
    $("#login_btn,#register_now,#next_step,#reset_passwd,#need_code3,#need_code1,#need_code2,#need_code4").bind("dragstart",function(e){
    	return false;
    })
	//suggest
	if($(".xinsearchbar").length>0){
		//搜索框点击效果
		$(".xinsearchbar").focus(function(){
			if($(this).val() == $(this).data('default')){
				$(this).val("").css("color","#333");
			}
		}).blur(function(){
			if($(this).val() == ''){
				$(this).val($(this).data('default')).css("color","#bfbfbf");
			}
		});
		/**
		 * 搜索框suggest效果
		 */
		$('.xinsearchbar').each(function(i,item){
			var addleft = $(this).data('addleft') || '';
			var addtop = $(this).data('addtop') || '';
			var addwidth = parseInt($(this).data('addwidth')) || 0;
			var carcount = parseInt($(this).data('carcount')) || 0;
			var position = { my: "left"+addleft+" top"+addtop};
			var auto = $(this).autocomplete({
			        minChars: 1,
			        minLength:1,
			        autoFill: false,
			        autoFocus:true,
			        delay: 10,
			        position:position,
			        source: function( request, response ) {
			        	_hmt.push(['_trackEvent', 'InternalSearch', 'IS_'+request.term]);
			            $.post('/apis/apis_suggest/match/',{ w:request.term,c:TOP_INFO.location.cityid }, function(data){
			            	var data = $.parseJSON(data);
			            	response(data);
						});
				    },
				    select: function( event, ui ) {
				    	//添加搜索历史
				    	var jsonstr = '{"label": "'+ui.item.label+'","num": "-1","query": "'+ui.item.query+'","value": "'+ui.item.value+'"}' ;
				    	search_log(jsonstr);
				    	_hmt.push(['_trackEvent', 'InternalSearch', 'ISR_'+ ui.item.label]);
				    	window.location.href = '/' + TOP_INFO.location.ename + ui.item.query;
				    },
				    create: function(event, ui) {  
		                $(this).bind("click",function(){  
		                    if($(this).val()=='' || $(this).val()==$(this).data('default')){  
		                        $(this).autocomplete("search" , "__history");  
		                    }
		                });
		       		},
				    close: function(event, ui) {
				    	if($(this).attr('id') == "topSearch"){
			                $(this).bind("blur",function(){  
			                    var v = $(this).val();
								if( v ==''|| v ==$("#topSearch").data('default') ){
									$(this).parent().removeClass("search-focus");
									$("#topSearch").hide();
								}
			                });
				    	}
		       		}
		    }).data( "ui-autocomplete" );
		    auto._renderItem = function( ul, item ) {
		    	var li = $("<li>").css({"padding-left":"10px"})
		    		.append($("<span>").css({"float":"left"}).text(item.label));
		    	if(carcount && item.num >= 0 ){
		    		item.num = Math.floor(item.num / 10) * 10 ;
		    		var text = "约"+item.num+"个车源";
		    		if(item.num<10){
		    			text = "少于10个车源";
		    		}
		    		li.append($("<span>").css({"float":"right"}).text(text));
		    	}
		    	return li.appendTo(ul);
		  	}
		  	auto._resizeMenu = function() {
			  var ul = this.menu.element;
				ul.outerWidth( Math.max(
					ul.width( "" ).outerWidth() + 1 + addwidth,
					this.element.outerWidth() + addwidth
				) );
				ul.addClass("ui-xin-suggest-result");
			}
		});
	}
	/*顶部搜索栏效果*/
	$(".top-search").hover(
		function(){
			$(this).addClass("search-focus");
			$("#topSearch").show();
		},
		function(){
			var v = $("#topSearch").val();
			var auto = $("#topSearch").autocomplete().data( "ui-autocomplete").menu.element.html();
			if( ( v =='' || v ==$("#topSearch").data('default') ) && auto == '' ){
				$(this).removeClass("search-focus");
				$("#topSearch").hide();
			}
	});
	// 回车键搜索
	$("#topSearch,.xinsearchbar").bind("keydown",function(event){
		var event = window.event?window.event:event;
		if (event.keyCode==13) {
			var id = $(this).attr('id');
			$("[for='"+id+"']").click();
		}
	});
	//搜索框-搜索按钮点击事件
	$(".a_btn_search_q").click(function(){
		var a_for = $(this).attr('for');
		var input = $("#"+a_for);
		var ui_item = input.data( "ui-autocomplete" ).selectedItem;
		var v = input.val();
		v = v.replace(/\s/g,"");
		var query = "/s/";
		var history = '';
		if(ui_item){
			query = ui_item.query;
			history = '{"label": "'+ui_item.label+'","num": "-1","query": "'+ui_item.query+'","value": "'+ui_item.value+'"}';
		}
		if( v !="" && v != input.data('default')){
			query += '?q=' + v;
			if(!history){
				history = '{"label": "'+v+'","num": "-1","query": "'+query+'","value": "'+v+'"}';
			}
		}
		//添加搜索历史
		search_log(history);
		window.location.href = '/'+ TOP_INFO.location.ename + query;
	});	
	$("#citySelect dt").click(function(e){
    //e.preventDefault();
    var city_dt = $("#citySelect dt"), city_wp = $("#cityWrap"), flag = city_wp.is(":visible");
    if(!flag){
     city_dt.addClass("active");
     city_wp.show();
   }else{
     city_dt.removeClass("active");
     city_wp.hide();
   }
  });

  var Letter = $(".pro-letter em");
  var LetterCon = $(".cityMore");
  Letter.each(function(){
    $(this).attr("title",$(this).text());
  });
  LetterCon.each(function(){
    $(this).attr("id",$(this).find("span:first b").text());
  });
  Letter.click(function(){
    var index = this.title;
    var id = $('#'+ index);
    var speed = 300;
    var height = { scrollTop:$(id).offset().top - $("#citySelect").parent().offset().top - 60};
    $("#cityWrap").animate(height, speed);
  });


  $("#cityWrap").mouseup(function(){
    return false;
  });
  $(document).mouseup(function(e) {
    if($(e.target).parents("#citySelect").length==0) {
      $("#citySelect dt").removeClass("active");
      $("#cityWrap").hide();
    }
  });

	// 返回顶部按钮自动换色
	$(window).scroll(function(){
	    if ($(window).scrollTop()>10){
	        $('#goTop').addClass("goTopHover");
	        $('.fixed-head-wrap').addClass("addShadow");
	    }else if($(window).scrollTop()<10){
	        $('#goTop').removeClass("goTopHover");
	        $('.fixed-head-wrap').removeClass("addShadow");;
	    }
	});
	//返回顶部
	$('#goTop').click(function() {
	    $("html, body").animate({scrollTop:0}, 200);
	});
	
	// 登陆界面添加回车事件按钮
	$("#popupLogin").keydown(function(e){
		var e = e || window.event;
		var id = e.target.id;
		remove_hint($('#'+id));
		var curKey = e.which;
		if(curKey == 13){
			$("#login_btn").click();
			return false;
		}	
	});
	// 注册界面添加回车事件按钮
	$("#redeemPrizes").keydown(function(e){
		var e = e || window.event;
		var id = e.target.id;
		remove_hint($('#'+id));
		var curKey = e.which;
		if(curKey == 13){
			$("#register_now").click();
			return false;
		}
	});
	// 下一步添加回车事件按钮
	$("#forPass").keydown(function(e){
		var e = e || window.event;
		var id = e.target.id;
		remove_hint($('#'+id));	
		var curKey = e.which;
		if(curKey == 13){
			$("#next_step").click();
			return false;
		}
	}); 
	
	// 提交添加回车按钮事件
	$("#forgetNext").keydown(function(e){
		var e = e || window.event;
		var id = e.target.id;
		remove_hint($('#'+id));
		var curKey = e.which;
		if(curKey == 13){
			$("#reset_passwd").click();
			return false;
		}
	}); 
	
	// 修改密码界面添加回车事件按钮
	$("#modify_passwd").keydown(function(e){
		var e = e || window.event;
		var id = e.target.id;
		remove_hint($('#'+id));
		var curKey = e.which;
		if(curKey == 13){
			$("#change_pass").click();
			return false;
		}	
	});
	
	// 密码确认onblur事件
	$("#psw4,#psw10,#psw16").on("blur",function(e){
		var id = $(this).attr('id');
		var wid = Number(id.substring(3)) - 1;
		id = Number(id.substring(3)) -2;
		var pass = $("#psw"+id).val();
		var cpass = $(this).val();
		if ((typeof cpass == 'undefined')||(cpass.toString().length < 1)){
			$('#psw'+wid).show();
			$(this).hide();
			return false;
		}
		if (pass != cpass){
			if ($(this).attr('id') == 'psw4'){
				add_hint($(this),'<b class="error">两次输入的密码不一致</b>','error',1);
			}
			else{
				add_hint($(this),'<b class="error">两次输入的密码不一致</b>','error');
			}
		}
		else{
			add_hint($(this),'<b class="sure"></b>','sure');
		}
	})
	
	$("#psw1,#psw3,#psw5,#psw7,#psw11,#psw13,#psw15").on("blur",function(e){
		var id = $(this).attr('id');
		id = Number(id.substring(3)) + 1;
		$(this).hide();
		$('#'+id).show();
	})
	
	// 手机号input事件，值有变化时触发，清除错误警告信息或正确提示信息
	$("#regi_mobile,#studio_mobile,#search,#search1,#search3,#free_mobile,#consult_mobile").on("input",function(e){
		remove_hint($(this));
	})
	
	// 密码input事件，值有变化时触发，密码超过20位是给出警告信息
	$("#psw2,#psw8,#psw6").on("input",function(e){
		if ($(this).val().length > 20){
			//add_hint($(this),'<b class="error">密码长度不能超过20位</b>','error');
			$(this).val($(this).val().substring(0,20));
			return false;
		}
	})

	// 验证码input事件，一旦验证码个数到达6位，触发blur事件
	$("#validatecode,#search4,#search2,#valicode1,#validate_code_studio").on("input",function(e){
		if ($(this).val().length == 6){
			$(this).blur();
		}
	})


	
	/*输入框focus效果*/
    $("#search,#search1,#search2,#search3,#search4,#search5,#search6,#search7,#regi_mobile,#studio_mobile,#mobile,#mobile2,#sms_captcha,#suptare,#validatecode,#validate_code_studio,#piccode,#piccode_r,#piccode_c,#piccode_g,#piccode_l,#topSearch,#psw1,#psw3,#psw5,#psw7,#psw9,#psw11,#psw13,#psw15,#update_mobile,#valicode1,#real_name,#real_mobile,#real_carid,#invited_mobile,#invite_code,#user_name2,#user_name1,#id_card,#mobile,#free_mobile,#consult_mobile,#studio_name,#validate_code_studio,#piccode_o").focus(function() {
    	//获取焦点时，如果原来有错误警告消息，则删除
    	if ($(this).next().hasClass('error') == true){
    		$(this).next().remove();
    	}
    	if ($(this).next().hasClass('error_num') == true){
    		$(this).next().remove();
    	}
    	if ($(this).next().hasClass('error_1') == true){
    		$(this).next().remove();
    	}
    	if ($(this).next().next().hasClass('error') == true){
    		$(this).next().next().remove();
    	}
    	if ($(this).val() == this.defaultValue) {
      		$(this).val("").css("color", "#333");
		    if ($(this).attr('id') == 'psw1') {
		    	$("#psw1").hide();
		        $("#psw2").show().focus().css("color","#bfbfbf");
		     }
	      	if ($(this).attr('id') == 'psw3') {
	        	$("#psw3").hide();
	        	$("#psw4").show().focus().css("color","#bfbfbf");
	      	}
      		if ($(this).attr('id') == 'psw5') {
		        $("#psw5").hide();
		        $("#psw6").show().focus().css("color","#bfbfbf");
		    }
      		if ($(this).attr('id') == 'psw7') {
		        $("#psw7").hide();
		        $("#psw8").show().focus().css("color","#bfbfbf");
		    }
      		if ($(this).attr('id') == 'psw9') {
        		$("#psw9").hide();
        		$("#psw10").show().focus().css("color","#bfbfbf");
      		}
      		if ($(this).attr('id') == 'psw11') {
        		$("#psw11").hide();
        		$("#psw12").show().focus().css("color","#bfbfbf");
      		}
      		if ($(this).attr('id') == 'psw13') {
        		$("#psw13").hide();
        		$("#psw14").show().focus().css("color","#bfbfbf");
      		}
      		if ($(this).attr('id') == 'psw15') {
        		$("#psw15").hide();
        		$("#psw16").show().focus().css("color","#bfbfbf");
      		}
    	}
    	}).blur(function() {
    		if ($(this).val() == '') {
      			$(this).val(this.defaultValue).css("color", "#bfbfbf");
    		}
  		});

    // lazy load for vcode
   
    $('.logintab a').eq(1).click(function() {
    	var url = domain_url + "/register/get_vcode/";
        $('#popupLogin .PageNum').eq(1).html('<img src="' + url +'" id="vcodeimg_r"/>');
            $('#vcodeimg_r').bind('click', function(){
            	if ($('a#vcodeimg_r').next().hasClass('error')||$('#vcodeimg_r').next().hasClass('sure')){
            		$('#vcodeimg_r').next().remove();
            	}
            	flush_vcode('#vcodeimg_r',domain_url);
            });
        });

    $('.forPass a').eq(0).click(function() {
    	var url = domain_url + "/register/get_vcode/";
    	$('#forPass .PageNum').html('<img src='+ url +' id="vcodeimg_g">');
		$('#vcodeimg_g').bind('click', function(){
			if ($('#vcodeimg_g').next().hasClass('error')||$('#vcodeimg').next().hasClass('sure')){
				$('#vcodeimg_g').next().remove();
			}
			flush_vcode('#vcodeimg_g',domain_url);
		});
    });

    $('.flush_vcode').on('click', function(){
    	flush_vcode(this, domain_url);
    });

	$('h2').each(function(){
        if($(this).text() == "商家描述") {
            $(this).parent().hide();
            return false;
        }
    });

    var auto = $( "#topSearch" ).autocomplete({
        appendTo: "#cityWrap .hot-city",
        position : { my : "left top", at: "left bottom" },
        source: function( request, response ) {
            $.ajax({
                url: "/location_city/",
                dataType: "json",
                data: {
                    q: request.term
                },
                success: function( data ) {
                    response( 
                        $.map(data, function(val, i){
                            return { 'label':data[i].cityname, 'value':data[i].cityname, 'ename': data[i].ename }
                        })
                    );
                }
            });
        },
        minLength: 1,
        select: function( event, ui ) {
            window.location.href =  domain_url+'/'+ui.item.ename+'/';
        }
    }).data( "ui-autocomplete" );

    auto._renderItem = function(ul, item) {
        return $( "<li>" ).addClass("CommonSearch").append( item.label ).appendTo( ul );
    };
    auto._renderMenu = function(ul, items) {
        var that = this;
        $.each( items, function( index, item ) {
            that._renderItemData( ul, item );
        });
    };
    auto._resizeMenu =  function(ul, item) {
        $(this.menu.element).attr('style', 'z-index:299;position:absolute;height:300px;overflow-y:scroll');
        this.menu.element.outerWidth($("#topSearch").css("width"));
    }
});

//搜索历史和搜索日志
function search_log(jsonstr){
	if(jsonstr){
		$.cookie('XIN_SUGGEST_HISTORY_ADD' , jsonstr , { path: '/', expires: 24*60*60 });
		$.post('/apis/apis_suggest/search_log/',{h:jsonstr,c:TOP_INFO.location.ename});
	}
}
/**
 * 显示提示信息
 */
function show_tip(msg){
	$("#warmTip10 .span_xin_msg").text(msg);
	show_popup("#warmTip10","#warmTip10 .closeJs");
}
/**
 * 验证手机号
 * @param  {[type]} mobile [description]
 * @return {[type]}      [description]
 */
function is_valid_mobile(mobile){
	if ((mobile == '请输入手机号')||(mobile == '')){
		return '手机号不能为空';
	}
	var reg = /^1\d{10}$/;
	if (!reg.test(mobile)){
		return '手机号格式不正确';
	}
	return 1;
}

/**
 * 验证图片码
 * @param  {[type]} mobile [description]
 * @return {[type]}      [description]
 */
function is_valid_piccode(piccode){
	if ((piccode == '请输入图片码')||(piccode == '')){
		return '图片码不能为空';
	}
	var reg = /^[a-zA-Z0-9]+$/;
	if (!reg.test(piccode)||piccode.length != 4){
		return '图片码错误';
	}
	return 1;
}
/**
 * 验证密码
 * @param  {[type]}  [description]
 * @return {[type]}      [description]
 */
function is_valid_pass(pass){
	if (pass == ''){
		return '密码不能为空';
	}
	if ((pass.length>20)||(pass.length<6)){
		return '密码格式不正确';
	}
	return 1;
}

/*
 *验证中文名
 */
function is_valid_name(name){	
	if (name.match(/^[\u4e00-\u9fa5][\u4e00-\u9fa5][\u4e00-\u9fa5]?[\u4e00-\u9fa5]?$/)){
		return 1;
	}
	return -1;
}

/**
 * 清空验证错误信息和原来输入信息
 */
function clear_invalid(){
	$(".error").remove();
	$(".sure").remove();
	$("#search,#search1,#search3,#update_mobile,#mobile,#free_mobile,#consult_mobile").val('请输入手机号').css("color", "#bfbfbf");
	$("#search2,#search4,#valicode1").val('六位数字验证码').css("color", "#bfbfbf");
	$("#piccode_g,#piccode_r").val('请输入图片码').css("color", "#bfbfbf");
	$("#sms_captcha").val('请输入验证码').css("color", "#bfbfbf");
	$("#psw6,#psw8,#psw10").val('');
	$("#psw1,#psw3,#psw5,#psw7").show();
	$("#psw2,#psw4,#psw6,#psw8,#psw10").hide();
	$('.error_num').remove();
	$('#user_name2,#user_name1').val('');
	$('#invite_code').val('');
	$('#invited_mobile').val('');
}
/*
 * 闫正志是否为空
 */
function is_empty(val){
	if ((typeof val == 'undefined')||(val.toString().length < 1)){
		return true;
	}
	return false;
}
/**
 * 列表页和详情页点击更多
 */
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
		}else if(divMore.css("display")=="none"){
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

function get_type(id){
	switch (id){
    	case 'regi_mobile':
    		var typeVal = 'reg';
    		break;
    	case 'search3':
    		var typeVal = 'get';
    		break;
    	case 'search1':
    		var typeVal = 'login';
    		break;
    	case 'search':
    		var typeVal = 'login';
    		break;
    	case 'update_mobile':
    		var typeVal = 'update';
    		break;
    	case 'studio_mobile':
    		var typeVal = 'order';
    		break;
    }
    return typeVal;
}

/*
 * 添加验证结果信息
 */

function add_hint(select,msg,type,page){
	if ((select.next().hasClass('error') == true)||(select.next().hasClass('sure') == true)){
		select.next().remove();
	}
	if ((select.next().hasClass('error_num') == true)||(select.next().hasClass('sure') == true)){
		select.next().remove();
	}
	if ((page == 1)||($('.error').length == 0)){
		select.after(msg);
	}
}

/*
 * 移除验证结果信息
 */

function remove_hint(select){
	if (select.next().hasClass('error')||select.next().hasClass('sure')){
		select.next().remove();
	}
	if (select.next().hasClass('error_num')||select.next().hasClass('sure')){
		select.next().remove();
	}
	if (select.next().next().hasClass('error')||select.next().next().hasClass('sure')){
		select.next().next().remove();
	}
}
/**
 * 判断字符的个数
 */
function getByteLen(str){
            var len = 0;
            for (var i = 0; i < str.length; i++) {
                 var a = str.charAt(i);
                 if (a.match(/[^\x00-\xff]/ig) != null) 
                {
                    len += 2;
                }
                else
                {
                    len += 1;
                }
            }
            return len;
        }

//截取字符串 包含中文处理 
//(串,长度,增加...) 

function subString(str, len, hasDot) 
{ 
    var newLength = 0; 
    var newStr = ""; 
    var chineseRegex = /[^\x00-\xff]/g; 
    var singleChar = ""; 
    var strLength = str.replace(chineseRegex,"**").length; 
    for(var i = 0;i < strLength;i++) 
    { 
        singleChar = str.charAt(i).toString(); 
        if(singleChar.match(chineseRegex) != null) 
        { 
            newLength += 2; 
        }     
        else 
        { 
            newLength++; 
        } 
        if(newLength > len) 
        { 
            break; 
        } 
        newStr += singleChar; 
    } 
     
    if(hasDot && strLength > len) 
    { 
        newStr += "..."; 
    } 
    return newStr; 
} 
	var domain_url = TOP_INFO.domain_url||'';

    var flush_vcode = function(obj,domain_url){
	    var str = domain_url+'/register/get_vcode?r=' + new Date();
	    $(obj).prop('src',str);
	}

	function warning_hidden(mes, item_id){
        $('#' + item_id).css('display','none');  
    }