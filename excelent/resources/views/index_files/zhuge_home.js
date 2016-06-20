/**
 * Created by wangheling on 2016/6/15.
 */
;$(function(){
    //首页改版打点
    var zhuge_city = $("#current_city_id").html();
    //买车
    $('.top_buycar').on('click',function(){
        zhuge_track('C-顶部-买车',{ '城市': zhuge_city,'页面属性':'首页' });
    });
    //卖车
    $('.top_sellcar').on('click',function(){
        zhuge_track('C-顶部-卖车',{ '城市': zhuge_city,'页面属性':'首页' });
    });
    //付一半 top_halfprice
    $('.top_halfprice').on('click',function(){
        zhuge_track('C-顶部-付一半',{ '城市': zhuge_city,'页面属性':'首页' });
    });
    // 宝典 top_book
    $('.top_book').on('click',function(){
        zhuge_track('C-顶部-宝典',{ '城市': zhuge_city,'页面属性':'首页' });
    });
    // APP  top_app
    $('.top_app').on('click',function(){
        zhuge_track('C-顶部-APP',{ '城市': zhuge_city,'页面属性':'首页' });
    });
    //  登录 #xin_top_userinfo #loginA
    $('#xin_top_userinfo').on('click','#loginA',function(){
        zhuge_track('C-顶部-登录',{ '城市': zhuge_city,'页面属性':'首页' });
    });
    // 注册 #xin_top_userinfo #regA
    $('#xin_top_userinfo').on('click','#regA',function(){
        zhuge_track('C-顶部-注册',{ '城市': zhuge_city,'页面属性':'首页' });
    });

    //搜索
    $('.search-btn').on('click',function(){
        var text = $('#brandSearch').val();
        if (text) {
            zhuge_track('C-首页-搜索',{ '城市': zhuge_city,'关键词':text });
            uxl_track('w_home/search');
        }
    });

    //我要卖车
    $('.sell-car').on('click',function(){
        zhuge_track('C-首页-我要卖车',{ '城市': zhuge_city });
        uxl_track('w_home/sellcar');
    });

    //品牌打点
    $('.brand_div').on('click','a',function(){
        var index = parseInt($(this).index()) + 1;
        var brandid = $(this).attr('data_brand');
        zhuge_track('C-首页-品牌',{ '城市': zhuge_city,'车源位置':index,'品牌ID':brandid });
        uxl_track('w_home/brand/'+brandid+'/rank/'+index);
    });

    $('.brand-more dd').on('click','a',function(){
        var index = 13;
        var brandid = $(this).attr('data_brand');
        zhuge_track('C-首页-品牌',{ '城市': zhuge_city,'车源位置':index,'品牌ID':brandid });
        uxl_track('w_home/brand/'+brandid+'/rank/'+index);
    });

    //价格
    $('.price_div').on('click','a',function(){
        var text = $(this).text();
        var price = $(this).attr('data_price') ? $(this).attr('data_price') : 0;
        zhuge_track('C-首页-价格',{ '城市': zhuge_city,'价格':text });
        uxl_track('w_home/price/'+price);
    });

    //车型
    $('.modal_div').on('click','a',function(){
        var index = parseInt($(this).index()) + 1;
        var modalid = $(this).attr('data_id');
        zhuge_track('C-首页-车型',{ '城市': zhuge_city,'车源位置':index,'车型ID':modalid });
        uxl_track('w_home/type/'+modalid+'/rank/'+index);
    });

    // 付一小半 更多
    $('.halfprice_more').on('click',function(){
        zhuge_track('C-首页-付一小半更多',{ '城市': zhuge_city });
        uxl_track('w_home/halfprice_more');
    });

    // C-首页-付一小半首付低 & C-首页-付一小半月供低
    $('.halfpay-car-list').on('click','a',function(){
        var index = parseInt($(this).index()) + 1;
        if (parseInt($('.halfprice_more').next('p').css('left')) > 138) {
            var key = '月供低';
            var str = 'permonth/';
        } else {
            var key = '首付低';
            var str = 'firstpay/';
        }

        zhuge_track('C-首页-付一小半'+key,{ '城市': zhuge_city,'车源位置':index });
        uxl_track('w_home/halfprice_'+str+index);
    });

    //C-首页-推荐准新车   C-首页-推荐练手车  C-首页-推荐家用代步  C-首页-推荐商务精英  C-首页-推荐MPV/SUV
    $('.intro_nav').on('hover',function(){
        $(this).addClass('click_Class').siblings().removeClass('click_Class');
    });
    $('.recommend-car-list').on('click','dd',function(){
        var index = parseInt($(this).index()) + 1;
        var arr_key = ['准新车','练手车','家用代步','商务精英','MPV/SUV'];
        var arr_str = ['newcar','practicecar','homeusecar','businesscar','mpvcar'];
        for (var i = 0,len=$('.intro_nav').length; i<len;i++) {
            if ($('.intro_nav').eq(i).hasClass('click_Class')) {
                var key = arr_key[i];
                var str = arr_str[i];
                break;
            }
        }
        zhuge_track('C-首页-推荐'+key,{ '城市': zhuge_city,'车源位置':index });
        uxl_track('w_home/intro_'+str+'/'+index);
    });

    //推荐 更多 intro_more
    $('.intro_more').on('click',function(){
        var arr_key = ['准新车','练手车','家用代步','商务精英','MPV/SUV'];
        var arr_str = ['newcar','practicecar','homeusecar','businesscar','mpvcar'];
        for (var i = 0,len=$('.intro_nav').length; i<len;i++) {
            if ($('.intro_nav').eq(i).hasClass('click_Class')) {
                var key = arr_key[i];
                var str = arr_str[i];
                break;
            }
        }
        zhuge_track('C-首页-推荐-更多',{ '城市': zhuge_city,'推荐分类':key });
        uxl_track('w_home/intro_more/'+str);
    });

    //C-首页-品牌旗舰店更多
    $('.factory_more').on('click',function(){
        zhuge_track('C-首页-品牌旗舰店更多',{ '城市': zhuge_city });
        uxl_track('w_home/factory/more');
    })

    //C-首页-品牌旗舰店-品牌
    $('.brand_nav').on('click',function(){
        var index = parseInt($(this).index()) + 1;
        var bid   = $(this).attr('bid');
        zhuge_track('C-首页-品牌旗舰店-品牌',{ '城市': zhuge_city,'品牌位置':index,'品牌ID':bid });
        uxl_track('w_home/factory/brand/'+bid+'/rank/'+index);
    });

    //C-首页-品牌旗舰店-车源
    $('.brand_nav').on('hover',function(){
        $(this).addClass('click_Class').siblings().removeClass('click_Class');
    });
    $('.seller-car-list').on('click','dd',function(){
        var index = parseInt($(this).index()) + 1;
        for (var i = 0,len=$('.brand_nav').length; i<len;i++) {
            if ($('.brand_nav').eq(i).hasClass('click_Class')) {
                var bid = $('.brand_nav').eq(i).attr('bid');
                break;
            }
        }
        zhuge_track('C-首页-品牌旗舰店-车源',{ '城市': zhuge_city,'车源位置':index,'品牌ID':bid });
        uxl_track('w_home/factory/source/'+bid+'/rank/'+index);
    });

    //热点位置
    $('.qa-list').on('click','p',function(){
        var index = parseInt($(this).index()) + 1;
        zhuge_track('C-首页-热点',{ '城市': zhuge_city,'热点位置':index });
        uxl_track('w_home/hot/'+index);
    });

    //热点 图片
    $('.qa-hot').on('click',function(){
        zhuge_track('C-首页-热点图片',{ '城市': zhuge_city });
        uxl_track('w_home/hot/picture');
    })

    //C-首页-宝典
    $('.book_click').on('click',function(){
        zhuge_track('C-首页-宝典',{ '城市': zhuge_city });
        uxl_track('w_home/book');
    });

    //C-首页-文章
    $('.article_click').on('click',function(){
        zhuge_track('C-首页-文章',{ '城市': zhuge_city });
        uxl_track('w_home/article');
    });

    //C-首页-买车者故事
    $(document).on('scroll',function(){
        if ( ( $(document).scrollTop() <  parseInt($('.story-wrap').offset().top+25) ) && ( $(document).scrollTop() >  parseInt($('.story-wrap').offset().top) ) ){
            zhuge_track('C-首页-买车者故事',{ '城市': zhuge_city });
        }
    });

    //C-首页-付一半介绍
    $('.halfprice_intro_click').on('click',function(){
        zhuge_track('C-首页-付一半介绍',{ '城市': zhuge_city });
    });
});
