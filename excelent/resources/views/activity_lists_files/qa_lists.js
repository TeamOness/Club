var qalistObj;
function initQalistPage() {
    qalistObj = new $.QalistObj();
    qalistObj.init();
}
/**
 * 优学堂搜索列表管理类
 * @param {type} $
 * @returns {undefined}
 */
(function ($) {
    $.QalistObj = function () {
        this.settings = $.extend(true, {}, $.QalistObj.defaults, $.QalistObj.finalconst);
    };
    $.extend($.QalistObj, {
        defaults: {
            QA_SEARCH_INPUT: "#qa_search_input", //优学堂问题搜索框
            QA_SEARCH_BTN: ".qa-s-btn", //优学堂问题搜索按钮
        },
        finalconst: {//常量
            QA_MARK_INIT: "__init_hot__", //问题搜索框初始标志
        },
        prototype: {
            init: function () {
                this.bindEvents();
                this.bindKeyBoardEvents();
            },
            /*初始化事件绑定*/
            bindEvents: function () {
                var _this = this;
                $(_this.settings.QA_SEARCH_INPUT).on({
                    focus: function () {
                        if ($(this).val() == $(this).data('default')) {
                            $(this).val("").css("color", "#333");
                        }
                    },
                    blur: function () {
                        if ($(this).val() == '') {
                            $(this).val($(this).data('default')).css("color", "#bfbfbf");
                        }
                    },
                });
                $(_this.settings.QA_SEARCH_INPUT).each(function (i, item) {
                    var addleft = $(this).data('addleft') || '';
                    var addtop = $(this).data('addtop') || '';
                    var addwidth = parseInt($(this).data('addwidth')) || 0;
                    var position = {my: "left" + addleft + " top" + addtop};
                    var auto = $(this).autocomplete({
                        minChars: 1,
                        minLength: 1,
                        autoFill: false,
                        autoFocus: false,
                        delay: 10,
                        position: position,
                        source: function (request, response) {
                            if (request.term == _this.settings.QA_MARK_INIT) {
                                $.post('/qa/suggest_search/', {w: request.term}, function (data) {
                                    var data = $.parseJSON(data);
                                    if (data.length > 0) {
                                        var hot_tip = {};
                                        hot_tip.id = "-1";
                                        hot_tip.label = "热门搜索";
                                        data.unshift(hot_tip);
                                    }
                                    $.each(data, function (i, item) {
                                        item.query = channel_url(item.query);
                                    });
                                    response(data);
                                });
                            } else {
                                $.post('/qa/suggest_search/', {w: request.term}, function (data) {
                                    var data = $.parseJSON(data);
                                    $.each(data, function (i, item) {
                                        item.query = channel_url(item.query);
                                    });
                                    response(data);
                                });
                            }
                        },
                        select: function (event, ui) {
                            //添加优学堂搜索历史(未添加)
                            //var jsonstr = '{"label": "' + ui.item.label + '","num": "-1","query": "' + ui.item.query + '","value": "' + ui.item.value + '"}';
                            //search_qa_log(jsonstr);
                            var url = "";
                            if ($(_this.settings.QA_SEARCH_INPUT).val() == "") {//热门搜索
                                url = '/qa/lists/' + ui.item.query.replace(/\?q=[^&]+/, '') + '?q=' + ui.item.label;
                            } else {//用户联想搜索
                                url = '/qa/detail/' + ui.item.id;
                            }

                            window.location.href = url;
                            return false;
                        },
                        create: function (event, ui) {
                            $(this).bind("click", function () {
                                if ($(this).val() == '' || $(this).val() == $(this).data('default')) {
                                    $(this).autocomplete("search", _this.settings.QA_MARK_INIT);
                                }
                            });
                        },
                        close: function (event, ui) {
                        }
                    }).data("ui-autocomplete");
                    auto._renderItem = function (ul, item) {
                        var li = $("<li>").css({"padding-left": "10px"})
                                .append($("<span>").css({"float": "left"}).text(item.label));
                        return li.appendTo(ul);
                    }
                    auto._resizeMenu = function () {
                        if ($(_this.settings.QA_SEARCH_INPUT).val() == "" && $(".ui-autocomplete").find("li").length > 0) {//第一行热门搜索不可点击
                            $(".ui-autocomplete").find("li").eq(0).removeClass("ui-menu-item").addClass("hot-tip-item").css("color", "#bfbfbf").children("span").prepend('<b class="ico search-ico"></b>');
                        }

                        var ul = this.menu.element;
                        ul.outerWidth(Math.max(
                                ul.width("").outerWidth() + 1 + addwidth,
                                this.element.outerWidth() + addwidth
                                ));
                        ul.addClass("ui-xin-suggest-result");
                    }
                });


                $(_this.settings.QA_SEARCH_BTN).on({
                    click: function () {
                        var a_for = $(this).attr('for');
                        var input = $("#" + a_for);
                        var v = input.val();
                        v = v.replace(/\s/g, "");
                    	var kw_reg = new RegExp("[!${}=<>?&']");  // 过滤特殊字符
                    	if (kw_reg.test(v)) {
                    		v = '';
                    	}
                        if (v == '' || v == input.data('default')) {
                            return false;
                        }
                        		
                        var url = '/qa/lists/?q=' + v;
                        window.location.href = url;
                        
                        return false;
                    }
                });
            },
            bindKeyBoardEvents: function () {
                var _this = this;
                $(_this.settings.QA_SEARCH_INPUT).on({
                    keydown: function (event) {
                        var event = window.event ? window.event : event;
                        if (event.keyCode == 13) {//回车键
                            var id = $(this).attr('id');
                            $("[for='" + id + "']").click();
                        }
                    }
                });
            },
        }
    });
})(jQuery);


(function () {//闭包,不影响代码
    initQalistPage();
})();

