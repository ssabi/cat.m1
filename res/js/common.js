var regex = /[^0-9]/g;
$(document).ready(function(){
	//Selectbox Placeholder
	var $select = $("select");
	var attrVal = "default";
	var selectClassName = "placeholder";
	$select.each(function(){
		$(this).bind({
			"change" : function(){
				//console.log($(this).children("option:selected").attr(attrVal));

				if($(this).children("option:selected").attr(attrVal)){
					$(this).addClass(selectClassName);
				}else{
					$(this).removeClass(selectClassName);
				}
			}
		});
	});

	//Back (상단 이전 버튼)
	var $btn = $(".back");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("Back key!");
		}
	});

	//Key Validate is Numeric
	$(".type_number").bind({
		"keyup" : function(){
			var $val = $(this).val();

			if($val.length == 15){
				$(this).siblings(".btn").attr("disabled", false);
			}else{
				$(this).siblings(".btn").attr("disabled", true);
			}

			return $(this).val($val.replace(regex, ''));
		}
	});
	//Key validator
	$(".k_validator").each(function(){
		$(this).bind({
			"keyup" : function(e){
				var $val = $(this).val();
				var newVal = $val.replace(regex, '');

				return $(this).val(newVal);
			}
		});
	});
	$(".masking").each(function(){
		$(this).bind({
			"focusin" : function(){
				$(this).next(".tempbox .temp").focus();
				
			}
		});
	});
	$(".temp").each(function(){
		$(this).bind({
			"focusin" : function(){
				var value = $(this).val();
				var $preEle = $(this).parent().prev(".masking");
				$preEle.val(value);
				console.log("focusin ="+value);
			},
			"keyup" : function(){
				var value = $(this).val();
				var $preEle = $(this).parent().prev(".masking");
				$preEle.val(value);
				console.log("keyup ="+value);
				console.log("$preEle ="+$preEle.val());
			}
		});
	});

	//Accordian
	accordian();
	/*
	var item = ".item";
	var itemTit = ".item_tit";
	var itemCon = ".item_con";
	var aClassName = "active";
	$(itemTit).unbind("click").bind({
		"click" : function(e){
			if(e.target !== this) return;

			$(this).closest(item).addClass(aClassName);

			var $dropdown = $(this).next(itemCon);
			$dropdown.slideToggle(200, function(){
				if($(this).is(":hidden")){
					$(this).closest(item).removeClass(aClassName).removeClass('show');
				}else{
					$(this).closest(item).addClass(aClassName);
				}
			});
		}
	});
	*/

	//이용약관
	//20180321 수정
	//여기서부터
	var $termsbox = $(".termsbox");
	var $chkAll = $("[data-chk-all]");
	var chkList = "[data-chk-list]";
	var $termsChk = $(".termsbox input").not("[data-chk-all]");
	$chkAll.bind({
		"click" : function(){
			var checked = $(this).prop("checked");
			if(checked){
				$termsbox.find("input").prop("checked", true);
				//$chkList.prop("checked", true);

				accord(1);
			}else{
				$termsbox.find("input").prop("checked", false);
				//$chkList.prop("checked", false);
			}
		}
	});

	var termChkLen = $(chkList).length;
	//$(chkList).bind({
	$termsChk.bind({
		"click" : function(){
			var chkLen = $(chkList+":checked").length;
			//console.log(chkLen);

			if(termChkLen == chkLen){
				$chkAll.prop("checked", true);

				accord(1);
			}else{
				$chkAll.prop("checked", false);
			}
		}
	});
	//20180321 여기까지

	//납부방법
	var $chk = $("#pay_method");
	var $chk_input = $("#pay_method input");
	var $cardBox = $("#card_area");
	var $bankBox = $("#bank_area");
	var $giroBox = $("#giro_area");
	var $payCon = $(".pay_con");
	var showClass = "show";
	$chk_input.bind({
		"click" : function(){
			//console.log($(this).data('type'))
			$payCon.removeClass(showClass);
			var data = $(this).data('type');
			if(data == 'card'){
				/*
				$cardBox.show();
				$bankBox.hide();
				$giroBox.hide();
				*/
				$cardBox.addClass(showClass);
			}else if(data == 'bank'){
				/*
				$cardBox.hide();
				$bankBox.show();
				$giroBox.hide();
				*/
				$bankBox.addClass(showClass);
			}else if(data == 'giro'){
				/*
				$cardBox.hide();
				$bankBox.hide();
				$giroBox.show();
				*/
				$giroBox.addClass(showClass);
			}
		}
	});

	//청구서유형
	var $select = $("[data-invoice-type]");
	var $emailbox = $(".emailbox");
	$select.bind({
		"change" : function(){
			var val = $(this).children("option:selected").val();
			//console.log(val);
			$emailbox.hide();
			$emailbox.find("input").val("");
			if(val == "email"){
				$emailbox.show();
			}
		}
	});

	//20180307 수정
	//신청내역 조회
	var $listbox = $(".list_wrap");
	var $list = $(".list_wrap .item");
	var className = "active";
	var $actionBtn = $("#act_btn");
	$list.bind({
		"click" : function(e){
			e.preventDefault();

			var $this = $(this);
			var $chk = $(this).find("input[type=radio]");
			var checked = $chk.is(":checked");
			//console.log(checked);

			$list.find("input[type=radio]").prop("checked", false);

			if(!checked){
				$listbox.removeClass("active").addClass("active");

				$chk.prop("checked", true);
				$list.removeClass(className);
				$(this).addClass(className);

				$list.siblings().not($(this)).find(".ext_info").slideUp(200);
				$(this).find(".ext_info").slideDown(200);
				$actionBtn.slideDown(200);
			}else{
				$listbox.removeClass("active");

				$list.find("input[type=radio]").prop("checked", false);
				$list.removeClass(className);

				//$list.siblings().find(".ext_info").slideUp(200);
				$list.find(".ext_info").slideUp(200);
				$actionBtn.slideUp(200);
			}
		}
	});
	/*
	$(document).on('mousedown touchstart focusin', function(e){
		if($(e.target).closest(".list_wrap .item").length === 0){
			$listbox.removeClass("active");

			$list.find("input[type=radio]").prop("checked", false);
			$list.removeClass(className);

			//$list.siblings().find(".ext_info").slideUp(200);
			$list.find(".ext_info").slideUp(200);
			$actionBtn.slideUp(200);
		}
	});
	*/

	/////////////////////////////////////////////////////////////////////////////
	// 레이어 팝업

	//이용약관
	var $btn = $("#btn_terms");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("이용약관!!");
		}
	});

	//FAQ
	var $btn = $("#btn_faq");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("FAQ!!");
		}
	});

	//본인인증
	var $btn = $(".btn_cert");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("본인인증!!");
			modal({id:'pop_certification', pageUrl:'./pop_certification.html'});
		}
	});

	//결제카드정보
	var $btn = $("#btn_card_alarm");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("결제카드정보!!");
			modal({id:'pop_card', pageUrl:'./pop_card_alarm.html'});
		}
	});

	//주소검색
	/*
	var $btn = $("#btn_addr");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("주소검색!!");
			modal({id:'pop_addr', pageUrl:'./pop_addr.html'});
		}
	});
	*/

	//약관동의
	//20180321 작업
	//여기서부터
	var $btn = $(".terms01");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("Terms01!!");
			modal({id:'pop_tInfoUse', pageUrl:'./pop_tInfoUse.html'});
		}
	});
	var $btn = $(".terms02");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("Terms02!!");
			modal({id:'pop_tInfoProvide', pageUrl:'./pop_tInfoProvide.html'});
		}
	});
	var $btn = $(".terms03");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("Terms03!!");
			modal({id:'pop_tInfoConsignment', pageUrl:'./pop_tInfoConsignment.html'});
		}
	});
	var $btn = $(".terms04");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("Terms04!!");
			modal({id:'pop_tService', pageUrl:'./pop_tService.html'});
		}
	});
	var $btn = $(".terms05");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("Terms05!!");
			modal({id:'pop_tInfoConvenience', pageUrl:'./pop_tInfoConvenience.html'});
		}
	});
	var $btn = $(".terms06");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("Terms05!!");
			modal({id:'pop_tAdvertisement', pageUrl:'./pop_tAdvertisement.html'});
		}
	});
	var $btn = $(".terms07");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("Terms05!!");
			modal({id:'pop_tRelated', pageUrl:'./pop_tRelated.html'});
		}
	});
	/*
	20180405 작업
	약관동의 - LPWA 이용약관 추가
	*/
	var $btn = $(".terms08");
	$btn.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("Terms05!!");
			modal({id:'pop_lpwaTerms', pageUrl:'./pop_lpwaTerms.html'});
		}
	});

	//IMEI 란?
	var $btn_imei = $("#btn_info_imei");
	var $imei_box = $(".guide_imei");
	var $btn_imei_close = $(".guide_close");
	$btn_imei.bind({
		"click" : function(e){
			e.preventDefault();

			//console.log("IMEI!!");

			$imei_box.toggle();
		}
	});
	$btn_imei_close.bind({
		"click" : function(e){
			e.preventDefault();

			$imei_box.hide();
		}
	});
	//20180321 여기까지
});

