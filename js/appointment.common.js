//预约页面
$(function(){
	//表单验证
	$(".inputform").Validform({
		tiptype:1,
		btnSubmit:".btnSubmit",
		postonce:true,
		beforeSubmit:function(){
			console.log(11);
			if(!$('.password-check-box.accept').hasClass('on')){
				$.Showmsg('须同意《解放区上门服务条款》');
				return false;
			};
		},
		callback:function(){
	    	/*var curDate = new Date(),
	    		curTime = curDate.toLocaleString().replace('下午', '').replace('上午', '').replace(/\//g, '-').substring(0,16),
	    		selectTime = $('#appDateTime').val();
	    	if(selectTime <= curTime){
	    		$('#appDateTime').val('');
	    		$.Showmsg('预约时间须晚于当前时间');
	    		return false;
	    	}*/
		}
	});
	
	//同意上门服务条款
	$('.password-check-box.accept').click(function(){
		$(this).toggleClass('on');
	});
		
	//获取验证码，验证手机号码
	$(".checkPhoneNumBox").Validform({
		tiptype:1,
		btnSubmit:".get-code-btn",
		beforeSubmit:function(curform){
			//验证手机号码通过，不提交
			$('.get-code-btn').removeClass('on');
			settime('.get-code-btn');
			
			return false;
		}
	});

	//下一步
	$('.book-next-btn').click(function(){
		$('.shop-part01').addClass('dsn');
		$('.shop-part02').removeClass('dsn');
	});

	var currYear = (new Date()).getFullYear();	
	var opt={};
	opt.date = {preset : 'date'};
	opt.datetime = {preset : 'datetime'};
	opt.time = {preset : 'time'};
	opt.default = {
		theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式 
        mode: 'scroller', //日期选择模式
		dateFormat: 'yyyy-mm-dd',
		lang: 'zh',
		showNow: true,
		nowText: "今天",
        startYear: currYear, //开始年份
        endYear: currYear + 1 //结束年份
	};

  	var optDateTime = $.extend(opt['datetime'], opt['default']);
    $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
    
    //判断预约时间，冒泡触发外层容器
    $(document).on('click', '.dwbw.dwb-s', function(){
    	var curDate = new Date(),
    		curTime = getNowFormatDate().substring(0,16),
    		selectTime = $('#appDateTime').val();
		console.log(curTime);
    	if(selectTime <= curTime){
    		$('#appDateTime').val('');
    		$.Showmsg('预约时间须晚于当前时间');
    	}
    });
    //利用遮罩层触发确定按钮
    $(document).on('click', '.opcityBtn', function(){
		$('.dwbw.dwb-s span.dwb').click();
    });
    
    //获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS” 
    function getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		var strHours = date.getHours();
		var strMin = date.getMinutes();
		var strSec = date.getSeconds();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		if (strHours >= 0 && strHours <= 9) {
			strHours = "0" + strHours;
		}
		if (strMin >= 0 && strMin <= 9) {
			strMin = "0" + strMin;
		}
		if (strSec >= 0 && strSec <= 9) {
			strSec = "0" + strSec;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
				+ " " + strHours + seperator2 + strMin
				+ seperator2 + strSec;
		return currentdate;
	}
    
    //获取当前的日期时间 格式“yyyyMMddHHMMSSsss” 
    function getNowFormatDate01() {
		var date = new Date();
		var seperator1 = "";
		var seperator2 = "";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		var strHours = date.getHours();
		var strMin = date.getMinutes();
		var strMilliSec = date.getMilliseconds();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		if (strHours >= 0 && strHours <= 9) {
			strHours = "0" + strHours;
		}
		if (strMin >= 0 && strMin <= 9) {
			strMin = "0" + strMin;
		}
		var currentdate = date.getFullYear() + '' + month + '' + strDate
				+ strHours + strMin + date.getSeconds() + strMilliSec;
		return currentdate;
	}
	    
	//60秒倒计时，重新获取验证码
	var countdown = 60;
	function settime(obj) {
		if (countdown == 0) {
			$(obj).attr("disabled",false).val("获取验证码").addClass('on'); 
			countdown = 60;
		} else {
			$(obj).attr("disabled", true).val("重新发送(" + countdown + ")");
			countdown--;
			setTimeout(function() {
				settime(obj)
			}, 1000)
		}
	}

});