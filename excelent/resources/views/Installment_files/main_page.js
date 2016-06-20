$(function () {
    //channel合作渠道链接处理
    var channel = "{$channel}";
    channel = location.search.replace(/.*?channel=([^\s&?]+).*/, "$1");
    channel = channel == location.search ? '' : channel;
	//通用header-top初始化
    $.post("/ajax/top_load/", {ename: TOP_INFO.location.ename || ''}, function (data) {
        TOP_INFO.user = !data || data.user === 'undefined' ? {} : data.user;
        TOP_INFO.half_city = !data || data.half_city === 'undefined' ? [] : data.half_city;
        TOP_INFO.c2b_city = !data || data.c2b_city === 'undefined' ? [] : data.c2b_city;
        TOP_INFO.location = data.location;
        if (window.location.search.indexOf('channel') === -1) {
            $(".a_buypage").attr('href', $('#php_half_city_link').attr('sname') + "/" + TOP_INFO.location.ename + "/s/");
        } else {
            $(".a_buypage").attr('href', $('#php_half_city_link').attr('sname') + "/" + TOP_INFO.location.ename + "/s/" + '?channel=' + location.search.replace(/.*?channel=([^\s&]+).*/, "$1"));
        }
        $("#cityWrap ul li a").each(function (i, item) {
            $(this).removeClass('cur');
            if ($(this).text() == TOP_INFO.location.cityname) {
                $(this).addClass('cur');
            }
        });
		// 修改head卖车链接
        if ($.inArray(TOP_INFO.location.cityid, TOP_INFO.c2b_city) != -1) {
            $(".a_sellpage").attr('href', '/sale/c2b_car/' + TOP_INFO.location.cityid + (channel ? '?channel='+channel : ''));
        }
        
        // 设置当前城市
        $('#current_city_id').html(TOP_INFO.location.cityname);
        $('.select-city').css('display', 'block');
        $('#citySelect a').removeClass('cur');
        $('a[data-ename="' + TOP_INFO.location.ename + '"]').addClass('cur');

        typeof (init_pc_page) == 'function' && init_pc_page(TOP_INFO.location.ename);

        if (($.inArray(TOP_INFO.location.cityid, TOP_INFO.half_city) != -1) || (TOP_INFO.location.cityid == 0)) {
            $("#li_halfprice").show();
            $(".php_li_half").show();
            if (window.location.search.indexOf('channel') === -1) {
                $('#php_half_city_link').attr('href', $('#php_half_city_link').attr('sname') + '/' + TOP_INFO.location.ename + '/h/');
            } else {
                $('#php_half_city_link').attr('href', $('#php_half_city_link').attr('sname') + '/' + TOP_INFO.location.ename + '/h/' + '?' + 'channel=' + location.search.replace(/.*?channel=([^\s&]+).*/, "$1"));
            }
        } else {
            $("#li_halfprice").hide();
            $(".php_li_half").hide();
        }
        if (!$.isEmptyObject(TOP_INFO.user)) {
            //提示成功注册时，执行以下语句
            _hmt.push(['_trackEvent', 'Login', ' Login_auto']);
            var html = '<div class="person-wrap" >' +
                    '<p class="phone-info"><b class="ico person-ico"></b>' +
                    '<a href="/i/' + (channel ? '?channel=' + channel : '') + '">' + TOP_INFO.user.mobile + '</a></p>' +
                    '<a href="/login/out/' + (channel ? '?channel=' + channel : '') + '" class="exit">退出</a>' +
                    '</div>';
            $("#xin_top_userinfo").html(html);
            $(".person-wrap").hover(
                    function () {
                        $(this).addClass("person-info");
                    },
                    function () {
                        $(this).removeClass("person-info");
                    }
            );

        } else {
            var html = '<div class="person-wrap" style="top:0px;">' +
                    '<a href="javascript:clear_invalid();show_popup(\'#popupLogin\',\'#popupLogin .closeJs\');" id="loginA"  class="login">登录</a>/' +
                    '<a href="' + $('#xin_top_userinfo').attr('sname') + '/register/' + (channel ? '?channel=' + channel : '') + '" id="regA"  rel="nofollow" class="register">注册</a>' +
                    '</div>';
            $("#xin_top_userinfo").html(html);
            $('#loginA,#question_button').bind('click', function (e) {
                $('#popupLogin .PageNum').eq(0).html('<img src="/register/get_vcode/" id="vcodeimg_l"/>');
                $('#vcodeimg_l').bind('click', function () {
                    if ($('#vcodeimg_l').next().hasClass('error') || $('#vcodeimg_l').next().hasClass('sure')) {
                        $('#vcodeimg_l').next().remove();
                    }
                    flush_vcode('#vcodeimg_l');
                });
            })

            //需要登陆时 弹出登陆框
            if (typeof TOP_GET !== 'undefined') {
                if (TOP_GET.login) {
                    clear_invalid();
                    show_popup('#popupLogin', '#popupLogin .closeJs');
                }
            }
        }
        //头部信息加载后执行的逻辑
        if (typeof _top_info_end == "function") {
            _top_info_end();
        }

        if (typeof _top_info_star == 'function') {
            _top_info_star();
        }
        if (typeof _top_info_article == 'function') {
            _top_info_article();
        }

        if (typeof _init_buy_car == 'function') {
            _init_buy_car();
        }
    }, "json");

    /**
     * 验证码60秒倒计时功能
     * @param {[type]} o [description]
     */
    function get_code_time(o) {
        this.wait = 120;
        this.o = o;
        this.timer = null;
        this.exec = function () {
            if (!$(this.o).is(":visible")) {
                this.wait = 0;
            }
            if (this.wait == 0) {
                this.o.removeAttribute("disabled");
                this.o.value = "获取验证码";
                this.wait = 120;
                clearTimeout(this.timer);
            } else {
                this.o.setAttribute("disabled", true);
                this.o.value = this.wait + 's后重新发送';
                this.wait--;
                this.timer = setTimeout(function () {
                    this.exec();
                }, 1000);
            }
        }
        this.exec();
    }
    // 获取验证码处理函数
    $("#need_code,#need_code1,#need_code3,#need_code4,#need_code_studio").click(function (e) {
        var o = this;
        var piccode = '';
        var id = $(o).parent().prev().children(":input").attr("id");
        var typeVal = get_type(id);
        if ($(this).attr('id') == 'need_code') {
            var mobile = $('#regi_mobile').val();
            var typeVal = 'reg';
            piccode = $('#piccode').val();
        } else if ($(this).attr('id') == 'need_code1') {
            var mobile = $('#search1').val();
            var typeVal = 'login';
            piccode = $('#piccode_r').val();
        } else if ($(this).attr('id') == 'need_code3') {
            var mobile = $('#search3').val();
            var typeVal = 'get';
            piccode = $('#piccode_g').val();
        } else if ($(this).attr('id') == 'need_code_studio') {
            var mobile = $('#studio_mobile').val();
            var typeVal = 'order';
            piccode = $('#piccode_o').val();
        } else {
            var mobile = $("#" + id).val();
        }
        if (mobile == '请输入手机号') {
            if ($(this).attr('id') == 'need_code') {
                add_hint($('#regi_mobile'), '<b class="error">请输入手机号</b>', 'error');
            } else if ($(this).attr('id') == 'need_code1') {
                add_hint($('#search1'), '<b class="error">请输入手机号</b>', 'error');
            } else if ($(this).attr('id') == 'need_code3') {
                add_hint($('#search3'), '<b class="error">请输入手机号</b>', 'error');
            } else if ($(this).attr('id') == 'need_code_studio') {
                add_hint($('#studio_mobile'), '<b class="error">请输入手机号</b>', 'error');
            } else {
                add_hint($('#' + id), '<b class="error">请输入手机号</b>', 'error');
            }
            return false;
        }

        if (is_valid_mobile(mobile) != 1) {
            if ($(this).attr('id') == 'need_code') {
                add_hint($('#regi_mobile'), '<b class="error">无效的手机号</b>', 'error');
            } else if ($(this).attr('id') == 'need_code1') {
                add_hint($('#search1'), '<b class="error">无效的手机号</b>', 'error');
            } else if ($(this).attr('id') == 'need_code3') {
                add_hint($('#search3'), '<b class="error">无效的手机号</b>', 'error');
            } else if ($(this).attr('id') == 'need_code_studio') {
                add_hint($('#studio_mobile'), '<b class="error">无效的手机号</b>', 'error');
            } else {
                add_hint($('#' + id), '<b class="error">无效的手机号</b>', 'error');
            }
            return false;
        }

        if ($(this).attr('id') == 'need_code') {
            var piccode = $('#piccode').val();
            if (piccode == '请输入图片码') {
                add_hint($('#piccode').next(), '<b class="error">请输入图片码</b>', 'error');
                return false;
            }
        } else if ($(this).attr('id') == 'need_code1') {
            var piccode = $('#piccode_r').val();
            if (piccode == '请输入图片码') {
                add_hint($('#piccode_r').next(), '<b class="error">请输入图片码</b>', 'error');
                return false;
            }
        } else if ($(this).attr('id') == 'need_code3') {
            var piccode = $('#piccode_g').val();
            if (piccode == '请输入图片码') {
                add_hint($('#piccode_g').next(), '<b class="error">请输入图片码</b>', 'error');
                return false;
            }
        } else if ($(this).attr('id') == 'need_code_studio') {
            var piccode = $('#piccode_o').val();
            if (piccode == '请输入图片码') {
                add_hint($('#piccode_o').next(), '<b class="error pos-error">请输入图片码</b>', 'error');
                return false;
            }
        }
        if (($('.error').length > 0) && (!$('#need_code1').next().hasClass('.error')) && (!$('#need_code3').next().hasClass('.error'))) {
            return false;
        }

        $.post('/register/send/', {'mobile': mobile, 'login': typeVal, 'piccode': piccode, 'type': 'ajax'}, function (data) {
            if (data == 1) {
                get_code_time(o);
            } else {
                if ($(o).attr('id') == 'need_code') {
                    add_hint($('#piccode').next(), '<b class="error">手机号已存在或图片码验证码错误</b>', 'error');
                } else if ($(o).attr('id') == 'need_code1') {
                    add_hint($('#piccode_r').next(), '<b class="error">图片验证码错误</b>', 'error');
                }
                else if ($(o).attr('id') == 'need_code3') {
                    add_hint($('#piccode_g').next(), '<b class="error">图片验证码错误</b>', 'error');
                }
                else if ($(o).attr('id') == 'need_code_studio') {
                    add_hint($('#piccode_o').next(), '<b class="error pos-error">图片验证码错误</b>', 'error');
                }
            }
        });
    });

    /**
     * 点击注册
     */
    $("#register_now").click(function () {
        _hmt.push(['_trackEvent', 'Register', 'Register_submit']);
        var mobile = $('#regi_mobile').val();
        var password = $('#psw2').val();
        var cpassword = $('#psw4').val();
        var validatecode = $('#validatecode').val();
        var piccode = $('#piccode').val();
        var typeVal = 'reg';
        if (mobile == '请输入手机号') {
            add_hint($('#regi_mobile'), '<b class="error">手机号错误</b>', 'error');
            return false;
        }
        if (piccode == '请输入图片码') {
            add_hint($('#piccode').next(), '<b class="error">请输入图片码</b>', 'error');
            return false;
        }
        if (validatecode == '六位数字验证码') {
            add_hint($('#validatecode').next(), '<b class="error">请输入验证码</b>', 'error');
            return false;
        }
        if ($('#psw1').css("display") == "inline-block") {
            add_hint($('#psw1'), '<b class="error">请输入密码</b>', 'error');
            return false;
        }
        if ($('#psw3').css("display") == "inline-block") {
            add_hint($('#psw3'), '<b class="error">密码不一致</b>', 'error');
            return false;
        }
        if ($('#redeemPrizes .error').length > 0) {
            return false;
        }

        $.post('/register/register_user/', {'mobile': mobile, 'password': password, 'validatecode': validatecode, 'login': typeVal, type: 'ajax'}, function (data) {
            if (data == -1) {
                add_hint($('#validatecode').next(), '<b class="error">验证码错误</b>', 'error');
            } else if (data == -6) {
                add_hint($('#regi_mobile'), '<b class="error">手机号错误</b>', 'error');
            } else if (data == -2) {
                add_hint($('#validatecode').next(), '<b class="error">验证码已过期</b>', 'error');
            } else {
                _hmt.push(['_trackEvent', 'Register', 'Register_done']);
                install_register(mobile, password);

                //二期打点
                zhuge_track('C-注册-同意协议', {'mobile': mobile, '城市': TOP_INFO.location.cityname});
                uxl_track('w_reg/register_agree/mobile/' + mobile);

                if (TOP_INFO.location.ename) {
                    window.location.href = '/' + TOP_INFO.location.ename + '/';
                } else {
                    window.location.href = '/quanguo/';
                }
            }
        });
    });

    //下一步，
    $("#next_step").click(function () {
        var mobile = $('#search3').val();
        var code = $('#search4').val();
        var piccode = $('#piccode_g').val();
        if ((typeof mobile == 'undefined') || (mobile.toString().length < 1) || (mobile == '请输入手机号')) {
            add_hint($('#search3'), '<b class="error">请输入手机号</b>', 'error');
            return false;
        }
        if (piccode == '请输入图片码') {
            add_hint($('#piccode_g').next(), '<b class="error">请输入图片码</b>', 'error');
            return false;
        }
        if ((typeof code == 'undefined') || (code.toString().length < 1) || (code == '六位数字验证码')) {
            add_hint($('#search4').next(), '<b class="error">请输入验证码</b>', 'error');
            return false;
        }
        if ($('#search3').next().hasClass('error') || $('#search4').next().hasClass('error')) {
            return false;
        }
        var typeVal = 'get';
        $.post('/register/check_vcode/', {'mobile': mobile, 'validatecode': code, 'login': typeVal, type: 'ajax'}, function (data) {
            if (data == 1) {
                $(".shade").remove();
                $("#forPass").hide();
                show_popup("#forgetNext", "#forgetNext .closeJs");
            } else if (data == -1) {
                add_hint($('#search4').next(), '<b class="error">验证码错误</b>', 'error');
            } else if (data == -2) {
                add_hint($('#search4').next(), '<b class="error">验证码已过期</b>', 'error');
            } else if (data == -5) {
                add_hint($('#search3'), '<b class="error">验证码已过期</b>', 'error');
            }
        });
    });

    //重置密码
    $("#reset_passwd").click(function () {
        var passwd = $('#psw8').val();
        var cpasswd = $('#psw10').val();
        if ($('#psw7').css("display") == "inline-block") {
            add_hint($('#psw7'), '<b class="error">请输入密码</b>', 'error');
            return false;
        }
        if ($('#psw9').css("display") == "inline-block") {
            add_hint($('#psw9'), '<b class="error">请输入密码</b>', 'error');
            return false;
        }
        var b1 = is_valid_pass(passwd);
        if (b1 != 1) {
            add_hint($('#psw9'), '<b class="error">请输入密码</b>', 'error');
            return false;
        }
        var b2 = is_valid_pass(cpasswd);
        if (b2 != 1) {
            add_hint($('#psw10'), '<b class="error">密码格式不正确</b>', 'error');
            return false;
        }
        if (passwd != cpasswd) {
            add_hint($('#psw10'), '<b class="error">两次输入的密码不一致</b>', 'error');
            return false;
        }
        $.post('/getpasswd/reset_passwd/', {'passwd': passwd, type: 'ajax'}, function (data) {
            if (data == 1) {
                window.location.reload();
            } else {
                add_hint($('#psw10'), '<b class="error">两次输入的密码不一致</b>', 'error');
            }
        });
    });

    //重置密码
    $("#change_pass").click(function () {
        var oldpwd = $('#psw12').val();
        var passwd = $('#psw14').val();
        var cpasswd = $('#psw16').val();
        if ($('#psw11').css("display") == "inline-block") {
            add_hint($('#psw11'), '<b class="error">请输入原密码</b>', 'error');
            return false;
        }
        if ($('#psw13').css("display") == "inline-block") {
            add_hint($('#psw13'), '<b class="error">请输入密码</b>', 'error');
            return false;
        }
        if ($('#psw15').css("display") == "inline-block") {
            add_hint($('#psw15'), '<b class="error">请输入密码</b>', 'error');
            return false;
        }
        if (is_valid_pass(passwd) != 1) {
            return false;
        }
        if (passwd != cpasswd) {
            add_hint($('#psw16'), '<b class="error">两次输入的密码不一致</b>', 'error');
            return false;
        }
        if ($('#psw12').next().hasClass('error')) {
            return false;
        }

        $.post('/i/resetpasswd/reset_passwd/', {'passwd': passwd, 'oldpwd': oldpwd, type: 'ajax'}, function (data) {
            var msg = data == 1 ? '主人，密码修改成功啦' : '原密码错误或新密码输入不一致';
            var url = data == 1 ? "window.location.href='/i/favorite/'" : 'window.location.reload()';
            $("#warmTip10 .span_xin_msg").text(msg);
            show_popup("#warmTip10", "#warmTip10 .closeJs");
            setTimeout(url, 3000);
        });
    });
    //登录
    $("#login_btn").click(function () {
        if ($(".logintab a").first().hasClass("active")) {
            //手机号密码登陆
            var mobile = $("#search").val();
            var piccode = $('#piccode_l').val();
            var password = $("#psw6").val();
            var valid = is_valid_mobile(mobile);
            if (valid != 1) {
                add_hint($('#search'), '<b class="error">' + valid + '</b>', 'error');
                return false;
            }
            if (piccode == '请输入图片码') {
                add_hint($('#piccode_l').next(), '<b class="error">请输入图片码</b>', 'error');
                return false;
            }
            var vapass = is_valid_pass(password);
            if (vapass != 1) {
                add_hint($('#psw6'), '<b class="error">' + vapass + '</b>', 'error');
                return false;
            }
            var login_type = 'p';
        } else {
            // 手机号验证码登陆
            var mobile = $("#search1").val();
            var password = $("#search2").val();
            var valid = is_valid_mobile(mobile);
            var piccode = $('#piccode_r').val();
            if (valid != 1) {
                add_hint($('#search1'), '<b class="error">' + valid + '</b>', 'error');
                return false;
            }
            if (piccode == '请输入图片码') {
                add_hint($('#piccode_r').next(), '<b class="error">请输入图片码</b>', 'error');
                return false;
            }
            if (isNaN(password) && (password.toString().length != 6)) {
                add_hint($('#search2').next(), '<b class="error">验证码错误</b>', 'error');
                return false;
            }
            if (($("#search2").next().next().hasClass('error') == true) || ($('#search1').next().hasClass('error') == true)) {
                return false;
            }
            var login_type = 'c';
        }
        $.post($('#xin_top_userinfo').attr('sname') + '/login/check/', {'mobile': mobile, 'password': password, 'login': login_type, 'piccode': piccode, 'type': 'ajax'}, function (data) {
            if (data < 0) {
                flush_vcode('#vcodeimg_r');
                flush_vcode('#vcodeimg_l');
            }
            if (data == -1) {
                add_hint($('#search2').next(), '<b class="error">验证码错误</b>', 'error');
            } else if (data == -2) {
                add_hint($('#search2').next(), '<b class="error">验证码已过期</b>', 'error');
            } else if (data == -5) {
                add_hint($('#search1'), '<b class="error">手机号错误</b>', 'error');
            } else if (data == -4) {
                add_hint($('#search1'), '<b class="error">手机号不存在</b>', 'error');
            } else if (data == -3) {
                add_hint($('#psw6'), '<b class="error">密码错误</b>', 'error');
            } else if (data == -6) {
                add_hint($('#piccode_l').next(), '<b class="error">图片码验证错误</b>', 'error');
            } else {
                //二期 登陆打点
                zhuge_track('C-登陆按键', {'手机': mobile, '城市': TOP_INFO.location.cityname});
                uxl_track('w_login/login_click/mobile/' + mobile);

                if ((typeof TOP_GET !== 'undefined') && (TOP_GET.backurl)) {
                    var url = TOP_GET.backurl;
                } else {
                    var url = window.location.href;
                }
                if (url.indexOf('/register/') !== -1) {
                    window.location.href = '/';
                } else {
                    window.location.reload();
                }
            }
        });
    });

    //二期打点 登陆页面 切换登陆方式（密码，短信随机码）
    $('.logintab a').on('click', function () {
        var index = $(this).index();
        if (index == 0) {
            zhuge_track('C-登录-网站密码登陆', {'城市': TOP_INFO.location.cityname});
            uxl_track('w_login/password');
        } else {
            zhuge_track('C-登录-短信随机密码', {'城市': TOP_INFO.location.cityname});
            uxl_track('w_login/message');
        }
    });
    /*
     * 验证码onblur事件
     */
    $("#validatecode,#search4,#search2,#valicode1").bind("blur", function () {
        var self = this;
        var code = $(this).val();
        var id = $(this).parent().prev().children(":input").attr('id');
        var typeVal = get_type(id);
        if ($(this).attr('id') == 'validatecode') {
            var mobile = $('#regi_mobile').val();
            typeVal = 'reg';
        } else if ($(this).attr('id') == 'search2') {
            var mobile = $('#search1').val();
            typeVal = 'login';
        } else if ($(this).attr('id') == 'search4') {
            var mobile = $('#search3').val();
            typeVal = 'get';
        } else {
            var mobile = $(this).parent().prev().children(":input").val();
        }
        if ((code == '') || (code == '六位数字验证码')) {
            return false;
        }
        if (isNaN(code) || (code.toString().length != 6)) {
            if ($(this).attr('id') == 'validatecode') {
                add_hint($(this).next(), '<b class="error">验证码格式错误</b>', 'error', 1);
            } else {
                add_hint($(this).next(), '<b class="error">验证码格式错误</b>', 'error');
            }
        } else {
            $.ajax({
                type: "post",
                url: "/register/check_vcode/",
                data: {'mobile': mobile, 'validatecode': code, 'login': typeVal},
                async: false,
                success: function (data) {
                    if (data == -1) {
                        add_hint($(self).next(), '<b class="error">验证码错误</b>', 'error');
                    } else if (data == -2) {
                        add_hint($(self).next(), '<b class="error">验证码已过期</b>', 'error');
                    } else if (data == -6) {
                        add_hint($(self).next(), '<b class="error">手机号错误</b>', 'error');
                    } else if (data == 1) {
                        add_hint($(self).next(), '<b class="sure"></b>', 'sure');
                    }
                }
            });
        }
    });

    // 禁止对按钮进行拖拽
    $("#login_btn,#register_now,#next_step,#reset_passwd,#need_code3,#need_code1,#need_code2,#need_code4").bind("dragstart", function (e) {
        return false;
    });
    //suggest
    if ($(".Hsearch,.s-input").length > 0) {
        //搜索框点击效果
        var f = "";
        $(".Hsearch,.s-input").focus(function () {
            if ($(this).val() == $(this).data('default')) {
                $(this).val("").css("color", "#333");
            }
        }).blur(function () {
            if ($(this).val() == '') {
                $(this).val($(this).data('default')).css("color", "#bfbfbf");
            }
        });
        var halfp = $(".Hsearch,.s-input").attr("flag");
        if (halfp == 'halfprice') {
            f = "halfp";
        }
        /**
         * 搜索框suggest效果
         */
        $('.Hsearch,.s-input').each(function (i, item) {
            var addleft = $(this).data('addleft') || '';
            var addtop = $(this).data('addtop') || '';
            var addwidth = parseInt($(this).data('addwidth')) || 0;
            var carcount = parseInt($(this).data('carcount')) || 0;
            var position = {my: "left" + addleft + " top" + addtop};
            var auto = $(this).autocomplete({
                minChars: 1,
                minLength: 1,
                autoFill: false,
                autoFocus: false,
                delay: 10,
                position: position,
                source: function (request, response) {
                    //_hmt.push(['_trackEvent', 'InternalSearch', 'IS_' + request.term]);
                    var sl = $('.Sitem').val();
                    if (sl == '车辆') {
                        $.post('/apis/apis_suggest/match/', {w: request.term, c: TOP_INFO.location.cityid, "type": f}, function (data) {
                            var data = $.parseJSON(data);
                            function formatSuggest(data) {
                                if (!data)
                                    return;

                                var newData = [];
                                $.each(data, function (i, record) {
                                    newData.push({
                                        label: record.data_param.series,
                                        num: -1,
                                        query: '/s/b' + record.data_param.brand_id + 'b' + record.data_param.series_id,
                                        value: record.data_param.series
                                    });
                                });
                                return newData;
                            }
                            var newSuggest = formatSuggest(suggest);
                            if (newSuggest && newSuggest.length > 0) {
                                newSuggest = newSuggest.concat(data);
                                newSuggest.splice(10);
                                data = newSuggest;
                            }
                            $.each(data, function (i, item) {
                                item.query = channel_url(item.query);
                            });
                            response(data);
                        });
                    } else {
                        $.post('/apis/apis_suggest/shop/', {w: request.term}, function (data) {
                            if (data) {
                                var data = $.parseJSON(data);
                                $.each(data, function (i, item) {
                                    item.query = channel_url(item.query);
                                });
                                response(data);
                            }
                        });
                    }
                },
                select: function (event, ui) {
                    //检测query中的channel链接信息
                    ui.item.query = ui.item.query.replace(/(&|\?)?channel=(\w)+$|&?channel=(\w)+(\?|&)?/i, '');
                    //添加搜索历史
                    var jsonstr = '{"label": "' + ui.item.label + '","num": "-1","query": "' + ui.item.query + '","value": "' + ui.item.value + '"}';

                    _hmt.push(['_trackEvent', 'InternalSearch', 'ISR_' + ui.item.label]);
                    var sl = $('.Sitem').val();
                    if (sl == '车辆') {
                        search_log(jsonstr);
                        //window.location.href = '/' + TOP_INFO.location.ename + ui.item.query;
                        var url = '/' + TOP_INFO.location.ename + ui.item.query.replace(/\?q=[^&]+/, '') + '?q=' + ui.item.label;
                        //channel合作渠道链接处理
                        if (location.search.indexOf('channel=') !== -1) {
                            if (url.indexOf('channel=') === -1) {
                                url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'channel=' + (location.search.replace(/.*?channel=([^\s&]+).*/, "$1"));
                            }
                        }
                        window.location.href = url;
                        return false;

                    } else {
                        search_shop_log(jsonstr);
                        //window.location.href = ui.item.query;
                        var url = ui.item.query;
                        //channel合作渠道链接处理
                        if (location.search.indexOf('channel=') !== -1) {
                            if (url.indexOf('channel=') === -1) {
                                url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'channel=' + (location.search.replace(/.*?channel=([^\s&]+).*/, "$1"));
                            }
                        }
                        window.location.href = url;
                    }
                },
                create: function (event, ui) {
                    $(this).bind("click", function () {
                        if ($(this).val() == '' || $(this).val() == $(this).data('default')) {
                            $(this).autocomplete("search", "__history");
                        }
                    });
                },
                close: function (event, ui) {
                    if ($(this).attr('id') == "topSearch") {
                        $(this).bind("blur", function () {
                            var v = $(this).val();
                            if (v == '' || v == $("#topSearch").data('default')) {
                                $(this).parent().removeClass("search-focus");
                                $("#topSearch").hide();
                            }
                        });
                    }
                }
            }).data("ui-autocomplete");
            auto._renderItem = function (ul, item) {
                var li = $("<li>").css({"padding-left": "10px"})
                        .append($("<span>").css({"float": "left"}).text(item.label));
                if (carcount && item.num >= 0) {
                    // item.num = Math.floor(item.num / 10) * 10;
                    var sl = $('.Sitem').val();
                    /* if (sl == '车辆') {
                     var text = "约" + item.num + "个车源";
                     if (item.num > 0 && item.num < 10) {
                     text = "少于10个车源";
                     } else if(item.num == 0) {
                     text = '';
                     }
                     li.append($("<span>").css({"float": "right"}).text(text));
                     }*/

                }
                return li.appendTo(ul);
            }
            auto._resizeMenu = function () {
                var ul = this.menu.element;
                ul.outerWidth(Math.max(
                        ul.width("").outerWidth() + 1 + addwidth,
                        this.element.outerWidth() + addwidth
                        ));
                ul.addClass("ui-xin-suggest-result");
            }
        });
    }
    /*顶部搜索栏效果*/
    $(".top-search").hover(
            function () {
                $(this).addClass("search-focus");
                $("#topSearch").show();
            },
            function () {
                var v = $("#topSearch").val();
                var auto = $("#topSearch").autocomplete().data("ui-autocomplete").menu.element.html();
                if ((v == '' || v == $("#topSearch").data('default')) && auto == '') {
                    $(this).removeClass("search-focus");
                    $("#topSearch").hide();
                }
            });
    // 回车键搜索
    $("#topSearch,.Hsearch,.s-input").bind("keydown", function (event) {
        var event = window.event ? window.event : event;
        if (event.keyCode == 13) {
            var id = $(this).attr('id');
            $("[for='" + id + "']").click();
        }
    });
    //首页--搜索框-搜索按钮点击事件
    $(".search-btn").click(function () {
        zhuge_ckflag(1, '首页-搜索');
        var a_for = $(this).attr('for');
        var input = $("#" + a_for);
        var ui_item = input.data("ui-autocomplete").selectedItem;
        var v = input.val();
        _hmt.push(['_trackEvent', 'InternalSearch', 'IS_' + v]);
        v = v.replace(/\s/g, "");
        var query = "/s/";
        var history = '';
        if (ui_item) {
            query = ui_item.query;
            history = '{"label": "' + ui_item.label + '","num": "-1","query": "' + ui_item.query + '","value": "' + ui_item.value + '"}';
        }

        if (v != "" && v != input.data('default')) {
            //query += '?q=' + v;
            query += ((query.indexOf('?') === -1 ? '?' : '&') + 'q=' + v);
            if (!history) {
                history = '{"label": "' + v + '","num": "-1","query": "' + query + '","value": "' + v + '"}';
            }
        }
        var sl = $('.Sitem').val();
        var kw_reg = new RegExp("[!${}=<>?&']");  // 过滤特殊字符
        var	$brandSearch = $('#brandSearch'),
        	sBrand_val = $.trim($brandSearch.val());
        zhuge_track('C-搜索框', {
            '城市': TOP_INFO.location.cityname ? TOP_INFO.location.cityname : '--',
            '选项': sl == '店铺' ? '店铺' : '车辆',
            '页面属性': '首页',
            '搜索内容': sBrand_val
        });

        if (sl == '车辆') { // 立即搜索 - 车辆
            if (kw_reg.test(sBrand_val)) {
                return false;
            }
            search_log();
            if (sBrand_val == '请输入品牌、车系搜索') {
                $brandSearch.attr('value', '');
            }
            //window.location.href = '/' + TOP_INFO.location.ename + query;
            // var url = '/'+ TOP_INFO.location.ename + query;

            var url = '/' + TOP_INFO.location.ename + '/s/' + (sBrand_val ? '?q=' + sBrand_val : '');
            //channel合作渠道链接处理
            if (location.search.indexOf('channel=') !== -1) {
                if (url.indexOf('channel=') === -1) {
                    url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'channel=' + (location.search.replace(/.*?channel=([^\s&]+).*/, "$1"));
                }
            }

            zhuge_track('C-首页-搜索框', {"城市": "{$LOCATION_CITY.cityname|default:'&nbsp;&nbsp;'}", "搜索词": sBrand_val});
            uxl_track('w_home/search_input');

            window.location.href = url;

        } else {
            if (!v || v == '请输入店铺名称搜索') {
                $('.Sitem').attr('value', '车辆');
                $('.Hsearch').attr('value', '请输入品牌、车系搜索');
                window.location.reload();
                return false;
            }
            if (kw_reg.test(v)) {
                v = '';
            }
            search_shop_log(history);
            $.post('/apis/apis_suggest/shop', {'w': v, 'type': 'button'}, function (data) {
                if (data == '404') {
                    var hf = '/search/shop_error/' + v;
                } else {
                    var hf = data;
                }
                //channel合作渠道链接处理
                if (location.search.indexOf('channel=') !== -1) {
                    if (hf.indexOf('channel=') === -1) {
                        hf = hf + (hf.indexOf('?') === -1 ? '?' : '&') + 'channel=' + (location.search.replace(/.*?channel=([^\s&]+).*/, "$1"));
                    }
                }
                zhuge_track('C-首页-搜索框', {"城市": "{$LOCATION_CITY.cityname|default:'&nbsp;&nbsp;'}", "搜索词": sBrand_val});
                uxl_track('w_home/search_input');

                window.location.href = hf;
            });
        }
        //添加搜索历史
    });
    //买车页--搜索框-搜索按钮点击事件
    $(".s-btn").click(function () {
        zhuge_ckflag(1, '列表页-搜索');
        var a_for = $(this).attr('for');
        var input = $("#" + a_for);
        var ui_item = input.data("ui-autocomplete").selectedItem;
        var v = input.val();
        _hmt.push(['_trackEvent', 'InternalSearch', 'IS_' + v]);
        v = v.replace(/\s/g, "");
        var query = "/s/";
        var history = '';
        if (ui_item) {
            query = ui_item.query;
            history = '{"label": "' + ui_item.label + '","num": "-1","query": "' + ui_item.query + '","value": "' + ui_item.value + '"}';
        }
        if (v != "" && v != input.data('default')) {
            //query += '?q=' + v;
            query += ((query.indexOf('?') === -1 ? '?' : '&') + 'q=' + v);
            if (!history) {
                history = '{"label": "' + v + '","num": "-1","query": "' + query + '","value": "' + v + '"}';
            }
        }
        var sl = $('.Sitem').val();
        var kw_reg = new RegExp("[!${}=<>?&']");  // 过滤特殊字符
        var $search_search = $('#search_search'),
        	sSearch_val = $.trim($search_search.val());
        zhuge_track('C-搜索框', {
            '城市': TOP_INFO.location.cityname ? TOP_INFO.location.cityname : '--',
            '选项': sl == '店铺' ? '店铺' : '车辆',
            '页面属性': '列表页',
            '搜索内容': sSearch_val
        });

        if (sl == '车辆') { // 立即搜索 - 车辆
            if (kw_reg.test(sSearch_val) || sSearch_val == '' || $search_search.val() == '请输入品牌、车系搜索') {
                return false;
            }
            search_log();
            //window.location.href = '/' + TOP_INFO.location.ename + query;
            // var url = '/'+ TOP_INFO.location.ename + query;	
            var halfflag = $(this).attr("flag");
            var url;
            if (halfflag == "halfprice") {
                url = '/' + TOP_INFO.location.ename + '/s/?q=' + encodeURIComponent(sSearch_val) + '&type=halfp';
            } else {
                url = '/' + TOP_INFO.location.ename + '/s/?q=' + encodeURIComponent(sSearch_val);
            }
            //channel合作渠道链接处理
            if (location.search.indexOf('channel=') !== -1) {
                if (url.indexOf('channel=') === -1) {
                    url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'channel=' + (location.search.replace(/.*?channel=([^\s&]+).*/, "$1"));
                }
            }
            window.location.href = url;
            return false;

        } else { // 立即搜索 - 商铺
            if (!v || v == '请输入店铺名称搜索') {
                $('.Sitem').attr('value', '车辆');
                $('.s-input').attr('value', '请输入品牌、车系搜索');
                window.location.reload();
                return false;
            }
            if (kw_reg.test(v)) {
                v = '';
            }
            search_shop_log(history);
            $.post('/apis/apis_suggest/shop', {'w': v, 'type': 'button'}, function (data) {
                if (data == '404') {
                    var hf = '/search/shop_error/' + v;
                } else {
                    var hf = data;
                }
                //channel合作渠道链接处理
                if (location.search.indexOf('channel=') !== -1) {
                    if (hf.indexOf('channel=') === -1) {
                        hf = hf + (hf.indexOf('?') === -1 ? '?' : '&') + 'channel=' + (location.search.replace(/.*?channel=([^\s&]+).*/, "$1"));
                    }
                }
                window.location.href = hf;
            });

        }
        //添加搜索历史
    });
    // 获取城市列表 -dm
    $("#citySelect").on('click', 'dt', function (e) {
        var city = $.parseJSON($.cookie('XIN_LOCATION_CITY'))['ename'];
        var $this = $(this);
        if ($this.next().length) {
            var oDt = $this, oDD = $("#citySelect dd");
            oDD.toggle();
            oDD.is(':hidden') ? oDt.removeClass('active') : oDt.addClass('active');
        } else {			
            var old = $this.parent().html();
            $.get('/apis/apis_ajax/get_city/' + city, { channel: channel }, function (data) {
                $this.parent().html(old + data);
                $('#cityWrap').show().prev().addClass('active');
                autoListAdd();
                goBranWord();
            });
        }
    });


    $(document).mouseup(function (e) {
        if ($(e.target).parents("#citySelect").length == 0) {
            $("#citySelect dt").removeClass("active");
            $("#cityWrap").hide();
        }
    });

    // 返回顶部按钮自动换色
    $(window).scroll(function () {
        if ($(window).scrollTop() > 10) {
            $('#goTop').addClass("goTopHover");
            $('.fixed-head-wrap').addClass("addShadow");
        } else if ($(window).scrollTop() < 10) {
            $('#goTop').removeClass("goTopHover");
            $('.fixed-head-wrap').removeClass("addShadow");
        }
    });
    //返回顶部
    $('#goTop').click(function () {
        $("html, body").animate({scrollTop: 0}, 200);
    });

    // 登陆界面添加回车事件按钮
    $("#popupLogin").keydown(function (e) {
        var e = e || window.event;
        var id = e.target.id;
        remove_hint($('#' + id));
        var curKey = e.which;
        if (curKey == 13) {
            $("#login_btn").click();
            return false;
        }
    });
    // 注册界面添加回车事件按钮
    $("#redeemPrizes").keydown(function (e) {
        var e = e || window.event;
        var id = e.target.id;
        remove_hint($('#' + id));
        var curKey = e.which;
        if (curKey == 13) {
            $("#register_now").click();
            return false;
        }
    });
    // 下一步添加回车事件按钮
    $("#forPass").keydown(function (e) {
        var e = e || window.event;
        var id = e.target.id;
        remove_hint($('#' + id));
        var curKey = e.which;
        if (curKey == 13) {
            $("#next_step").click();
            return false;
        }
    });

    // 提交添加回车按钮事件
    $("#forgetNext").keydown(function (e) {
        var e = e || window.event;
        var id = e.target.id;
        remove_hint($('#' + id));
        var curKey = e.which;
        if (curKey == 13) {
            $("#reset_passwd").click();
            return false;
        }
    });

    // 修改密码界面添加回车事件按钮
    $("#modify_passwd").keydown(function (e) {
        var e = e || window.event;
        var id = e.target.id;
        remove_hint($('#' + id));
        var curKey = e.which;
        if (curKey == 13) {
            $("#change_pass").click();
            return false;
        }
    });

    // 密码确认onblur事件
    $("#psw4,#psw10,#psw16").on("blur", function (e) {
        var id = $(this).attr('id');
        var wid = Number(id.substring(3)) - 1;
        id = Number(id.substring(3)) - 2;
        var pass = $("#psw" + id).val();
        var cpass = $(this).val();
        if ((typeof cpass == 'undefined') || (cpass.toString().length < 1)) {
            $('#psw' + wid).show();
            $(this).hide();
            return false;
        }
        if (pass != cpass) {
            if ($(this).attr('id') == 'psw4') {
                add_hint($(this), '<b class="error">两次输入的密码不一致</b>', 'error', 1);
            } else {
                add_hint($(this), '<b class="error">两次输入的密码不一致</b>', 'error');
            }
        } else {
            add_hint($(this), '<b class="sure"></b>', 'sure');
        }
    });

    $("#psw1,#psw3,#psw5,#psw7,#psw11,#psw13,#psw15").on("blur", function (e) {
        var id = $(this).attr('id');
        id = Number(id.substring(3)) + 1;
        $(this).hide();
        $('#' + id).show();
    });

    // 手机号input事件，值有变化时触发，清除错误警告信息或正确提示信息
    $("#regi_mobile,#studio_mobile,#search,#search1,#search3,#free_mobile,#consult_mobile").on("input", function (e) {
        remove_hint($(this));
    });

    // 密码input事件，值有变化时触发，密码超过20位是给出警告信息
    $("#psw2,#psw8,#psw6").on("input", function (e) {
        if ($(this).val().length > 20) {
            //add_hint($(this),'<b class="error">密码长度不能超过20位</b>','error');
            $(this).val($(this).val().substring(0, 20));
            return false;
        }
    });

    // 验证码input事件，一旦验证码个数到达6位，触发blur事件
    $("#validatecode,#search4,#search2,#valicode1,#validate_code_studio").on("input", function (e) {
        if ($(this).val().length == 6) {
            $(this).blur();
        }
    });



    /*输入框focus效果*/
    $("#search,#search1,#search2,#search3,#search4,#search5,#search6,#search7,#regi_mobile,#studio_mobile,#mobile,#mobile2,#sms_captcha,#suptare,#validatecode,#validate_code_studio,#piccode,#piccode_r,#piccode_l,#piccode_c,#piccode_g,#topSearch,#psw1,#psw3,#psw5,#psw7,#psw9,#psw11,#psw13,#psw15,#update_mobile,#valicode1,#real_name,#real_mobile,#real_carid,#invited_mobile,#invite_code,#user_name2,#user_name1,#id_card,#mobile,#free_mobile,#consult_mobile,#studio_name,#validate_code_studio,#piccode_o").focus(function () {
        //获取焦点时，如果原来有错误警告消息，则删除
        if ($(this).next().hasClass('error') == true) {
            $(this).next().remove();
        }
        if ($(this).next().hasClass('error_num') == true) {
            $(this).next().remove();
        }
        if ($(this).next().hasClass('error_1') == true) {
            $(this).next().remove();
        }
        if ($(this).next().next().hasClass('error') == true) {
            $(this).next().next().remove();
        }
        if ($(this).val() == this.defaultValue) {
            $(this).val("").css("color", "#333");
            if ($(this).attr('id') == 'psw1') {
                $("#psw1").hide();
                $("#psw2").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw3') {
                $("#psw3").hide();
                $("#psw4").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw5') {
                $("#psw5").hide();
                $("#psw6").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw7') {
                $("#psw7").hide();
                $("#psw8").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw9') {
                $("#psw9").hide();
                $("#psw10").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw11') {
                $("#psw11").hide();
                $("#psw12").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw13') {
                $("#psw13").hide();
                $("#psw14").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw15') {
                $("#psw15").hide();
                $("#psw16").show().focus().css("color", "#bfbfbf");
            }
        }
    }).blur(function () {
        if ($(this).val() == '') {
            $(this).val(this.defaultValue).css("color", "#bfbfbf");
        }
    });

    // lazy load for vcode
    $('.logintab a').eq(1).click(function () {
        $('#popupLogin .PageNum').eq(1).html('<img src="/register/get_vcode/" id="vcodeimg_r"/>');
        $('#vcodeimg_r').bind('click', function () {
            if ($('#vcodeimg_r').next().hasClass('error') || $('#vcodeimg_r').next().hasClass('sure')) {
                $('#vcodeimg_r').next().remove();
            }
            flush_vcode('#vcodeimg_r');
        });
    });

    $('.forPass a').eq(0).click(function () {
        $('#forPass .PageNum').html('<img src="/register/get_vcode/" id="vcodeimg_g">');
        $('#vcodeimg_g').bind('click', function () {
            if ($('#vcodeimg_g').next().hasClass('error') || $('#vcodeimg').next().hasClass('sure')) {
                $('#vcodeimg_g').next().remove();
            }
            flush_vcode('#vcodeimg_g');
        });
    });
    // 修改 城市列表为ajax方式之后,-dm
    function autoListAdd() {
        var oTar = $("#topSearch");
        if (oTar.length > 0) {
            var auto = $("#topSearch").autocomplete({
                appendTo: "#cityWrap .hot-city",
                position: {my: "left top", at: "left bottom"},
                source: function (request, response) {
                    $.ajax({
                        url: "/location_city/",
                        dataType: "json",
                        data: {
                            q: request.term
                        },
                        success: function (data) {
                            response(
                                    $.map(data, function (val, i) {
                                        return {'label': data[i].cityname, 'value': data[i].cityname, 'ename': data[i].ename};
                                    }));
                        }
                    });
                },
                minLength: 1,
                select: function (event, ui) {
                    window.location.href = '/' + ui.item.ename + '/';
                }
            }).data("ui-autocomplete");
            auto._renderItem = function (ul, item) {
                return $("<li>").addClass("CommonSearch").append(item.label).appendTo(ul);
            };
            auto._renderMenu = function (ul, items) {
                var that = this;
                $.each(items, function (index, item) {
                    that._renderItemData(ul, item);
                });
            };
            auto._resizeMenu = function (ul, item) {
                $(this.menu.element).attr('style', 'z-index:299;position:absolute;height:300px;overflow-y:scroll');
                this.menu.element.outerWidth($("#topSearch").css("width"));
            };
            oTar.on({
                'focus': function () {
                    if ($(this).val() == this.defaultValue) {
                        $(this).val("").css("color", "#333");
                    }
                },
                'blur': function () {
                    if ($(this).val() == '') {
                        $(this).css('color', '#bfbfbf');
                    }
                }
            });
        }
    }
    function goBranWord(){
        var Letter = $(".pro-letter em");
        var LetterCon = $(".cityMore");
        Letter.each(function () {
            $(this).attr("title", $(this).text());
        });
        LetterCon.each(function () {
            $(this).attr("id", $(this).find("span:first b").text());
        });
        Letter.click(function () {
            var index = this.title;
            var id = $('#' + index);
            var speed = 300;
            var height = {scrollTop: $(id).offset().top - $("#citySelect").parent().offset().top - 60};
            $("#cityWrap").animate(height, speed);
        });
        $("#cityWrap").mouseup(function () {
            return false;
        });
    }
    autoListAdd();
});

