//店铺端
$(function(){
	//修改密码
	$('.password-check-wrap').click(function(){
		var $passwordCheckBox = $(this).find('.password-check-box');
		$passwordCheckBox.toggleClass('on');
		if($('.show-password').hasClass('on')){
			$('.password-box').attr('type','text');			
		}else{
			$('.password-box').attr('type','password');		
		}
	});
	
	$('.change-password-btn').click(function(){
		$('.welcome-img').fadeOut();
	});
	
	//重置tab内容高度
	$('.item-list-arrow-box').click(function(){
		$(this).prev('.item-list-box').stop(true, false).animate({'height':'toggle'}, 200);
		$(this).children().swapAddClass('rotateIn', 'rotateOut');
		setTimeout(function(){
			tabBoxTuneHeight();
		},201);
	});
	
	function tabBoxTuneHeight(){
		var conHeight = $('#tabBox-bd').height() + 55;
		$('.tempWrap').css('height',conHeight);
	};
	
	//样式切换函数
	$.fn.swapAddClass = function(class1, class2){
		return this.each(function(){
			var $elem = $(this);
			if($elem.hasClass(class1)){
				$elem.removeClass(class1).addClass(class2);
			}else if($elem.hasClass(class2)){
				$elem.removeClass(class2).addClass(class1);
			}else{
				$elem.addClass(class1);
			}
		});
	};
	
	//tab切换样式
	var $orderTab = $(".order-tab li");
	$orderTab.click(function(){
		if($(this).hasClass('on')){
			$(this).find('label').addClass('on');
			$(this).siblings().find('label').removeClass('on');
		}
	});	
	setInterval(function(){
		$orderTab.each(function(){
			if($(this).hasClass('on')){
				$(this).find('label').addClass('on');
				$(this).siblings().find('label').removeClass('on');
			}
		});	
	},100);

	
	//商品管理-切换类别、排序
	$('.sort-name').click(function(){
		var $sortSelect = $(this).next('.sort-select');
		var $sortSiblingsSelect = $('.sort-select').not($sortSelect);
		$sortSiblingsSelect.each(function() {
            if($(this).is(':visible')){
				$(this).hide();
				$(this).siblings('.sort-name').find('img').swapAddClass('rotateIn', 'rotateOut');
			}
        });
		
		$sortSelect.toggle();
		if($sortSelect.is(':visible')){
			$('body').addClass('overhidden');
		}else{
			$('body').removeClass('overhidden');
		}
		$(this).find('img').swapAddClass('rotateIn', 'rotateOut');
	});
	$('.sort-select li').click(function(){
		var thisNameText = $(this).text();		
		$(this).addClass('on').siblings('li').removeClass();
		$(this).parents('.sort-select').hide();
		$(this).parents('.sort-select').siblings('.sort-name').find('img').swapAddClass('rotateIn', 'rotateOut');
		$(this).parents('.sort-select').siblings('.sort-name').find('.sort-name-text').text(thisNameText);
		$('body').removeClass('overhidden');
	});

	//设置预览图片为原始尺寸
	$('.my-gallery figure').each(function(){
		var $this = $(this);
		var $swiperImg = $(this).find('img');
		var thisSrc = $swiperImg.attr('src');
		getImageWidth(thisSrc,function(swiperImgWidth,swiperImgHeight){
			$this.find('a').attr('data-size', swiperImgWidth + 'x' + swiperImgHeight);
		});
		
	});

	//获取原始图片尺寸
	function getImageWidth(url,callback){
		var img = new Image();
		img.src = url;
		
		// 如果图片被缓存，则直接返回缓存数据
		if(img.complete){
			callback(img.width, img.height);
		}else{
			// 完全加载完毕的事件
			img.onload = function(){
				callback(img.width, img.height);
			}
		}
	}
	
	//setMasterStars('#starBgRed', '86%');
		
	//设置星级
	$('.star-box').each(function(){
		var $thisStar = $(this).find('.star-bgred');
		var thisWidth = $thisStar.data('width');
		
		setMasterStars($thisStar, thisWidth);
		
	});
	
});

//星级评价
function setMasterStars(obj, widthPercent){
	$(obj).animate({'width':widthPercent}, 1200);
}