//Accordian
var accordian = function(){
	var item = ".item";
	var itemTit = ".item_tit";
	var itemCon = ".item_con";
	var aClassName = "active";
	$(itemTit).unbind("click").bind({
		"click" : function(e){
			if(e.target !== this) return;

			$(this).closest(item).addClass(aClassName);

			var $dropdown = $(this).next(itemCon);
			$dropdown.slideToggle(200, function(){
				if($(this).is(":hidden")){
					$(this).closest(item).removeClass(aClassName).removeClass('show');
				}else{
					$(this).closest(item).addClass(aClassName);
				}
			});
		}
	});
};

//Accordian Add-ons
var accord = function(num){
	//Accordian
	var item = ".item";
	var itemTit = ".item_tit";
	var itemCon = ".item_con";
	var aClassName = "active";

	$(itemTit).eq(0).trigger('click');
	$(itemTit).eq(num).closest(item).addClass(aClassName);
	$(itemTit).eq(num).next(itemCon).slideDown(200)
};

//Layer Popup
var modal = function(option){
	var opt = $.extend({
		id : null,
		pageUrl : null,
		customClass : "",
		callback : function(rst){
			console.log('This was logged in the callback: ' + rst);
		}
	}, option);

	var modal_bg = "<div class='modal_bg' data-model='"+opt.id+"' id='"+opt.id+"'><div class='dim'></div></div>";
	var modal_wrap = "<div class='modal_wrap'></div>";
	var modal_inner = "<div class='modal_inner'></div>";
	var $body = $("body");
	var $cont = $("<div class='load_content'></div>");

	//$cont.load(opt.pageUrl+" #modal");

	$.ajax({
		url : opt.pageUrl,
		success : function(data){
			$cont.append(data);
			//console.log(data);
		},
		error : function(xhr,status,error){
			console.log("error : " + xhr.responseText + "_" + error);
		}
	});

	var modalInner = $(modal_bg).append($(modal_wrap).append($(modal_inner).append($cont)));

	$body.append(modalInner);
	modalInner.fadeIn(200);
	$body.addClass("ovf");

	//Close
	$("body").on("click", ".modal_close", function(e){
		e.preventDefault();

		$(this).closest(".modal_bg").fadeOut(150, function(){
			$('body').removeClass("ovf");
			$(this).remove();
		});
	});

	$(".modal_bg .dim").bind({
		"click" : function(){
			$(this).closest(".modal_bg").fadeOut(150, function(){
				$('body').removeClass("ovf");
				$(this).remove();
			});
		}
	});
	/*
	$(document).on('mousedown touchstart focusin', function(e){
		if($(e.target).closest(".modal").length === 0){

			$(".modal_bg").fadeOut(150, function(){
				$('body').removeClass("ovf");
				$(this).remove();
			});
		}
	});
	*/
};

