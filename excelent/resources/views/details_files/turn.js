/*焦点图 start*/
$(function(){
	//包裹元素
	var wrapElement = function(options){
	    var o = options, html = o.wrapHtml || '', item = $(o.item) ||{}, clone = item.clone(), size = clone.size(), many = o.many || 0, appendTo = $(o.appendTo).empty() ||
	    {}, special = o.special || [], count = 0, pointer = 0, now = 0, sli, repeat = true;
	    while (repeat) {
	        now = special[pointer] === undefined ? many : special[pointer];
	        if (size - count <= many) {
	            now = size;
	            repeat = false;
	        };
	        appendTo.append(sli = item.slice(count, count += now));
	        sli.wrapAll(html);
	        pointer++;
	    };
	};
	var ad = function(num,wrapname,idname,popwid){
		var many = num, bigname=wrapname,name = idname, popwidth = popwid; // 显示小照片的个数
		wrapElement({
			wrapHtml: '<div class="wrap"></div>',
			item: '#'+ name +' .list',
			many: many,
			appendTo: '#'+ name
		})

		var ct       = 0,
			cf       = 0,
			$rbpageL = $('#'+ bigname+' .prev') ,
			$rbpageR = $('#'+ bigname+' .next'),
			$fp 	 = $('#'+ name),
			lis      = $('#'+ name).closest('.list'),
			lis_len  = lis.size(),
			$btnWrap = $('#'+ bigname+' .pageBtn ol'),
			items    = $('#'+ name +' .wrap'),
			itemsLen = items.size();


		var html = []
		for(var i = 0; i < itemsLen; i++){
			html.push('<li></li>');
		}
		$btnWrap.html(html.join(''));
		if(itemsLen == 0){
			$rbpageL.hide();
			$rbpageR.hide();
		}
		var $btn = $btnWrap.find('li').eq(0).addClass('active').end();
		var btnW=($('#'+ bigname+' .pageBtn ol li').width()+8)*itemsLen+34;
		$('#'+ bigname+' .pageBtn').css("width",btnW);
		// 点击小图翻页  向左
		$rbpageL.click(function(){
			if(ct==0){
				return false;
			}else{
				$fp.stop().animate({'margin-left':-(--ct*popwidth)},400)
				$btn.removeClass('active').eq(ct).addClass('active');
			};
		});
		// 点击小图翻页  向右
		$rbpageR.click(function(){
			if(ct==itemsLen - 1){
				return false;
			}else{
				$fp.stop().animate({'margin-left':-(++ct*popwidth)},400);
				$btn.removeClass('active').eq(ct).addClass('active');
			};
		});

		// 点击圆点翻页
		$btn.each(function(index){
			var $this = $(this);
			$this.click(function(){
				$fp.stop().animate({'margin-left':-(index*popwidth)},400);
				$btn.removeClass('active');
				$this.addClass('active');
				ct = index;
			});
		});

	};
	ad(3, 'focusPageWrap','focusPages', 843);
	ad(3, 'storeCarWrap','storeCar', 843);
	ad(4, 'rOneWrap','rOne', 1100);
	ad(4, 'rTwoWrap','rTwo', 1100);

	var num  = $(".wrap .pop_list input").size()+1;
	for(var i = 1; i<num; i++){
		 $("#carCheck_"+i).next().click(function(){
    		if(!$(this).hasClass('ui-state-active')){
			  $(this).addClass("ui-state-active");
			}else{
			  $(this).removeClass("ui-state-active");
			}
		 });
	 }
});
/*焦点图  end*/