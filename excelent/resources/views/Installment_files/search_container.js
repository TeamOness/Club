$(function(){
       $('.free_consult').each(function(i,item){
            var self = $(this);
            $(this).on('click',function(e){
                flush_vcode_c0();
                e.preventDefault();
                self.next().toggle();
            })
        }) 
       $('.free_con_div').each(function(i,item){
            $(this).on('mouseup',function(e){
                return false;
            })
        })

       $(document).mouseup(function(e){
            if($(e.target).parent(".tel").length==0){
                $(".free_con_div").hide();
                $('.error_1').remove();
                $('.php_pic_code').each(function(i,item){
                    $(this).val('请输入图片码').css("color", "#bfbfbf");
                })
                $('.php_process_style').each(function(i,item){
                    $(this).val('请输入手机号').css("color", "#bfbfbf");
                })
                flush_vcode_c0();
            }
        });

       $('.php_process_style').each(function(i,item){
            $(this).on('focus',function(e){
                $('.error_1').remove();
                if ($(this).val() == '请输入手机号') {
                    $(this).val("").css("color", "#333");
                } 
            })
            $(this).on('blur',function(e){
                $('.error_1').remove();
                if ($(this).val() == ''){
                    $(this).val('请输入手机号').css("color", "#bfbfbf");
                }
            })
       })

       $('.php_pic_code').each(function(i,item){
            $(this).on('focus',function(e){
                $('.error_1').remove();
                if ($(this).val() == '请输入图片码') {
                    $(this).val("").css("color", "#333");
                } 
            })
            $(this).on('blur',function(e){
                $('.error_1').remove();
                if ($(this).val() == ''){
                    $(this).val('请输入图片码').css("color", "#bfbfbf");
                }
            })
       })

       $('.pop-tel').each(function(i,item){
            var self = $(this);
            $(this).on('click',function(e){
                var carid = $(this).data('carid');
                var mobile = $(this).prev().prev().prev().val();
                var piccode = $(this).prev().prev().val();
                var valid = is_valid_mobile(mobile);
                if (valid != 1){
                    if ($(this).prev().hasClass('error_1')){
                        return false;
                    }
                    $(this).before("<a href='javascript:void(0)' class='error_1'>" + valid + "</a>");
                    return false;
                }
                $(".free_con_div").hide();
                show_popup('#creditYes','#creditYes .closeJs');
                _smq.push(['custom', '免费电话', '输入号码', '提交成功']);
                $.post('/car/free_call/',{ 'carid':carid, 'client_phone' : mobile , 'client_type' : 3 , 'piccode' : piccode, type:'ajax' },function(data){
                   var data = JSON.parse(data);
                   if (data.code == 1){
                        $(".free_con_div").hide();
                        self.prev().val('请输入手机号').css("color", "#bfbfbf");    
                   }    
                });
            })
       })
      
});

function flush_vcode_c0 (){
        var str = '/register/get_vcode?r='+ new Date(); 
        var imageobj = $('.php_vcodeimg'); 
        imageobj.prop('src', str);  
    }

    $('.php_pic_code').click(function(){
        flush_vcode_c0();
    });

    function get_vcode(data){
        if(!data) return;
    }