//搜索历史和搜索日志
function search_log(jsonstr) {
    if (jsonstr) {
        $.cookie('XIN_SUGGEST_HISTORY_ADD', jsonstr, {path: '/', expires: 24 * 60 * 60});
        $.post('/apis/apis_suggest/search_log/', {h: jsonstr, c: TOP_INFO.location.ename});
    }
}
//搜索历史和搜索日志
function search_shop_log(jsonstr) {
    if (jsonstr) {
        $.cookie('XIN_SUGGEST_SHOP_HISTORY_ADD', jsonstr, {path: '/', expires: 24 * 60 * 60});
        $.post('/apis/apis_suggest/search_shop_log/', {h: jsonstr, c: TOP_INFO.location.ename});
    }
}
/**
 * 显示提示信息
 */
function show_tip(msg) {
    $("#warmTip10 .span_xin_msg").text(msg);
    show_popup("#warmTip10", "#warmTip10 .closeJs");
}
/**
 * 验证手机号
 * @param  {[type]} mobile [description]
 * @return {[type]}      [description]
 */
function is_valid_mobile(mobile) {
    if ((mobile == '请输入手机号') || (mobile == '')) {
        return '手机号不能为空';
    }
    var reg = /^1\d{10}$/;
    if (!reg.test(mobile)) {
        return '手机号格式不正确';
    }
    return 1;
}
/**
 * 验证密码
 * @param  {[type]}  [description]
 * @return {[type]}      [description]
 */
