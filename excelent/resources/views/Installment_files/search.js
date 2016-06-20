$(function() { 
    squid.swing.jselect();
    //车辆快速查询条件：里程，类型，变速箱，国别切换事件
    $('.search_select_change').change(function() {
        zhuge_ckflag(1, '列表页-筛选');
        xin_search_page_sub($(this));
    });
    //排序和显示方式切换事件
    $("#search_container").on('click', '.view_o,.view_a,.view_v', function() {
        xin_search_page_sub($(this));
    });
    //翻页事件
    $("#search_container").on('click', '.search_page_link a', function() {
        $("#hidden_i").val($(this).data('page'));
        xin_search_page_sub($(this));
    });
    //自定义价格提交事件
    $("#customer_price").click(function() {
        var p_s = $("#price_s").val();
        var p_e = $("#price_e").val();
        if ((p_s != '' && (!$.isNumeric(p_s) || p_s < 0)) || p_e != '' && (!$.isNumeric(p_e) || p_e < 0)) {
            $("#other-price-error").show();
            return false;
        }
        var price = '';
        if ($.isNumeric(p_s)) {
            p_s = parseFloat(p_s);
            price = p_s + "-";
        }
        if ($.isNumeric(p_e)) {
            p_e = parseFloat(p_e);
            price = price ? price + p_e : '-' + p_e;
        }
        var price_txt = ''
        if (p_s && p_e) {
            if (p_s > p_e) {
                price = p_e + '-' + p_s;
                price_txt = p_e + '-' + p_s + '万';
            } else {
                price_txt = p_s == p_e ? (p_e + '万') : (p_s + '-' + p_e + '万');
            }
        } else if (p_s) {
            price_txt = p_s + '万以上';
        } else if (p_e) {
            price_txt = p_e + '万以下';
        } else {
            price_txt = '全部价格';
        }
        if (price_txt) {
            $("#price_tipbtn").html(price_txt + '<i class="searched-ico opt"></i>').next(".PopBox").find('li a').each(function() {
                $(this).removeClass("cur");
                if ($(this).text() == price_txt) {
                    $(this).addClass("cur");
                }
            });
        }
        $("#hidden_p").val(price);
        $select3.find('dd').removeClass('selected');
        var oTmpDom = $('<dd class="selected"><a data-for="hidden_p" data-valueid="' + price + '">' + price_txt + '</a></dd>');
        changeCurr(oTmpDom);
	
        zhuge_track('价格筛选', { '价格区间': (price + '万'), '来源页面': (is_hf ? '付一半列表页' : '车辆列表页') });
        var is_hf = /\/h\//.test(location.href);
        if (is_hf) {
            zhuge_track('C-付一半列表页-全部价格',{ '价格':price  });
            uxl_track('w_carlist/halfprice/price/'+price);
        } else {
            zhuge_track('C-车辆列表页-全部价格',{ '价格':price  });
            uxl_track('w_carlist/price/'+price);
        }
        zhuge_track('C-车辆列表页-自定义价格', { '城市':TOP_INFO.location.cityname ? TOP_INFO.location.cityname : '--' });
        xin_search_page_sub(null);
    });
    //自定义价格输入显示两位小数
    $("#price_s,#price_e").bind('keyup change', function(event) {
        var v = $(this).val();
        if (event.ctrlKey && event.keyCode == 86 && /[^0-9\.]/.test(v)) {
            $(this).val('');
        } else if (/[^0-9\.]/.test(v)) {
            v = v.replace(/[^0-9\.]/g, "");
            $(this).val(v.replace(/(^[0-9]*\.[0-9]{2})([0-9]*)$/, "$1"));
        }
    }).bind('keydown', function(event) {
        var v = $(this).val();
        if (v.length >= 12 && event.keyCode != 8) {
            return false;
        } else if (/(\.)/.test(v) && event.keyCode == 190) {
            return false;
        } else if (/(\.[0-9]{2})/.test(v) && ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
            return false;
        } else if (!(event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 190 || event.keyCode == 110 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 45 || (event.ctrlKey && event.keyCode == 86) || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {

            return false;
        }
    });
    //删除颜色条件.close事件
    $('.color-type').on('click', '.close', function(e) {
        var name = $(this).prev("input").attr('name');
        $("input[name='" + name + "']").prop("checked", false).parent().removeClass("checked");
        xin_search_page_sub();
        e.stopPropagation();
        return false;
    });

    /**缓存一些常用变量*/
    var $brandCars = $('.brand-cars'), //所有品牌
        $select1 = $('#select1'), //品牌
        $select2 = $('#select2'), //默认展示车系
        $select3 = $('#select3'), //价格
        $search_serial = $("#search_serial"), //所有车系
        $select_result = $('.select-result dl'), //当前查询结果
        $select_reset = $('.select-reset'); //重置查询条件
    var arr_relation = { 'b': '品牌', 's': '车系', 'p': '价格', 'r': '车龄', 'k': '里程', 'j': '排量', 'c': '颜色', 'g': '变速箱', 'q': '座位数' };
    var default_brand = (function() { //默认品牌
        var arr = [];
        $select1.find('a[data-for="hidden_b"]').each(function(i, e) {
            if ($(e).attr('data-placeholder') == '') {
            }else{
                i ? arr.push($(this).data('valueid')) : void 0;
            }
        });
        return arr;
    })();
    var default_series = (function(){//每个品牌下的默认车系
        var arr = [];
        $select2.find('a[data-for="hidden_s"]').each(function(i, e) {
            if ($(e).attr('data-placeholder') == '') {
            }else{
                i ? arr.push($(this).data('valueid')) : void 0;
            }
        });
        return arr;
    })();

    $('#search_search').css('color', '#BFBFBF');
    //品牌车系排量价格切换提交查询
    $(".PopBox,.searchLabel,.searchCond").on('click', 'a', function(event) {
        var $this = $(this);
        var valueid = $this.data('valueid');
        var a_for = $this.data('for');
        if (a_for == "hidden_b") { // 品牌
            showCarSeries(valueid);
            $("#hidden_s").val('0');
            $("#hidden_m").val('0');
            $('#seriesDefault').hide();
            $('.PopBox_hidden_b').hide();
            $select2.show();
            $select_result.find('a[data-for="hidden_s"],a[data-for="hidden_m"]').parent().remove();
            changeCurr($this.parent());
        } else if (a_for == "hidden_s") { // 车系
            $("#hidden_m").val('0');
            $('.PopBox_hidden_s').hide();
            if ($this.data('brandid')) {
                return;
            }
            changeCurr($this);
        } else if (a_for == "hidden_p") {
            //点击价格时清除自定义价格
            $("input[name='price_s']").val('');
            $("input[name='price_e']").val('');
            changeCurr($this.parent());
        } else if (a_for == 'hidden_v') {
            console.log(valueid);
        } else {
            changeCurr($this.parent());
        }
        if ($this.parents(".searchLabel").length) {
            $(".PopBox_" + a_for).hide();
            $this.parent().addClass("selected").siblings().removeClass("selected");
            $(".brand-letter .spell").removeClass("cur");
            var brandid = $(this).data("valueid");
            var data_spell = $(this).data("spell");
            var li_spell = $(".li_spell_" + data_spell + " a");
            li_spell.removeClass("cur");
            $.each(li_spell, function(key, item) {
                if ($(item).data("valueid") == brandid) {
                    $(item).addClass("cur");
                }
            });
        }
        $("#" + a_for).val(valueid);
        xin_search_page_sub();
    });

    // 默认推荐的车（包括品牌和车系）点击事件 特殊处理
    $('#seriesDefault').on('click', 'a[data-for="hidden_s"]', function() {
        var $this = $(this),
            bId = $this.data('brandid'),
            sId = $this.data('valueid');
        showCarSeries(bId, function() {
            var bStr = 'a[data-valueid=' + bId + ']',
                sStr = 'a[data-valueid=' + sId + ']';
            if ($select1.find(bStr).length) {
                var oA_b = $select1.find(bStr)
            } else {
                var oA_b = $('.frame-brand').find(bStr);
            }
            if ($select2.find(sStr).length) {
                var oA_s = $select2.find(sStr).parent();
            } else {
                var oA_s = $search_serial.find(sStr);
            }
            changeCurr(oA_b.parent());
            changeCurr(oA_s);
        });
        $('#hidden_b').val(bId);
        $('#hidden_s').val(sId);
        xin_search_page_sub();
    });

    //颜色选择提交查询 --（没有找到 clas=color-type,估计是以前旧的）
    $('.color-type').on('click', "label.search_click", function(e) {
        var obj = $(this).children(':radio');
        obj.prop("checked", true);
        var name = obj.attr('name');
        $("input:radio[name='" + name + "']").parent().removeClass("checked");
        $(this).addClass("checked");
        xin_search_page_sub(obj);
        e.stopPropagation();
        return false;
    });

    moreClick("#ShowBtn", "#ShowCon", "<b class='searched-ico more-ico'></b>更多条件<i class='searched-ico opt'></i>", "<b class='searched-ico more-ico'></b>更多条件<i class='searched-ico opt active'></i>", "")

    //品牌拼音切换
    $(".brand-letter .spell").click(function() {
        $(".brand-cars li").hide();
        $(".brand-letter .spell").removeClass("cur");
        $(this).addClass("cur");
        $(".brand-cars li").eq($(".brand-letter .spell").index($(this))).show();
    });

    //车源条件切换
    $("label[for='v']").click(function() {
        if (!$(this).hasClass('source-active')) {
            $(this).prev().prop('checked', true);
            $(this).addClass("source-active");
        } else {
            $(this).removeClass("source-active");
            $(this).prev().prop('checked', false);
        }
        xin_search_page_sub($(this).prev());
    });

    // 车源条件说明文字
    // $(".car-source li").hover(function(){
    //     $(this).find('em').show();},function(){
    //     $(this).find('em').hide();
    // });

    //搜索弹出选择框效果,隐藏掉弹出的框
    $(document).bind('click', function(e) {
        var tar = e.srcElement || e.target;
        if (!$(tar).hasClass('TipBtn') && !$(tar).parent().hasClass('TipBtn') && !$(tar).hasClass('spell') &&
            $(tar).attr("class") != "txt" && !$(tar).hasClass('menu-selected') && !$(tar).hasClass('Sitem')) {
            $('.PopBox').hide();
            $(".TipBtn").removeClass('active');
            $('.menu').hide();
            $('.switch').parent().css({ 'border': '1px solid #e5e5e5' }).find('ul').hide();
        }
    });

    $(".TipBtn").click(function() { //更多按钮
        var TipB = $(".TipBtn"),
            hides = $(".PopBox"),
            $this = $(this);
        $this.toggleClass('active');
        if ($this.hasClass('TipBtn_hidden_b')) { //点击车系更多
            $('.PopBox_hidden_b').toggle();
            var spell = $select1.find('dd.selected a').data('spell'),
                bId = $select1.find('dd.selected a').data('valueid');
            spell = spell ? spell : 'A';
            var spell_list = $("li.spell.spell_" + spell),
                brand_list_all = $('li.li_spell'),
                brand_list_cur = $('li.li_spell_' + spell);
            spell_list.addClass('cur').siblings().removeClass('cur');
            brand_list_all.find('a[data-for]').removeClass('cur').parent;
            brand_list_cur.show().siblings().hide();
            brand_list_cur.find('a[data-valueid="' + bId + '"]').addClass('cur').siblings().removeClass('cur');
            if (!$search_serial.is(':hidden')) {
                $search_serial.hide();
            }
        } else {
            $('.PopBox_hidden_s').toggle();
            var sId = $select2.find('dd.selected a').data('valueid');
            if (sId) {
                $search_serial.find('a').removeClass('cur');
                $search_serial.find('a[data-valueid="' + sId + '"]').addClass('cur');
            }
            if (!$('.PopBox_hidden_b').is(':hidden')) {
                $('.PopBox_hidden_b').hide();
            }
        }

    });

    // 暂时去掉overflow:hiddnen,让车系能显示出来
    $('.main.search-opt').css('overflow', 'visible');
    //  店铺、车辆切换
    $('#switchCarShop').on('click', '.switch', function(ev) {
        var $this = $(this);
        var arr = ['请输入品牌、车系搜索', '请输入店铺名称搜索'];
        if (ev.target.nodeName == 'LI') {
            $this.find('input').val($(ev.target).text());
            $this.find('ul').hide();
            $this.parent().css({ 'border': '1px solid #e5e5e5' });
            if ($(ev.target).text() == '车辆') {
                $('#search_search').val(arr[0]).data('default', arr[0]);
            } else {
                $('#search_search').val(arr[1]).data('default', arr[1]);
            }
            $('#search_search').css('color', '#BFBFBF').blur();
            return;
        }
        $this.find('ul').toggle();

        if ($(this).find('ul').is(':hidden')) {
            var css = { 'border': '1px solid #e5e5e5' };
        } else {
            var css = { 'border': '1px solid #FF5837' };
        }
        $this.parent().css(css);
    });
    // 下拉列表条件（车龄、里程、排量等等）
    $('.menu-selected').on('click', function() {
        var $this = $(this);
        $this.toggleClass('active').next().toggle();
        $('.menu').each(function(i, ele) {
            if (i != $this.index('.menu-selected')) {
                $(ele).hide();
            }
        });
    });

    // 当前选择结果操作
    $select_result.on('click', 'dd.selectednew', function() {
        var data_value = $(this).find("a").data("for");
        $(this).remove();
        $("#" + data_value).val("");
        var $tmp = null,
            num = 0,
            txt = '',
            flag = data_value.slice(-1);
        switch (flag) {
            case 'b':
                $tmp = $select1;
                $select_result.find('a[data-for="hidden_s"],a[data-for="hidden_m"]').parent().remove();
                $('#hidden_s,#hidden_m').val(0);
                $('#seriesDefault').show().find('.select-all').addClass('selected').siblings().removeClass('selected');
                $select2.hide();
                showCarSeries(0);
                $('.TipBtn_hidden_s').hide();
                break;
            case 's':
                $tmp = $select2;
                $select_result.find('a[data-for="hidden_m"]').parent().remove();
                $('#hidden_m').val(0);
                if (!$select_result.find('a[data-for="hidden_b"]').length) {
                    $select2.hide();
                    $('#seriesDefault').show().find('.select-all').addClass('selected').siblings().removeClass('selected');
                }
                break;
            case 'p':
                $tmp = $select3;
                $('#price_s,#price_e').val('');
                break;
            case 'r':
                num = 4; //车龄
                break;
            case 'k':
                num = 5; //里程
                break;
            case 'j':
                num = 6; //排量
                break;
            case 'c':
                num = 7; //颜色
                break;
            case 'g':
                num = 8; //变速箱
                break;
            case 'q':
                num = 9; //座位数
                break;
        }
        num && $('.menu-selected' + num).removeClass('selected').text(arr_relation[flag]).next().find('dd').removeClass('selected').eq(0).addClass('selected');
        $tmp && $tmp.find('.select-all').addClass('selected').siblings().removeClass('selected');
        $tmp && $tmp.find('a[data-placeholder]').parent().remove();
        var oResA_ = $select_result.find('a[data-for]');
        if (!oResA_.length) {
            $('.select-result>span').text('请选择筛选条件').removeClass('has-condition').next().hide();
        }
        xin_search_page_sub();
    });
    // 清空所有条件
    $(".select-reset").on("click", function() {
        uxl_track( 'w_' + (is_hf ? 'halfprice_carlist' : 'carlist')  + '/reset' );
        zhuge_track(is_hf ? 'C-付一半列表页-重置条件' : 'C-车辆列表页-重置条件', { '城市':TOP_INFO.location.cityname ? TOP_INFO.location.cityname : '--' });
        $(".select-result .selectednew").remove();
        $("#searchForm input").val("");
        $('.select-all').addClass('selected').siblings().removeClass('selected');
        $select2.hide();
        $('#seriesDefault').show().find('.select-all').addClass('selected').siblings().removeClass('selected');
        $('.menu-selected').each(function() {
            $(this).removeClass('selected').text(arr_relation[$(this).next().find('a').data('for').slice(-1)]).next().find('dd').removeClass('selected');
        });
        $('.TipBtn_hidden_s').hide();
        $('.select-result>span').removeClass('has-condition').text('请选择筛选条件').next().hide();
        $select1.find('a[data-placeholder]').parent().remove();
        xin_search_page_sub();
    });

    /*通用修改查询结果方法*/

    // 修改选择结果
    function addToResult(obj) {
        var $dd = obj,
            $oA = $dd.find('a'),
            type = $oA.data('for').slice(-1),
            val_id = $oA.data('valueid');
        var oResA = $select_result.find('a[data-for=hidden_' + type + ']');
        if (val_id) {
            if (oResA.length) { // 条件已经存在
                oResA.parent().html($dd.html());
            } else { // 条件不存在
                $select_reset.before($dd.clone().removeClass('selected').addClass('selectednew'));
            }
        } else {
            if (type == 'b') {
                $select_result.find('a[data-for=hidden_s],a[data-for=hidden_m]').parent().remove();
            }
            oResA.parent().remove();
        }
        var oResA_ = $select_result.find('a[data-for]');
        if (!oResA_.length) {
            $('.select-result>span').text('请选择筛选条件').removeClass('has-condition').next().hide();
        } else {
            $('.select-result>span').text('当前已选条件').addClass('has-condition').next().show();
        }
        xin_search_page_sub();
    }

    // 高亮选中项
    function changeCurr(obj) {
        if (obj.get(0).nodeName == 'A') {
            var $dd = $('<dd class="selected"></dd>').append(obj.clone());
        } else {
            var $dd = obj;
        }
        var $oA = $dd.find('a'),
            type = $oA.data('for').slice(-1),
            val_id = $oA.data('valueid');
        // if (!$dd.length) {
        //     return
        // };
        switch (type) {
            case 'b':
                if (val_id) {
                    $('#seriesDefault').hide(); //影藏默认推荐车系
                    $select2.show(); //显示车系
                    if ($.inArray(val_id, default_brand) + 1) {
                        $select1.find('a[data-valueid="' + val_id + '"]').parent().addClass('selected').siblings().removeClass('selected');
                    } else {
                        $oA.attr('data-placeholder', '');
                        var oAfter = $select1.find('.select-all');
                        var oPlaceHold = $select1.find('a[data-placeholder]');
                        if (oPlaceHold.length) {
                            oPlaceHold.parent().remove();
                        }
                        $dd.clone().addClass('selected').insertAfter(oAfter).siblings().removeClass('selected');
                    }
                } else {
                    $select1.find('a[data-placeholder]').parent().remove();
                    $select2.find('a[data-placeholder]').parent().remove();
                    $select1.find('.select-all').addClass('selected').siblings().removeClass('selected');
                    showCarSeries(0);
                    $('#seriesDefault').show().find('.select-all').addClass('selected').siblings().removeClass('selected');
                    $select2.hide();
                    $('.TipBtn_hidden_s').hide();
                }
                break;
            case 's':
                if (val_id) {
                    if ($.inArray(val_id, default_series) + 1) {
                        $select2.find('a[data-valueid="' + val_id + '"]').parent().addClass('selected').siblings().removeClass('selected');
                    } else {
                        $oA.attr('data-placeholder', '');
                        var oAfter = $select2.find('.select-all');
                        var oPlaceHold = $select2.find('a[data-placeholder]');
                        if (oPlaceHold.length) {
                            oPlaceHold.parent().remove();
                        }
                        $dd.clone().addClass('selected').insertAfter(oAfter).siblings().removeClass('selected');
                    }
                } else {
                    $select2.find('a[data-placeholder]').parent().remove();
                    $select2.find('.select-all').addClass('selected').siblings().removeClass('selected');
                }
                break;
            case 'p':
                if (val_id) {
                    $dd.addClass('selected').siblings().removeClass('selected');
                } else {
                    $select3.find('.select-all').addClass('selected').siblings().removeClass('selected');
                }
                break;
            case 'r':
            case 'k':
            case 'j':
            case 'c':
            case 'g':
            case 'q':
                if (val_id) {
                    $dd.addClass('selected').siblings().removeClass('selected');
                    var txt = $dd.find('a').text();
                    if(type == 'k'){
                        if(txt.length>5){
                            txt = $dd.find('a').text().substring(0,5)+'...'
                        }
                    }
                    $dd.parent().prev().text(txt).addClass('selected');
                } else {
                    $dd.parent().prev().removeClass('selected').text(arr_relation[type]);
                }
                $dd.parent().hide();
                break;
        }
        addToResult($dd);
    }

    // 切换品牌显示车系
    function showCarSeries(brandid, cb) {
        //点击品牌时加载车系 并清除当前选择的车系
        $.post('/apis/apis_ajax/get_serials/', { mid: brandid }, function(data) {
            $search_serial.html(data);
            //取8个车系用来展示
            default_series.length = 0;
            var series_obj = $(data).find("a");
            var series_html = '<dt>车系:</dt><dd class="select-all selected"><a href="javascript:;" data-for="hidden_s" data-valueid="0" class="search_search_click ">不限</a></dd>';
            if (series_obj.length) {
                $.each(series_obj, function(sk, sitem) {
                    if (sk > 9) {
                        return false;
                    }
                    default_series.push($(sitem).data('valueid'));
                    series_html += '<dd>' + $(sitem).prop("outerHTML") + '</dd>';
                })
                series_obj.length > 9 ? $('.TipBtn_hidden_s').show() : $('.TipBtn_hidden_s').hide();
            }
            // else {
            //     series_html += '<dd><a href="javascript:;" data-for="hidden_s" data-valueid="0" class="search_search_click " title="全部品牌3系二手车">默认车系</a></dd>';
            // }
            $select2.html(series_html);
            cb && cb();
        });
    }
});
/**
 * 表单提交主方法
 * @param  {[type]} price 是否自定义价格
 * @param  {[type]} obj   点击的表单对象
 * @return {[type]}       [description]
 */
function xin_search_page_sub(obj, price) {
    $("#other-price-error").hide();
    //清除搜索框内容
    $("#search_search").val("").css("color", "#333");
    var search = '';
    var obj_name = $(obj).attr('name');
    var order_name = $(obj).text();
    if (obj_name == 'view_v') {
        $("#hidden_v").val($(obj).data('v'));
    } else if (obj_name == 'view_o') {
        //切换列表和九宫格显示方式
        $("#hidden_o").val($(obj).data('o'));
        //新增诸葛打点：C-列表页-切换样式
        zhuge_track('C-列表页-切换样式');
    } else if (obj_name == 'view_a') {
        var sort = 10;
        //点击排序时 设置排序值和箭头样式
        if (order_name != '最新上架') {
            if ($(obj).hasClass('active')) {
                sort = $(obj).hasClass('up') ? $(obj).data('down') : $(obj).data('up');
            } else {
                sort = $(obj).hasClass('up') ? $(obj).data('up') : $(obj).data('down');
            }
        } else {
            sort = $(obj).data('down');
        }

        $("#hidden_a").val(sort);
    } else if (obj_name == 'v') {
        //点击车源条件时 设置车源条件选中元素
        if ($(obj).prop('checked')) {
            $(":checkbox[name='v']").prop('checked', false).next().removeClass('source-active');
            $(obj).prop('checked', true).next().addClass("source-active");
        } else {
            $(":checkbox[name='v']").prop('checked', false).next().removeClass('source-active');
            $(":checkbox[name='v']").eq(0).prop('checked', true).next().addClass("source-active");
        }
    }
    //不是翻页和切换显示方式时 页码重置为1
    if (obj_name != 'view_o' && obj_name != 'view_i') {
        $("#hidden_i").val(1);
    }
    var form = $("#searchForm").serializeArray();
    var condition = {};
    $.each(form, function(i, item) {
        //跳过自定义价格
        if (item.name == 'price_s' || item.name == 'price_e') {
            return;
        }
        if (!item.value || item.value == "0" || item.value == '') {
            switch (item.name) {
                case 'r':
                    $('input[name="r"]').attr('value', '');
                    break;
                case 'k':
                    $('input[name="k"]').attr('value', '');
                    break;
                case 'l':
                    $('input[name="l"]').attr('value', '');
                    break;
                case '1':
                    $('input[name="g"]').attr('value', '');
                    break;
                case 'f':
                    $('input[name="f"]').attr('value', '');
                    break;
                default:
                    return;
            }
        }
        //合法条件 放入condition，同时过滤重复的条件
        condition[item.name] = item.value;
    });
    $.each(condition, function(i, n) {
        //跳过值为0的表单项
        if (n == '' || n == '0') {
            return;
        }
        search += i + n;
    });

    var url = location.pathname;
    //在url中寻找 z数字的组合  如果有，则加入到search中  用于处理汽车年款的参数
    var z_num = url.match(/\/(h|s)\/[\w.\-]z(\d+)/i);
    if (z_num !== null) {
        search += 'z' + z_num[1];
        search = search ? search + '/' : '';
    }
    var query = '';
    var pathname = location.pathname;
    if (pathname.match(/\/h(\/[\w\.-]*)?(\/)?(\?.*)?$/i)) {
        query = '/h/' + search;
    } else if (pathname.match(/\/s(\/[\w\.-]*)?(\/)?(\?.*)?$/i)) {
        query = '/s/' + search;
    }

    var url = '/' + TOP_INFO.location.ename + query;
    //channel合作渠道链接处理
    if (location.search.indexOf('channel=') !== -1) {
        if (url.indexOf('channel=') === -1) {
            url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'channel=' + (location.search.replace(/.*?channel=([^\s&]+).*/, "$1"));
        }
    }
    if (obj_name != 'view_i' && $.support.pjax) {
        //切换城市时附带当前的搜索条件，并删除周边城市和全国其它条件。
        query = query.replace(/y[1-2]/, '');
        $("#cityWrap p a").each(function(i, item) {
            var ename = $(this).data('ename');
            $(this).attr('href', "/" + ename + query);
        })
        $.pjax({
            timeout: 1200,
            url: url,
            cache: true,
            container: '#search_container'
        });
        return;
    }
    window.location.href = url;
}