//Message Popup
var alertMsg = function(option){
	var opt = $.extend({
		id : null,
		msg : "Message!",
		buttonLabel : "OK",
		callback : function(){}
	}, option);

	var modal_bg = "<div class='modal_bg alert_msg' data-model='"+opt.id+"' id='"+opt.id+"'></div>";
	var modal_wrap = "<div class='dialog_wrap'></div>";
	var modal_inner = "<div class='dialog_inner'></div>";
	var $body = $("body");
	var $btn = $("<div class='btnbox'><button type='button' data-modal-confirm class='btn'>"+opt.buttonLabel+"</button></div>");
	var $msg = opt.msg;
	var $content = $('<div class="modal_content"><div class="txtbox"><div>'+$msg+'</div></div></div>');

	var modalInner = $(modal_bg).append($(modal_wrap).append($(modal_inner).append($content.append($btn))));
	$body.append(modalInner);
	modalInner.fadeIn(200, function(){
		//20180322 수정
		//메시지 모달 띄우고 버튼에 포커스 이동
		$(this).find(".btn").focus();
	});
	$body.addClass("ovf");

	//Callback
	$("[data-modal-confirm]").on({
		"click" : function(e){
			e.preventDefault();

			if(typeof opt.callback == "function"){
				opt.callback.call();
			}

			//close
			$(this).closest(".modal_bg").fadeOut(150, function(){
				$('body').removeClass("ovf");
				$(this).remove();
			});
		}
	});
};

//Dim
var dim = {
	show : function(){
		var body = $("body");
		var $ele = $("<div />", {class : 'dim'});
		
		if(body.find(".dim").length > 0){
			return false;
		}

		body.append($ele);
		$ele.fadeIn(200);

		//Dim Hide Test
		/*
		$ele.fadeIn(200, function(){
			$(this).bind({"click" : function(){ dim.hide(); }})
		});
		*/
	},
	hide : function(){
		var $ele = $(".dim");
		$ele.fadeOut(200, function(){
			$(this).remove();
		});
	}
};