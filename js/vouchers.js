
//弹出消费券
$(function(){
	var $prizeBox = $('.prize-box');
	var $checkPayBox = $('.check-pay-box');
	var $doc = $(document);
	$('.prize-list').click(function(){
		$checkPayBox.hide();
		$prizeBox.fadeIn(100);
		$doc.scrollTop('0px');
	});
	$('#prizeCancel, #prizeCheck').click(function(){
		$prizeBox.hide();
		$checkPayBox.show();
	});
	
});

//选择反选消费券
$(function(){
	var $prizeListBox = $('.prizeListBox');
	var $allCheckBox = $('#allCheckBox');
	$allCheckBox.click(function(event){
		event.stopPropagation();
		$(this).toggleClass('item-checked');
		$prizeListBox.each(function() {
            $('input[name=checkbox]', this).each(function () {
				if( $(this).hasClass('toggleCheck') ){
					$(this).prop('checked', true).removeClass('toggleCheck').siblings('label').addClass('item-checked');	
				}else if( $(this).is(":checked") ){
					$(this).addClass('toggleCheck').prop('checked', false).siblings('label').removeClass('item-checked');	
				}
			});
        });
		prizeCount();
	});
	
	//按确定按钮
	$('#prizeCheck').click(function(){
		$prizeListBox.each(function() {
			$('input[name=checkbox]', this).each(function () {
				if ( $('input[name=checkbox]:checked').length ){
					$allCheckBox.addClass('item-checked');	
					$(this).removeClass('toggleCheck');
				}
			});
		});
		var priceTotal = $('.prize-total').text();
		$('.actuallyPaidPrice').text((orderAmountPrice - priceTotal).toFixed(2));
		$('.discountPrice').text(priceTotal);
	});
});

//选择消费券
$(function(){
	$('.prizeListBox').click(function(){
		var $cBox = $(this).find('.item-check-box');
		$cBox.toggleClass('item-checked');
		if($cBox.hasClass('item-checked')){
			$cBox.siblings('input').prop('checked', true);	
		}else{
			$cBox.siblings('input').prop('checked', false);	
		}
		prizeCount();
	});	
});
//消费券叠加计算
var orderAmountPrice = $('.orderAmountPrice').eq(0).text();

function prizeCount() {
	var $prizeListBox = $('.prizeListBox');
	var conts = 0;
	$prizeListBox.each(function() {
		$('input[name=checkbox]', this).each(function () {
			if ($(this).is(":checked")) {
				conts += $(this).val()*1; //乘1将值转换
			}
		});
	});
	
	var discountPaid = (orderAmountPrice*0.4).toFixed(2);
	console.log(orderAmountPrice,discountPaid);
	if(conts > discountPaid){
		alert('土豪，您的消费券用多了！');
		conts = discountPaid;
	}
	$('.prize-total').text(conts);
}
$(function(){
	prizeCount();
});



//重置消费券高度
$(function(){
	
	//重置高度插件
	$.fn.resetBoxHeight = function(oldWidth, oldHeight){
		var thisWidth = $(this).width();
		var thisHeight = thisWidth*oldHeight/oldWidth;
		$(this).css({'height':thisHeight + 'px'});
	}
	
	$('.jfq-quan').resetBoxHeight('640', '347');
	
	$(window).resize(function(){
		$('.jfq-quan').resetBoxHeight('640', '347');
	});
	
	
});