function is_valid_pass(pass) {
    if (pass == '') {
        return '密码不能为空';
    }
    if ((pass.length > 20) || (pass.length < 6)) {
        return '密码格式不正确';
    }
    return 1;
}

/*
 *验证中文名
 */
function is_valid_name(name) {
    if (name.match(/^[\u4e00-\u9fa5][\u4e00-\u9fa5][\u4e00-\u9fa5]?[\u4e00-\u9fa5]?$/)) {
        return 1;
    }
    return -1;
}

/**
 * 清空验证错误信息和原来输入信息
 */
function clear_invalid() {
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
 * 验证值是否为空
 */
function is_empty(val) {
    if ((typeof val == 'undefined') || (val.toString().length < 1)) {
        return true;
    }
    return false;
}
/**
 * 列表页和详情页点击更多
 */
var scrollChangeVal = 0;
function moreClick(h, m, openHtml, retractHtml, moreActive) {
    var handle = $(h), divMore = $(m);
    handle.bind('click', function () {
        var self = $(this);
        if (divMore.css("display") == "block") {
            if (h == '#putaway') {
                if (scrollChangeVal != 0) {
                    $(document).scrollTop(scrollChangeVal);
                } else {
                    $(document).scrollTop(self.parent().attr('scrollVal'));
                }
            }
            divMore.hide();
            handle.html(openHtml).removeClass(moreActive);
        } else if (divMore.css("display") == "none") {
            if (typeof (scrollChangeVal) == "undefined") {
                self.parent().attr('scrollVal', $(document).scrollTop());
            } else {
                scrollChangeVal = $(document).scrollTop();
            }
            divMore.show();
            handle.html(retractHtml).addClass(moreActive);
        }
    })
}

function get_type(id) {
    switch (id) {
        case 'regi_mobile':
            var typeVal = 'reg';
            break;
        case 'search3':
            var typeVal = 'get';
            break;
        case 'search1':
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
function add_hint(select, msg, type, page) {
    if ((select.next().hasClass('error') == true) || (select.next().hasClass('sure') == true)) {
        select.next().remove();
    }
    if ((select.next().hasClass('error_num') == true) || (select.next().hasClass('sure') == true)) {
        select.next().remove();
    }
    if ((page == 1) || ($('.error').length == 0)) {
        select.after(msg);
    }
}

/*
 * 移除验证结果信息
 */

function remove_hint(select) {
    if (select.next().hasClass('error') || select.next().hasClass('sure')) {
        select.next().remove();
    }
    if (select.next().hasClass('error_num') || select.next().hasClass('sure')) {
        select.next().remove();
    }
    if (select.next().next().hasClass('error') || select.next().next().hasClass('sure')) {
        select.next().next().remove();
    }
}
/**
 * 判断字符的个数
 */
function getByteLen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var a = str.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        } else {
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
    var strLength = str.replace(chineseRegex, "**").length;
    for (var i = 0; i < strLength; i++) {
        singleChar = str.charAt(i).toString();
        if (singleChar.match(chineseRegex) != null) {
            newLength += 2;
        } else {
            newLength++;
        }
        if (newLength > len) {
            break;
        }
        newStr += singleChar;
    }

    if (hasDot && strLength > len) {
        newStr += "...";
    }
    return newStr;
}

var flush_vcode = function (obj) {
    var str = '/register/get_vcode?r=' + new Date();
    $(obj).prop('src', str);
}

/**
 * 安装注册
 * 
 * @param {type} u
 * @param {type} p
 * @returns {undefined}
 */
function install_register(u, p) {
    var _mvq = window._mvq || [];
    window._mvq = _mvq;
    _mvq.push(['$setAccount', 'm-155044-0']);
    _mvq.push(['$setGeneral', 'registered', '', /*用户名*/ u, /*用户id*/ p]);
    _mvq.push(['$logConversion']);
}

/**
 * channel合作渠道url检测
 * require jquery.js
 */
function check_channel() {
//    var channel = "{$channel}";
//    if (channel) {
//        $('a').each(function () {
//            if($(this).attr('href').indexOf('channel=') === -1) {
//                if(!(($(this).attr('href')=='#') || ($(this).attr('href').indexOf('javascript'))==0)){
//                	$(this).attr('href', $(this).attr('href') + ($(this).attr('href').indexOf('?') === -1 ? '?' : '&') + 'channel=' + channel);
//                }
//            }
//        });
//    }
}

//channel合作渠道链接处理
function channel_url(url) {
    url = $.trim(url);
    if (location.search.indexOf('channel=') !== -1) {
        if (url.indexOf('channel=') === -1) {
            url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'channel=' + (location.search.replace(/.*?channel=([^\s&]+).*/, "$1"));
        }
    }
    return url;
}

// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}