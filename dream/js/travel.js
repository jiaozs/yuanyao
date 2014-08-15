function update(){
	$("#formid").attr("action","/blog/update");
	$("#formid").submit();
}
//选择器
function $a(id,tag){var re=(id&&typeof id!="string")?id:document.getElementById(id);if(!tag){return re;}else{return re.getElementsByTagName(tag);}}

//焦点滚动图 点击移动
function movec()
{
	var o=$a("bd1lfimg","");
	var oli=$a("bd1lfimg","dl");
	var oliw=oli[0].offsetWidth; //每次移动的宽度	 
	var ow=o.offsetWidth-2;
	var dnow=0; //当前位置	
	var olf=oliw-(ow-oliw+10)/2;
		o["scrollLeft"]=olf+(dnow*oliw);
	var rqbd=$a("bd1lfsj","ul")[0];
	var extime;

	<!--for(var i=1;i<oli.length;i++){rqbd.innerHTML+="<li>"+i+"</li>";}-->
	var rq=$a("bd1lfsj","li");
	for(var i=0;i<rq.length;i++){reg(i);};
	oli[dnow].className=rq[dnow].className="show";
	var wwww=setInterval(uu,2000);

	function reg(i){rq[i].onclick=function(){oli[dnow].className=rq[dnow].className="";dnow=i;oli[dnow].className=rq[dnow].className="show";mv();}}
	function mv(){clearInterval(extime);clearInterval(wwww);extime=setInterval(bc,15);wwww=setInterval(uu,8000);}
	function bc()
	{
		var ns=((dnow*oliw+olf)-o["scrollLeft"]);
		var v=ns>0?Math.ceil(ns/10):Math.floor(ns/10);
		o["scrollLeft"]+=v;if(v==0){clearInterval(extime);oli[dnow].className=rq[dnow].className="show";v=null;}
	}
	function uu()
	{
		if(dnow<oli.length-2)
		{
			oli[dnow].className=rq[dnow].className="";
			dnow++;
			oli[dnow].className=rq[dnow].className="show";
		}
		else{oli[dnow].className=rq[dnow].className="";dnow=0;oli[dnow].className=rq[dnow].className="show";}
		mv();
	}
	o.onmouseover=function(){clearInterval(extime);clearInterval(wwww);}
	o.onmouseout=function(){extime=setInterval(bc,15);wwww=setInterval(uu,8000);}
}
//图片放大、旋转-start
function showBigImage(img){
	var cop = '<div class="pack" style="margin:5px 0;overflow:hidden;">'
			+ '<a href="javascript:void(0);" class="imgCloseShow" onclick="clickLgImgBack(this)"><em></em>收起</a>'
			+ '<span class="line pull-left"></span>'
			+ '<a href="javascript:void(0);" class="imgTurnL" onclick="imgTurn(this,-1)"><em></em>向左转</a>'
			+ '<span class="line pull-left"></span>'
			+ '<a href="javascript:void(0);" class="imgTurnR" onclick="imgTurn(this,1)"><em></em>向右转</a>'
			+ '</div>',
		bigImg = $(img).attr("src").replace("-min",""),
		bigW = parseInt($(img).attr("bigW")),
		bigH = parseInt($(img).attr("bigH")),
		showW = bigW<550?bigW:550,
		showH = showW*bigH/bigW,
		imgDiv = '<div class="imgShowDiv"><img src="' + bigImg + '" bigW="' + bigW + '" bigH="' + bigH + '" showW="' + showW + '" showH="' + showH + '" rot="0" style="width:' + showW + 'px" onclick="lgImgBack(this)"></div>',
		showDiv = '<div class="lgImgShow">' + cop + imgDiv + '</div>';
	$(img).parent().parent().hide().after(showDiv);
	$(img).parent().parent().parent().find(".lgImgShow").find("img").css("margin","0 auto");
}
function lgImgBack(img){
	$(img).parent().parent().parent().find(".smImgShow").show();
	$(img).parent().parent().remove();
}
function clickLgImgBack(d){
	var img = $(d).parent().parent().find(".imgShowDiv img");
	lgImgBack(img);
}
function imgTurn(a,p){
	var turnStyle,
		img = $(a).parent().parent().find(".imgShowDiv img"),
		bigW = parseInt(img.attr("bigW")),
		bigH = parseInt(img.attr("bigH")),
		showW = parseInt(img.attr("showW")),
		showH = parseInt(img.attr("showH")),
		divW = 550,
		w_w = divW/bigW<1?divW/bigW:1,
		h_w = divW/bigH<1?divW/bigH:1,
		rot = parseInt(img.attr("rot")),
		n_rot = rot + 90*p,
		jo = n_rot%180==0?0:1,
		rate = jo==0?w_w:h_w,
		relW = bigW*rate,
		relH = bigH*rate,
		top = 0,
		left = 0;
	img.css("margin","0");
	if(jo==0){
		top = (relH - bigH)/2;
		left = bigW<divW?(divW - relW)/2:(relW - bigW)/2;
		img.parent().height(relH);
	}else{
		if(bigH>bigW){
			top = (relW - bigH)/2;
			left = (relH - bigW)/2;
		}else{
			/* top = (bigW - relH)/2;
			left = (bigH - relW)/2; */
			top = (relW - bigH)/2;
			left = (relH - bigW)/2;
			left += (divW - relH)/2;
		}
		img.parent().height(relW);
	}
		
	img.width("auto");
	if(navigator.userAgent.indexOf("MSIE")<0){
		var attrName = navigator.userAgent.indexOf("Chrome")>0?"-webkit-transform":"-moz-transform";
		turnStyle = "translate(" + left + "px, " + top + "px) rotate(" + n_rot + "deg) scale(" + rate + ", " + rate + ")";
		img.attr("rot",n_rot).css(attrName,turnStyle);
	}else{
		var n = n_rot/90,
			p_left = 0,
			parentH = bigH>bigW?relH:relW;
		n = n%4;
		if(jo==1){
			p_left = (divW - relH)/2 + "px";
		}else if(jo==0 && bigW<divW){
			p_left = (divW - relW)/2 + "px";
		}
		img.parent().height(parentH);
		turnStyle = "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + n + ")";
		img.attr("rot",n_rot).css("filter",turnStyle).width(relW).height(relH).css({position:"absolute",left:p_left});
	}
}
//图片放大、旋转-end


function topicAddFavorite(a) {
	var tid = $("#topicid").val(), colBtn = $(a);
	$
			.ajax({
				url : "/topic/favorite/" + tid,
				type : "post",
				success : function(data) {
					var con;
					if (data != "fail") {
						con = "已加入我的收藏！";
						colBtn
								.after(
										"<a href='javascript:void(0);' fid='"
												+ data
												+ "' class='pull-right hasCollected' onclick='topicCancelFavorite(this)'>取消收藏</a>")
								.remove();
					} else {
						con = "加入收藏失败！请重新尝试"
					}
					$.ubalert({
						content : con,
						delay : 2000
					});
				}
			});
}
function topicCancelFavorite(a) {
	var canBtn = $(a), fid = canBtn.attr("fid");
	$
			.ajax({
				type : "post",
				url : "/topic/cancelFavorite/" + fid,
				success : function(data) {
					var con;
					if (data == "success") {
						con = "已取消收藏！";
						canBtn
								.after(
										"<a href='javascript:void(0);' class='pull-right addToCollection' onclick='topicAddFavorite(this)'>加入收藏</a>")
								.remove();
					} else {
						con = "取消收藏失败！";
					}
					$.ubalert({
						content : con,
						delay : 2000
					});
				}
			});
}
function detail(html) {
	var h = $(".replyList .con").html();
	var userid = $("#userid").val();
	var topicuid = $("#topicuid").val();
	if (userid == topicuid) {
		$(".replyList .con").append(html);
	} else {
		$(".replyList .con_0").append(html);
	}
	$("#tcontent").val("");
	$("#ucontent").html("");
}
function seeauthor(a) {
	$(".partcomment.other").hide();
	$(a).hide();
	$(a).next().show();
}
function cancelauthor(a) {
	$(".partcomment.other").show();
	$(a).hide();
	$(a).prev().show();
}
function comment() {
	editor.focus();
}
function editeActivity(id){
	$.ubdialog({
		type: "file",
		url: "/activity/edit/"+id,
		title: "编辑约伴",
		width: 800,
		height: 500
	});
}
function createActivity(){
	var size = $(".liItem").length;
	if(size == 0){
		$.ubalert({
			content : "您的旅行计划没有任何内容，不能发起约伴",
			delay : 2000
		});
	}else{
		$.ubdialog({
			type: "file",
			url: "/activity/create",
			title: "创建约伴",
			width: 800,
			height: 530
		});
	}
}
function addEventClick(){
	$.ubdialog({
		type: "file",
		width: 700,
		height: 600,
		title: "添加自定义事件",
		url: "/event/listEvent"
	});
}
function expertPath(number){
	$("#map").hide();
	$("#pageerror").html("");
	$("#pageup").attr("disabled",false);
	$("#pagedown").attr("disabled",false);
	var html = "<div class='expertPathSearch col-xs-12' style='overflow:hidden;'>"
		+"<div class='input-group input-group-sm pull-left' id='expert' style='width:330px;margin-right:5px;'>"
		+"<span class='input-group-addon' style='background:#f0f7f9;border-color: #E6E6E6;'>出发地区</span>"
		+"<select class='step1 form-control pull-left input-sm' name='province' style='width:120px;border-color: #E6E6E6;'>"
		+"<option style='color:#dbdbdb;border-color: #E6E6E6;' value=''>省份</option></select>" 
		+"<select class='step2 form-control pull-left input-sm' name='city' disabled style='width:110px;border-color: #E6E6E6;'>"
		+"<option value=''>--</option></select>" 
		+"<input type='hidden' id='expertCode' disabled></div>"
		+"<div class='input-group input-group-sm pull-left' style='width:180px;margin-right:5px;'>"
		+"<span class='input-group-addon' style='background:#f0f7f9;border-color: #E6E6E6;'>游玩天数</span>"
		+"<select id='daysForTrip' class='form-control' style='border-left:0;border-color: #E6E6E6;'>"
		+"<option>1-3天</option><option>3-7天</option><option>7天以上</option></select></div>"
		+"<button class='btn btn-sm pull-left' style='color:#fff;background:#46c2d8;'>搜索专家线路</button></div>";
	$.post("/trip/expert/"+number,
		function(data){
			$("#detail").html("");
			$("#detail").append(html);
			var resultList = data.resultList,
				num = data.number,
				size = data.size,
				begin = data.begin,
				end = data.end;
			$("#detail").attr("page",num);
			$("#detail").attr("tmpltype","expert");
			$("#detail").attr("totalpage",size);
			$("#pagenum").html(num);
			$("#expertTemplate").tmpl(resultList).appendTo("#detail");
			dropdown('expert','expertCode',0);
			$("#page").empty();
			if(size > 1){
				var page = '<div class="pagination pagination-centered"><ul class="pagination" >';
				if(num > 1){
					page += '<li><a href="javascript:void(0);" onclick="expertPath(1)">首页</a></li>';
					page += '<li><a href="javascript:void(0);" onclick="expertPath('+(num-1)+')">上一页</a></li>';
				}
				for(var i=begin;i<=end;i++){
					if(i == num){
						page += '<li class="active"><span>'+num+'</span></li>';
					}else{
						page += '<li><a href="javascript:void(0);" onclick="expertPath('+i+')">'+i+'</a></li>'
					}
				}
				if(num < size){
					page += '<li><a href="javascript:void(0);" onclick="expertPath('+(num+1)+')">下一页</a></li>';
					page += '<li><a href="javascript:void(0);" onclick="expertPath('+size+')">尾页</a></li>';
				}
				page += '</ul></div>';
				$("#page").append(page);
			}
		},"json");
}
function attraction(number){
	var html = "<div class='col-xs-12' style='margin-bottom:10px;'><div class='spotSearch'>"
		+"<div class='row'>"
		+"<div class='col-xs-3'>"
		+"<select id='region' onchange='searchAttraction(1)' class='form-control input-sm' style='color:#fff;background:#46c2d8;width:150px;'>"
		+"<option value=''>选择地区</option>"
		+"<option value='540100'>拉萨市</option><option value='542100'>昌都地区</option><option value='542200'>山南地区<option value='542300'>日喀则地区</option>"
		+"</option><option value='542400'>那曲地区</option><option value='542500'>阿里地区</option><option value='542600'>林芝地区</option>"
		+"</select></div>"
		+"<div class='col-xs-4' style='display:none;'>"
		+"<div class='input-group input-group-sm pull-right'>"
		+"<input id='key' class='form-control' placeholder='搜景点' style='border-right:0;'>"
		+"<span class='input-group-addon' style='background:#fff;'><span class='glyphicon glyphicon-search' onclick='searchAttraction()'></span></span>"
		+"</div></div></div></div></div>";
	$.post("/attraction/listAttraction/"+number,
		function(data){
			$("#detail").html("");
			$("#detail").append(html);
			var resultlist = data.resultlist,
				num = data.number,
				size = data.size,
				begin = data.begin,
				end = data.end;
			$("#detail").attr("page",num);
			$("#detail").attr("tmpltype","attraction");
			$("#detail").attr("totalpage",size);
			$("#attractionTemplate").tmpl(resultlist).appendTo("#detail");
			$("#map").show();
			createMap_e();
			$(".attractionDtlDia").click(function(){
				var thisId = $(this).parent().parent().find("input[name='index']").val(),
					url = '/attraction/diaDetail/' + thisId;
				$.ubdialog({type:"file",width:800,height:420,url:url,title:''});
			});
			$(".imgDiv a").click(function(){
				var thisId = $(this).parent().parent().find("input[name='index']").val(),
					url = '/attraction/diaDetail/' + thisId;
				$.ubdialog({type:"file",width:800,height:420,url:url,title:''});
			});
			attractionBind();
			$("#page").empty();
			if(size > 1){
				var page = '<div class="pagination pagination-centered"><ul class="pagination" >';
				if(num > 1){
					page += '<li><a href="javascript:void(0);" onclick="attraction(1)">首页</a></li>';
					page += '<li><a href="javascript:void(0);" onclick="attraction('+(num-1)+')">上一页</a></li>';
				}
				for(var i=begin;i<=end;i++){
					if(i == num){
						page += '<li class="active"><span>'+num+'</span></li>';
					}else{
						page += '<li><a href="javascript:void(0);" onclick="attraction('+i+')">'+i+'</a></li>'
					}
				}
				if(num < size){
					page += '<li><a href="javascript:void(0);" onclick="attraction('+(num+1)+')">下一页</a></li>';
					page += '<li><a href="javascript:void(0);" onclick="attraction('+size+')">尾页</a></li>';
				}
				page += '</ul></div>';
				$("#page").append(page);
			}
		},"json");
}
function searchAttraction(number){
	var region = $("#region").val();
	if(region == ""){
		attraction(1);
	}
	$("#pageerror").html("");
	$("#pageup").attr("disabled",false);
	$("#pagedown").attr("disabled",false);
	var html = "<div class='col-xs-12' style='margin-bottom:10px;'><div class='spotSearch'>"
		+"<div class='row'>"
		+"<div class='col-xs-3'>"
		+"<select id='region' onchange='searchAttraction(1)' class='form-control input-sm' style='color:#fff;background:#46c2d8;width:150px;'>"
		+"<option value=''>选择地区</option>"
		+"<option value='540100'>拉萨市</option><option value='542100'>昌都地区</option><option value='542200'>山南地区<option value='542300'>日喀则地区</option>"
		+"</option><option value='542400'>那曲地区</option><option value='542500'>阿里地区</option><option value='542600'>林芝地区</option>"
		+"</select></div>"
		+"<div class='col-xs-4' style='display:none;'>"
		+"<div class='input-group input-group-sm pull-right'>"
		+"<input id='key' class='form-control' placeholder='搜景点' style='border-right:0;'>"
		+"<span class='input-group-addon' style='background:#fff;'><span class='glyphicon glyphicon-search' onclick='searchAttraction()'></span></span>"
		+"</div></div></div></div></div>";
	$.post("/attraction/searchAttraction/"+number,{region : region},
		function(data){
			$("#detail").html("");
			$("#detail").append(html);
			$("#region").val(region);
			var resultlist = data.resultlist,
				num = data.number,
				size = data.size,
				begin = data.begin,
				end = data.end;
			$("#detail").attr("page",num);
			$("#detail").attr("tmpltype","searchattraction");
			$("#detail").attr("totalpage",size);
			$("#pagenum").html(num);
			$("#attractionTemplate").tmpl(resultlist).appendTo("#detail");
			$("#map").show();
			createMap_e();
			$(".attractionDtlDia").click(function(){
				var thisId = $(this).parent().parent().find("input[name='index']").val(),
					url = '/attraction/diaDetail/' + thisId;
				$.ubdialog({type:"file",width:800,height:420,url:url,title:''});
			});
			$(".imgDiv a").click(function(){
				var thisId = $(this).parent().parent().find("input[name='index']").val(),
					url = '/attraction/diaDetail/' + thisId;
				$.ubdialog({type:"file",width:800,height:420,url:url,title:''});
			});
			attractionBind();
			$("#page").empty();
			if(size > 1){
				var page = '<div class="pagination pagination-centered"><ul class="pagination" >';
				if(num > 1){
					page += '<li><a href="javascript:void(0);" onclick="searchAttraction(1)">首页</a></li>';
					page += '<li><a href="javascript:void(0);" onclick="searchAttraction('+(num-1)+')">上一页</a></li>';
				}
				for(var i=begin;i<=end;i++){
					if(i == num){
						page += '<li class="active"><span>'+num+'</span></li>';
					}else{
						page += '<li><a href="javascript:void(0);" onclick="searchAttraction('+i+')">'+i+'</a></li>'
					}
				}
				if(num < size){
					page += '<li><a href="javascript:void(0);" onclick="searchAttraction('+(num+1)+')">下一页</a></li>';
					page += '<li><a href="javascript:void(0);" onclick="searchAttraction('+size+')">尾页</a></li>';
				}
				page += '</ul></div>';
				$("#page").append(page);
			}
		},"json");
}
function intiTrip(){
	var tid = $("#tid").val(),
		url = "/trip/get/"+tid;
	$.ajax({
		url : url,
		type : "post",
		success : function(data){
			$("#trip").html(data);
			countPrice();
			$(".deleteDay").mydialog({
				type: "confirm",
				content: "确定要删除这天吗?所有与这天关联的信息都会被删除",
				title: "提醒",
				fun: function(){delDay(delDayIndex);}
			});
			itemDrag();
			$(".addDay").click(function(){
				var tid = $("#tid").val();
				$.ajax({
					type: "post",
					url: "/schedule/create",
					data: {
						tid: tid
					},
					success: function(data){
						var num_ = $(".daysTab").children().length,
							n = num_ + 1,
							num = "li_" + num_,
							sid = data,
							li = "<li class='tabLi active'><a class='" + num + "' href='javascript:void(0);' onclick='switchTab(this)' onmouseover='onTab(this)' onmouseout='outTab(this)'>"
								+"<span class='dayNum'>第" + n + "天</span><span class='deleteDay' onclick='delDayIndex=$(this).parent().parent().index();'></span></a><input class='sid' type='hidden' value='" + sid + "' /></li>",
							ul = "<ul id='tripUl_" + num_ + "' class='tripUl'></ul>";
						$(".tabLi").removeClass("active");
						$(".daysTab").append(li);
						$("#tripList").append(ul);
						selectTab(num);
						//createMap_e();
						itemDrag();
						$("#dayPrice .priceNum").html(0);
						var bindIndex = $(".daysTab").find(".deleteDay").length - 1;
						$(".daysTab").find(".deleteDay").eq(bindIndex).mydialog({
							type: "confirm",
							content: "确定要删除这天吗?所有关联的信息都会被删除",
							title: "提醒",
							fun: function(){delDay(delDayIndex);}
						});
					},
					error: function(){
						$.ubdialog({
							type: "text",
							title: "消息提示",
							content: "添加失败！请检查网络环境确保网络畅通！",
							align: "center"
						});
					}
				});
			});
		},
		error : function(){
			$.ubdialog({
				type: "text",
				title: "消息提示",
				content: "出错！",
				align: "center"
			});
		}
	});
}
function addamember(id){
	$.ajax({
		url : "/group/addmember/"+id,
		type : "post",
		success : function(data){
			if(data == "success"){
				location.reload();
			}
		},
		error : function(){
			$.ubdialog({
				type: "text",
				title: "消息提示",
				content: "请求失败,请联系网站管理员",
				align: "center"
			});
		}
	});
}
function deletemember(id){
	$.ajax({
		url : "/group/deletemember/"+id,
		type : "post",
		success : function(data){
			if(data == "success"){
				location.reload();
			}
		},
		error : function(){
			$.ubdialog({
				type: "text",
				title: "消息提示",
				content: "请求失败,请联系网站管理员",
				align: "center"
			});
		}
	});
}
function toTopic(id,name){
	$.ubdialog({
		type: "confirm",
		content: "加入圈子才能发起话题，您确定要加入<span style='color:red;'>"+name+"</span>吗？",
		fun: function(){
			$.ajax({
				url : "/group/addmember/"+id,
				type : "post",
				success : function(data){
					if(data == "success"){
						location.reload();
					}
				},
				error : function(){
					$.ubdialog({
						type: "text",
						title: "消息提示",
						content: "请求失败,请联系网站管理员",
						align: "center"
					});
				}
			});
		}
	});
}
var delDayIndex;
function save(){
	var tid = $("#tid").val(),
		price = $("#allPrice").find(".priceNum").html(),
		aid = $("#aid").val();
	$.ajax({
		type: "post",
		url: "/trip/save",
		data: {
			id: tid,
			budget: price
		},
		success:function(data){
			if(data != "fail"){
				if(aid == ""){
					location.href = "/trip/" + data;
				}else{
					location.href = "/activity/" + aid;
				}
			}
		}
	});
}
function deleteTrip(id){
	$.ubdialog({
		type: "confirm",
		content: "确定要删除该计划吗？",
		fun: function(){
			$.ajax({
				url : "/trip/delete",
				type : "post",
				data : {
					tid : id
				},
				success : function(data){
					var href = location.href;
					var host = location.host;
					if(data == "success"){
						if(href.indexOf("/listMine")>-1){
							location.reload();
						}else{
							location.href = "http://" + host + "/trip/listMine/1"
						}
					}else{
						$.ubdialog({
							type: "text",
							title: "消息提示",
							content: "非法请求",
							align: "center"
						});
					}
				}
			});
		}
	});
}
function countPrice(){
	var priceList = $(".tripUl.active").find(".priceNum"),
		allPriceList = $(".tripUl").find(".priceNum"),
		allPrice = 0,
		dayPrice = 0;
	for(i=0;i<priceList.length;i++){
		var priceItem = priceList.eq(i).html();
		priceItem = priceItem.replace(",","");
		dayPrice += parseInt(priceItem);
	}
	for(i=0;i<allPriceList.length;i++){
		var allPriceItem = allPriceList.eq(i).html();
		allPriceItem = allPriceItem.replace(",","");
		allPrice += parseInt(allPriceItem);
	}
	$("#dayPrice .priceNum").html(dayPrice);
	$("#allPrice .priceNum").html(allPrice);
}
function editEvent(id,title){
	$.ubdialog({
		type: "file",
		width: 700,
		height: 600,
		title: "编辑"+title,
		url: "/event/editEvent/"+id
	});
}
function editPrice(s){
	var price_show = $(s).find(".priceShow").html();
	$(s).find(".priceShow").hide();
	$(s).find(".priceEdit").show();
	$(s).find(".priceEdit").find("input").val(price_show).select();
}
function savePrice(s){
	var item = $(s).parent().parent().parent(),
		sid = $(".tabLi.active").find(".sid").val(),
		oid = item.attr("itemId"),
		type = item.attr("itemType"),
		index = item.parent().parent().index(),
		price = $(s).val(),
		reg = /^[0-9]*$/;
		if(!reg.test(price)){
			$.ubalert({
				content:"修改预算只能填写数字！"
			});
			return;
		}
	$.ajax({
		type: "post",
		url: "/schedule/update",
		data: {
			id: sid,
			oid: oid,
			type: type,
			index: index,
			price: price
		},
		success: function(data){
			if(data != "error"){
				var price = $(s).val();
				$(s).parent().hide();
				$(s).parent().parent().find(".priceShow").html(price).show();
				countPrice();
			}
		}
	});
}
function liOn(l){
	$(l).addClass("on");
}
function liOut(l){
	$(l).removeClass("on");
}
function delLi(l){
	var index = $(l).parent().parent().index(),
		id = $(".tabLi.active").find(".sid").val();
	$.ajax({
		type: "post",
		url: "/schedule/remove",
		data: {
			index: index,
			id: id
		},
		success: function(){
			$(l).parent().parent().remove();
			//createMap_e();
			countPrice();
		},
		error: function(){
			$.ubdialog({
				type: "text",
				title: "消息提示",
				content: "删除失败！请检查网络环境确保网络畅通！",
				align: "center"
			});
		}
	});
}
function remarkLi(l){
	$(l).parent().find(".remarkArea").toggle(100);
}
function remarkEdit(p){
	$(p).parent().removeClass("rShow").addClass("rEdit");
}
function remarkOk(b){
	var val = $(b).parent().find(".remarkTxt").val(),
		sid = $(".tabLi.active").find(".sid").val(),
		item = $(b).parent().parent().parent(),
		oid = item.find(".itemCon").attr("itemId"),
		type = item.find(".itemCon").attr("itemType"),
		index = item.parent().index();
	$.ajax({
		type: "post",
		url: "/schedule/update",
		data: {
			id: sid,
			oid: oid,
			type: type,
			index: index,
			remark: val
		},
		success: function(data){
			if(data != "error" && data != "toolong"){
				$(b).parent().parent().find(".remarkShow").html(val);
				$(b).parent().parent().removeClass("rEdit").addClass("rShow");
			}else if(data == "toolong"){
				$.ubalert({
					content:"备注不能超过15个字！",
					delay: 1000
				});
			}else{
				$.ubalert({
					content:"保存备注失败！",
					delay: 1000
				});
			}
		}
	});
}
function remarkCancel(b){
	$(b).parent().parent().removeClass("rEdit").addClass("rShow");
}
function switchTab(a){
	var thisIndex = $(a).parent().index(),
		thatIndex = $(".tabLi.active").index();
	$(".tabLi").removeClass("active");
	$(a).parent().addClass("active");
	var num = $(".tabLi.active a").attr("class");
	selectTab(num);
	if(thisIndex != thatIndex){
		//createMap_e();
		countPrice();
		itemDrag();
	}
}
function turnTab(n){
	var index = $(".tabLi.active").index() + n,
		num = "li_" + index;
	if(index > -1 && index < $(".tabLi").length){
		$(".tabLi").removeClass("active");
		$("." + num).parent().addClass("active");
		selectTab(num);
		//createMap_e();
		countPrice();
	}
}
function selectTab(num){
	var index = parseInt(num.substring(3,num.length)),
		liW = $(".tabLi").width(),
		srollW = (index - 1) * liW + 20;
	$(".daysTab").animate({scrollLeft:srollW+"px"},100);
	$(".tripUl").hide().removeClass("active");
	$(".tripUl").eq(index).show().addClass("active");
}
function onTab(a){
	$(".tabLi").removeClass("on");
	$(a).parent().addClass("on");
	if($(".daysTab").children().length == 1){
		$(a).parent().addClass("onlyDay");
	}
}
function outTab(a){
	$(a).parent().removeClass("on").removeClass("onlyDay");
}
function delDay(delDayIndex){
	//if(confirm("确定要删除这天吗?所有关联的信息都会被删除")){
		var li = $(".daysTab").find("li").eq(delDayIndex),
			index = delDayIndex,
			sid = li.find(".sid").val();
		$.ajax({
			type: "post",
			url: "/schedule/delete",
			data: {
				sid: sid
			},
			success: function(){
				setTimeout(function(){
					li.remove();
					$(".tripUl").eq(index).remove();
					for(i=index;i<$(".daysTab").children().length;i++){
						var day_n = i + 1;
						$(".daysTab").find("li").eq(i).find(".dayNum").html("第" + day_n + "天");
						$(".daysTab").find("li").eq(i).find("a").attr("class","li_" + i);
						$(".tripUl").eq(i).attr("id","tripUl_" + i);
					}
					var newSel = index > 0?index - 1:0,
						newNum = "li_" +　newSel;
					$("." + newNum).parent().addClass("active");
					selectTab(newNum);
				},10);
			}
		});
		
	//}
}
function pageAttraction(page){
	var page = $(page).html();
	var key = $("#key").val();
	var region = $("#region").val();
	if(key!=""||region!=""){
		doAttractionSearch(key,region,page);
	}else{
		$.ajax({
			url : "/attraction/listAttraction/"+page,
			type : "post",
			success : function(data){
				$("#detail").html(data);
				attractionBind();
			}
		});
	}
}
function searchAttractionRegion(region){
	var region = $(region).val();
	doAttractionSearch("",region,1);
}
function doAttractionSearch(key,region,page){
	$.ajax({
		url : "/attraction/searchAttraction/"+page,
		type : "post",
		data : {
			key : key,
			region : region
		},
		success : function(data){
			var data = eval("(" + data + ")");
			var html = data.html,
				key = data.key,
				region = data.region;
			$("#detail").html(html);
			attractionBind();
			if(key!=""){
				$("#key").val(key);
			}
			if(region!=""){
				$("#region").val(region);
			}
		}
	});
}
function scrollBottom(){
	var scrollH = $(".tripUl.active").height();
	$("#tripList").animate({scrollTop:scrollH + "px"},500);
}
function carline(){
	$.ajax({
		url : "/carline/listCarline/1",
		type : "post",
		success : function(data){
			$("#detail").html(data);
			trafficBind();
			$("#map").hide();
			$(".addToPlan").click(function(){
				var item = $(this).parent().parent();
				var param = {
						item: item,
						fun: function(){
							var carNum = item.find(".carNum").html(),
								carTel = item.find(".carTel").html(),
								price = item.find(".priceNum").html().replace(",",""),
								imgSrc = item.find(".infoPic img").attr("src"),
								num = $(".tripUl.active").children().length,
								itemId = item.find("input[name='index']").val(),
								itemHtml = '<li><div class="liItem" num="' + num + '" onmouseover="liOn(this)" onmouseout="liOut(this)"><div class="itemPic"><img src="' + imgSrc + '"></div><div class="itemCon" itemType="carline" itemId="' + itemId + '">'
										+'<strong style="font-weight:normal;">' + carNum + '</strong><span class="price pull-right" style="cursor:pointer;" onclick="editPrice(this)">预算：￥<span class="priceNum pull-right priceShow" style="width:40px;">' + price + '</span><span class="pull-right priceEdit" style="width:40px;"><input type="text" style="width:40px;" onblur="savePrice(this)"></span></span><p style="clear:both;"><small>电话：' + carTel + '</small></p></div>'
										+'<a href="javascript:void(0);" class="remark" onclick="remarkLi(this)"></a><a href="javascript:void(0);" class="delItem" onclick="delLi(this)"></a>'
										+'<p class="remarkArea rShow"><span class="remarkBtn remarkShow"  onclick="remarkEdit(this)">点击添加备注</span>'
										+'<span class="remarkEdit"><textarea class="remarkTxt"></textarea>'
										+'<span class="remarkCancel" onclick="remarkCancel(this)">取消</span>'
										+'<span class="remarkOk" onclick="remarkOk(this)">确定</span></span></p></div></li>';
							$(".tripUl.active").append(itemHtml);
							scrollBottom();
						}
				}
				addPlanItem(param);
			});
		}
	});
}
function pageCarline(page){
	var page = $(page).html();
	var startCity = $("#startCity").val();
	var endCity = $("#endCity").val();
	if(startCity!=""||endCity!=""){
		doAttractionSearch(startCity,endCity,page);
	}else{
		$.ajax({
			url : "/carline/listCarline/"+page,
			type : "post",
			success : function(data){
				$("#detail").html(data);
				trafficBind();
			}
		});
	}
}
function addToTrip(id){
	var eid = id,
		tid = $("#tid").val();
	$.ajax({
		url : "/trip/addExpert",
		type : "post",
		data : {
			tid : tid,
			eid : eid
		},
		success : function(data){
			$("#trip").html(data);
			var dayIndex = $(".daysTab").children().length - 1,
				dayNum = "li_" + dayIndex;
			$(".daysTab .tabLi").removeClass("active");
			$(".daysTab").find(".tabLi").eq(dayIndex).addClass("active");
			selectTab(dayNum);
			countPrice();
			$(".deleteDay").mydialog({
				type: "confirm",
				content: "确定要删除这天吗?所有与这天关联的信息都会被删除",
				title: "提醒",
				fun: function(){delDay(delDayIndex);}
			});
			itemDrag();
			$(".addDay").click(function(){
				var tid = $("#tid").val();
				$.ajax({
					type: "post",
					url: "/schedule/create",
					data: {
						tid: tid
					},
					success: function(data){
						var num_ = $(".daysTab").children().length,
							n = num_ + 1,
							num = "li_" + num_,
							sid = data,
							li = "<li class='tabLi active'><a class='" + num + "' href='javascript:void(0);' onclick='switchTab(this)' onmouseover='onTab(this)' onmouseout='outTab(this)'>"
								+"<span class='dayNum'>第" + n + "天</span><span class='deleteDay' onclick='delDayIndex=$(this).parent().parent().index();'></span></a><input class='sid' type='hidden' value='" + sid + "' /></li>",
							ul = "<ul id='tripUl_" + num_ + "' class='tripUl'></ul>";
						$(".tabLi").removeClass("active");
						$(".daysTab").append(li);
						$("#tripList").append(ul);
						selectTab(num);
						//createMap_e();
						itemDrag();
						$("#dayPrice .priceNum").html(0);
						var bindIndex = $(".daysTab").find(".deleteDay").length - 1;
						$(".daysTab").find(".deleteDay").eq(bindIndex).mydialog({
							type: "confirm",
							content: "确定要删除这天吗?所有关联的信息都会被删除",
							title: "提醒",
							fun: function(){delDay(delDayIndex);}
						});
					},
					error: function(){
						$.ubdialog({
							type: "text",
							title: "消息提示",
							content: "添加失败！请检查网络环境确保网络畅通！",
							align: "center"
						});
					}
				});
			});
		},
		error : function(){
			
		}
	});
}
function flight(){
	$.ajax({
		url : "/flight/listFlight/1",
		type : "post",
		success : function(data){
			$("#map").hide();
			$("#detail").html(data);
			trafficBind();
			$(".addToPlan").click(function(){
				var item = $(this).parent().parent();
				var param = {
						item: item,
						fun: function(){
							var flightNum = item.find(".flightNum").html(),
								flightTime = item.find(".flightTime").html(),
								flightPath = item.find(".flightPath").html(),
								price = item.find(".priceNum").html().replace(",",""),
								imgSrc = item.find(".infoPic img").attr("src"),
								num = $(".tripUl.active").children().length,
								itemId = item.find("input[name='index']").val(),
								itemHtml = '<li><div class="liItem" num="' + num + '" onmouseover="liOn(this)" onmouseout="liOut(this)"><div class="itemPic"><img src="' + imgSrc + '"></div><div class="itemCon" itemType="flight" itemId="' + itemId + '" style="padding-top:0;">'
										+'<strong style="font-weight:normal;">' + flightNum + '</strong><span class="price pull-right" style="cursor:pointer;" onclick="editPrice(this)">预算：￥<span class="priceNum pull-right priceShow" style="width:40px;">' + price + '</span><span class="pull-right priceEdit" style="width:40px;"><input type="text" style="width:40px;" onblur="savePrice(this)"></span></span><p style="margin:0;clear:both;"><small>' + flightPath + '</small></p><p style="margin:0;"><small>' + flightTime + '</small></p></div>'
										+'<a href="javascript:void(0);" class="remark" onclick="remarkLi(this)"></a><a href="javascript:void(0);" class="delItem" onclick="delLi(this)"></a>'
										+'<p class="remarkArea rShow"><span class="remarkBtn remarkShow"  onclick="remarkEdit(this)">点击添加备注</span>'
										+'<span class="remarkEdit"><textarea class="remarkTxt"></textarea>'
										+'<span class="remarkCancel" onclick="remarkCancel(this)">取消</span>'
										+'<span class="remarkOk" onclick="remarkOk(this)">确定</span></span></p></div></li>';
							$(".tripUl.active").append(itemHtml);
							scrollBottom();
						}
				};
				addPlanItem(param);
			});
		}
	});
}
function trafficBind(){
	$(".infoItem").mouseover(function(){
		$(this).addClass("on");
	}).mouseout(function(){
		$(this).removeClass("on");
	});
	$(".swapEach a").click(function(){
		var startVal = $("#startCity").val(),
			endVal = $("#endCity").val();
		$("#startCity").val(endVal);
		$("#endCity").val(startVal);
	});
}
function trainline(){
	$.ajax({
		url : "/trainline/listTrainline/1",
		type : "post",
		success : function(data){
			$("#map").hide();
			$("#detail").html(data);
			trafficBind();
			$(".addToPlan").click(function(){
				var item = $(this).parent().parent();
				var param = {
						item: item,
						fun: function(){
							var trainNum = item.find(".trainNum").html(),
								trainTime = item.find(".trainTime").html(),
								trainStart = item.find(".trainStart").html(),
								trainEnd = item.find(".trainEnd").html(),
								line = trainStart + "-" + trainEnd,
								price = item.find(".priceNum").html().replace(",",""),
								imgSrc = item.find(".infoPic img").attr("src"),
								num = $(".tripUl.active").children().length,
								itemId = item.find("input[name='index']").val(),
								itemHtml = '<li><div class="liItem" num="' + num + '" onmouseover="liOn(this)" onmouseout="liOut(this)"><div class="itemPic"><img src="' + imgSrc + '"></div><div class="itemCon" itemType="trainline" itemId="' + itemId + '" style="padding-top:0;">'
										+'<strong title="' + trainNum + '" style="font-weight:normal;">' + trainNum + '</strong><span class="price pull-right" style="cursor:pointer;" onclick="editPrice(this)">预算：￥<span class="priceNum pull-right priceShow" style="width:40px;">' + price + '</span><span class="priceEdit pull-right" style="width:40px;"><input type="text" style="width:40px;" onblur="savePrice(this)"></span></span><p style="margin:0;clear:both;"><small>' + line + '</small></p><p style="margin:0;"><small>' + trainTime + '</small></p></div>'
										+'<a href="javascript:void(0);" class="remark" onclick="remarkLi(this)"></a><a href="javascript:void(0);" class="delItem" onclick="delLi(this)"></a>'
										+'<p class="remarkArea rShow"><span class="remarkBtn remarkShow"  onclick="remarkEdit(this)">点击添加备注</span>'
										+'<span class="remarkEdit"><textarea class="remarkTxt"></textarea>'
										+'<span class="remarkCancel" onclick="remarkCancel(this)">取消</span>'
										+'<span class="remarkOk" onclick="remarkOk(this)">确定</span></span></p></div></li>';
							$(".tripUl.active").append(itemHtml);
							scrollBottom();
						}
				};
				addPlanItem(param);
			});
		}
	});
}
function busline(){
	$.ajax({
		url : "/busline/listBusline/1",
		type : "post",
		success : function(data){
			$("#detail").html(data);
			trafficBind();
			$("#map").hide();
			$(".addToPlan").click(function(){
				var item = $(this).parent().parent(),
					/*spotName = item.find(".spotName").html(),
					tripTime = item.find(".tripTime").html(),
					price = item.find(".priceNum").html().replace(",",""),*/
					spotName = "",
					tripTime = "",
					price = "",
					imgSrc = item.find(".infoPic img").attr("src"),
					num = $(".tripUl.active").children().length,
					itemId = item.find("input[name='index']").val(),
					itemHtml = '<li><div class="liItem" num="' + num + '" onmouseover="liOn(this)" onmouseout="liOut(this)"><div class="itemPic"><img src="' + imgSrc + '"></div><div class="itemCon" itemType="busline" itemId="' + itemId + '">'
							+'<strong style="font-weight:normal;">包车</strong><span class="price pull-right" style="cursor:pointer;" onclick="editPrice(this)">预算：￥<span class="priceNum pull-right priceShow" style="width:40px;">' + price + '</span><span class="pull-right priceEdit" style="width:40px;"><input type="text" style="width:40px;" onblur="savePrice(this)"></span></span><p style="clear:both;"><small>' + tripTime + '</small></p></div>'
							+'<a href="javascript:void(0);" class="remark" onclick="remarkLi(this)"></a><a href="javascript:void(0);" class="delItem" onclick="delLi(this)"></a>'
							+'<p class="remarkArea rShow"><span class="remarkBtn remarkShow"  onclick="remarkEdit(this)">点击添加备注</span>'
							+'<span class="remarkEdit"><textarea class="remarkTxt"></textarea>'
							+'<span class="remarkCancel" onclick="remarkCancel(this)">取消</span>'
							+'<span class="remarkOk" onclick="remarkOk(this)">确定</span></span></p></div></li>';
				$(".tripUl.active").append(itemHtml);
				scrollBottom();
			});
		}
	});
}
function hotel(){
	$.ajax({
		url : "/hotel/listHotel/1",
		type : "post",
		success : function(data){
			$("#detail").html(data);
			hotelbind();
		}
	});
}
function updateEvent(){
	var dia = $(".diaDiv"),
	id = dia.find("input[name='id']").val(),
	title = dia.find("input[name='title']").val(),
	startTime = dia.find("input[name='startTime']").val(),
	endTime = dia.find("input[name='endTime']").val(),
	price = dia.find("input[name='price']").val(),
	description = dia.find("textarea[name='description']").val(),
	sid = $(".tabLi.active").find(".sid").val(),
	index = $(".tripUl.active").children().length,
	r = /^\+?[1-9][0-9]*$/;;
	if(title == ""){
		$(".errorMsg").remove();
		dia.find("input[name='title']").after("<span class='errorMsg' style='color:#f00;'>事件标题不能为空</span>");
	}else if(startTime == ""){
		$(".errorMsg").remove();
		dia.find("input[name='startTime']").after("<span class='errorMsg' style='color:#f00;'>开始时间不能为空</span>");
	}else if(endTime == ""){
		$(".errorMsg").remove();
		dia.find("input[name='endTime']").after("<span class='errorMsg' style='color:#f00;'>结束时间不能为空</span>");
	}else if(price == ""){
		$(".errorMsg").remove();
		dia.find("input[name='price']").after("<span class='errorMsg' style='color:#f00;'>事件预算不能为空</span>");
	}else if(!r.test(price)){
		$(".errorMsg").remove();
		dia.find("input[name='price']").after("<span class='errorMsg' style='color:#f00;'>事件预算必须为正整数</span>");
	}else{
		$.ajax({
			url : "/event/update",
			type : "post",
			data : {
				id : id,
				sid: sid,
				title: title,
				startTime: startTime,
				endTime: endTime,
				price: price,
				description: description,
				index: index
			},
			success : function(data){
				if(data != "error"){
					$(".diaDiv,.diaBg").remove();
					intiTrip();
				}
			}
		});
	}
}
function addEvent(){
	var dia = $(".diaDiv"),
		title = dia.find("input[name='title']").val(),
		startTime = dia.find("input[name='startTime']").val(),
		endTime = dia.find("input[name='endTime']").val(),
		price = dia.find("input[name='price']").val(),
		description = dia.find("textarea[name='description']").val(),
		sid = $(".tabLi.active").find(".sid").val(),
		index = $(".tripUl.active").children().length,
		r = /^\+?[1-9][0-9]*$/;;
	if(title == ""){
		$(".errorMsg").remove();
		dia.find("input[name='title']").after("<span class='errorMsg' style='color:#f00;'>事件标题不能为空</span>");
	}else if(startTime == ""){
		$(".errorMsg").remove();
		dia.find("input[name='startTime']").after("<span class='errorMsg' style='color:#f00;'>开始时间不能为空</span>");
	}else if(endTime == ""){
		$(".errorMsg").remove();
		dia.find("input[name='endTime']").after("<span class='errorMsg' style='color:#f00;'>结束时间不能为空</span>");
	}else if(price == ""){
		$(".errorMsg").remove();
		dia.find("input[name='price']").after("<span class='errorMsg' style='color:#f00;'>事件预算不能为空</span>");
	}else if(!r.test(price)){
		$(".errorMsg").remove();
		dia.find("input[name='price']").after("<span class='errorMsg' style='color:#f00;'>事件预算必须为正整数</span>");
	}else{
		$.ajax({
			url : "/event/add",
			type : "post",
			data : {
				sid: sid,
				title: title,
				startTime: startTime,
				endTime: endTime,
				price: price,
				description: description,
				index: index
			},
			success : function(data){
				if(data != "error"){
					$(".diaDiv,.diaBg").remove();
					var timeLine = startTime + "-" + endTime,
						num = $(".tripUl.active").children().length,
						itemHtml = '<li><div class="liItem" num="' + num + '" onmouseover="liOn(this)" onmouseout="liOut(this)"><div class="itemPic"><img src="/images/notepad.png"></div><div class="itemCon" itemType="event" itemId="' + data + '" style="padding-top:2px;">'
								+'<strong title="' + title + '" style="font-weight:normal;">' + title + '</strong><span class="price pull-right" style="cursor:pointer;" onclick="editPrice(this)">预算：￥<span class="priceNum pull-right priceShow" style="width:40px;">' + price + '</span><span class="priceEdit pull-right" style="width:40px;"><input type="text" style="width:40px;" onblur="savePrice(this)"></span></span><p style="clear:both;" title="' + timeLine + '"><small style="width:180px;">时间:' + timeLine + '</small></p><p style="margin:0;" title="' + description + '"><small style="width:180px;">描述:' + description + '</small></p></div>'
								+'<a href="javascript:void(0);" class="remark" onclick="editEvent(\''+data+'\',\''+title+'\')"></a><a href="javascript:void(0);" class="delItem" onclick="delLi(this)"></a>'
								+'<p class="remarkArea rShow"><span class="remarkBtn remarkShow"  onclick="remarkEdit(this)">点击添加备注</span>'
								+'<span class="remarkEdit"><textarea class="remarkTxt"></textarea>'
								+'<span class="remarkCancel" onclick="remarkCancel(this)">取消</span>'
								+'<span class="remarkOk" onclick="remarkOk(this)">确定</span></span></p></div></li>';
					$(".tripUl.active").append(itemHtml);
					countPrice();
					scrollBottom();
				}
			}
		});
	}
}
function hotelbind(){
	trafficBind();
	$("#map").show();
	createMap_e();
	$(".addToPlan").click(function(){
		var item = $(this).parent().parent();
		var param = {
				item: item,
				fun: function(){
					var hotelName = item.find(".hotelName").html(),
						hotelTel = item.find(".hotelTel").html(),
						hotelAddress = item.find(".hotelAddress").html(),
						price = item.find(".priceNum").html().replace(",",""),
						imgSrc = item.find(".infoPic img").attr("src"),
						num = $(".tripUl.active").children().length,
						itemId = item.find("input[name='index']").val(),
						itemHtml = '<li><div class="liItem" num="' + num + '" onmouseover="liOn(this)" onmouseout="liOut(this)">'
								+'<div class="itemPic"><img src="' + imgSrc + '"></div><div class="itemCon" style="padding-top:0;" itemType="hotel" itemId="' + itemId + '">'
								+'<strong title="' + hotelName + '" style="font-weight:normal;">' + hotelName + '</strong><span class="price pull-right" style="cursor:pointer;" onclick="editPrice(this)">预算：￥<span class="priceNum pull-right priceShow" style="width:40px;">' + price + '</span><span class="priceEdit pull-right" style="width:40px;"><input type="text" style="width:40px;" onblur="savePrice(this)"></span></span><p style="margin:0;clear:both;"><small>电话：' + hotelTel + '</small></p><p style="margin:0;"><small>地址：' + hotelAddress + '</small></p></div>'
								+'<a href="javascript:void(0);" class="remark" onclick="remarkLi(this)"></a><a href="javascript:void(0);" class="delItem" onclick="delLi(this)"></a>'
								+'<p class="remarkArea rShow"><span class="remarkBtn remarkShow"  onclick="remarkEdit(this)">点击添加备注</span>'
								+'<span class="remarkEdit"><textarea class="remarkTxt"></textarea>'
								+'<span class="remarkCancel" onclick="remarkCancel(this)">取消</span>'
								+'<span class="remarkOk" onclick="remarkOk(this)">确定</span></span></p></div></li>';
					$(".tripUl.active").append(itemHtml);
					scrollBottom();
				}
		};
		addPlanItem(param);
	});
}
function pageHotel(page){
	var page = $(page).html();
	var key = $("#key").val();
	var region = $("#region").val();
	if(key!=""||region!=""){
		doHotelSearch(key,region,page);
	}else{
		$.ajax({
			url : "/hotel/listHotel/"+page,
			type : "post",
			success : function(data){
				$("#detail").html(data);
				hotelbind();
				//trafficBind();
			}
		});
	}
}
function searchHotelRegion(region){
	var region = $(region).val();
	doHotelSearch("",region,1);
}
function searchHotel(){
	var key = $("#key").val();
	var region = $("#region").val();
	doHotelSearch(key,region,1);
}
function doHotelSearch(key,region,page){
	$.ajax({
		url : "/hotel/searchHotel/"+page,
		type : "post",
		data : {
			key : key,
			region : region
		},
		success : function(data){
			var data = eval("(" + data + ")");
			var html = data.html,
				key = data.key,
				region = data.region;
			$("#detail").html(html);
			if(key!=""){
				$("#key").val(key);
			}
			if(region!=""){
				$("#region").val(region);
				$(".infoItem").mydialog({
					type:'file',
					width:800,
					height:450,
					url:"/hotel/detail",
					title:"酒店详情"
				});
			}
		}
	});
}
function pageTraffic(page){
	var page = $(page).html();
	var name = $("#pagination").val();
	var startCity = $("#startCity").val();
	var endCity = $("#endCity").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var url = "";
	if(startCity!=""||endCity!=""||startDate!=""||endDate!=""){
		url = handleurl(name,"search");
		doTrafficSearch(startCity,endCity,startDate,endDate,url,page);
	}else{
		url = handleurl(name,"list");
		$.ajax({
			url : url+page,
			type : "post",
			success : function(data){
				$("#detail").html(data);
				trafficBind();
			}
		});
	}
}
function searchTraffic(){
	var name = $("#pagination").val();
	var startCity = $("#startCity").val();
	var endCity = $("#endCity").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var url = handleurl(name,"search");
	doTrafficSearch(from,to,date,url,1);
}
function doTrafficSearch(from,to,startdate,enddate,url,page){
	$.ajax({
		url : url+page,
		type : "post",
		data : {
			from : from,
			to : to,
			startdate : startdate,
			enddate : enddate
		},
		success : function(data){
			var data = eval("(" + data + ")");
			var html = data.html,
				from = data.from,
				to = data.to,
				date = data.date;
			if(from!=""){
				$("#from").val(from);
			}
			if(to!=""){
				$("#to").val(to);
			}
			if(date!=""){
				$("#date").val(date);
			}
			$("#detail").html(html);
		}
	});
}
function handleurl(type,method){
	var url = "";
	if(method == "search"){
		if(type == "carline"){
			url = "/carline/searchCarline/";
		}
		if(type == "flight"){
			url = "/flight/searchFlight/"
		}
		if(type == "busline"){
			url = "/busline/searchBusline/"
		}
		if(type == "trainline"){
			url = "/trainline/searchTrainline/"
		}
	}else if(method == "list"){
		if(type == "carline"){
			url = "/carline/listCarline/";
		}
		if(type == "flight"){
			url = "/flight/listFlight/"
		}
		if(type == "busline"){
			url = "/busline/listBusline/"
		}
		if(type == "trainline"){
			url = "/trainline/listTrainline/"
		}
	}
	return url;
}
function attractionBind(){
	$(".spotItem").mouseover(function(){
		$(this).addClass("on");
	}).mouseout(function(){
		$(this).removeClass("on");
	});
	$(".addToPlan").click(function(){
		var item = $(this).parent().parent().parent();
		var param = {
				item: item,
				fun: function(){
					var spotName = item.find(".spotName").html(),
						tripTime = item.find(".tripTime").html(),
						price = item.find(".priceNum").html().replace(",",""),
						imgSrc = item.find(".imgDiv img").attr("src"),
						num = $(".tripUl.active").children().length,
						longitude = item.find("input[name='index']").attr("longitude"),
						latitude = item.find("input[name='index']").attr("latitude"),
						itemId = item.find("input[name='index']").val(),
						itemHtml = '<li><div class="liItem spotLiItem" num="' + num + '" onmouseover="liOn(this)" onmouseout="liOut(this)"><div class="itemPic"><img src="' + imgSrc + '"></div><div class="itemCon" longitude=' + longitude + ' latitude=' + latitude + ' itemType="attraction" itemId="' + itemId + '">'
								+'<strong class="spotName" title="' + spotName + '" style="font-weight:normal;">' + spotName + '</strong><span class="price pull-right" style="cursor:pointer;" onclick="editPrice(this)">预算：￥<span class="priceNum pull-right priceShow" style="width:40px;">' + price + '</span><span class="pull-right priceEdit" style="width:40px;"><input type="text" style="width:40px;" onblur="savePrice(this)"></span></span><p style="clear:both;"><small>' + tripTime + '</small></p></div>'
								+'<a href="javascript:void(0);" class="remark" onclick="remarkLi(this)"></a><a href="javascript:void(0);" class="delItem" onclick="delLi(this)"></a>'
								+'<p class="remarkArea rShow"><span class="remarkBtn remarkShow"  onclick="remarkEdit(this)">点击添加备注</span>'
								+'<span class="remarkEdit"><textarea class="remarkTxt"></textarea>'
								+'<span class="remarkCancel" onclick="remarkCancel(this)">取消</span>'
								+'<span class="remarkOk" onclick="remarkOk(this)">确定</span></span></p></div></li>';
					$(".tripUl.active").append(itemHtml);
					scrollBottom();
					//createMap_e();
				}
		};
		addPlanItem(param);
	});
}
function addPlanItem(param){
	var item = param.item,
		type = item.find(".itemType").val(),
		id = $(".tabLi.active").find(".sid").val(),
		oid = item.find("input[name='index']").val(),
		index = $(".tripUl.active").children().length,
		price = item.find(".priceNum").html();
		price = price.replace(",","");
	$.ajax({
		type: "post",
		url: "/schedule/add",
		data: {
			type: type,
			id: id,
			oid: oid,
			index: index,
			price: price
		},
		success: function(){
			param.fun();
			countPrice();
		},
		error: function(){
			$.ubalert({
				content:"添加失败！",
				delay: 1000
			});
		}
	});
}
function itemDrag(){
	if($(".tripUl.active").attr("data-listidx") == undefined){
		$(".tripUl.active").dragsort({ dragSelector: "div", dragBetween: true, dragEnd: itemDragEnd, placeHolderTemplate: "<li class='placeHolder'><div></div></li>" });
	}
}
function itemDragEnd(){
	var list = $(".tripUl.active"),
		state = 0,
		id = $(".tabLi.active").find(".sid").val(),
		from,
		to;
	for(i=0;i<list.children().length;i++){
		var num = parseInt(list.children().eq(i).find(".liItem").attr("num"));
		if(num != i && state == 0){
			from = num;
			to = i;
			state = 1;
		}
		list.children().eq(i).find(".liItem").attr("num",i);
	}
	$.ajax({
		type: "post",
		url: "/schedule/move",
		data: {
			id: id,
			from: from,
			to: to
		},
		success: function(){
			//createMap_e();
		},
		error: function(){
			$.ubdialog({
				type: "text",
				title: "消息提示",
				content: "调整失败！请检查网络环境确保网络畅通！",
				align: "center"
			});
		}
	});
}
function createMap_e(){
	// 百度地图API功能
	var map = new BMap.Map("map");
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
	var opts = {type: BMAP_NAVIGATION_CONTROL_LARGE}    
	map.addControl(new BMap.NavigationControl(opts));    
	var bounds = null;
	var linesPoints = null;
	var curPoints = new Array(),
		curSpotNames = new Array(),
		spotList = $("#detail").find("input[name='index']"),
		m = spotList.length;
	for(i=0;i<spotList.length;i++){
		var spotCon = spotList.eq(i),
			lo = parseFloat(spotCon.attr("longitude")),
			la = parseFloat(spotCon.attr("latitude"));
		curPoints[i] = new BMap.Point(lo,la);
		curSpotNames[i] = spotList.eq(i).attr("typeName");
	}
	var myIcon = new BMap.Icon("Mario.png", new BMap.Size(32, 70), {imageOffset: new BMap.Size(0, 0)});

	function addTxt(points){
		function ComplexCustomOverlay(point, index, text, mouseoverText){
		  this._point = point;
		  this._text = text;
		  this._overText = mouseoverText;
		  this._index = index + 1;
		}
		ComplexCustomOverlay.prototype = new BMap.Overlay();
		ComplexCustomOverlay.prototype.initialize = function(map){
		  this._map = map;
		  var div = this._div = document.createElement("div");
		  div.style.position = "absolute";
		  div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
		  div.style.backgroundColor = "#6BADCA";
		  div.style.border = "1px solid #0489B1";
		  div.style.height = "24px";
		  div.style.lineHeight = "18px";
		  div.style.whiteSpace = "nowrap";
		  div.style.MozUserSelect = "none";
		  div.style.fontSize = "12px";
		  var divInner = document.createElement("div");
		  divInner.style.width = "25px";
		  divInner.style.height = "22px";
		  divInner.style.textAlign = "center";
		  divInner.style.position = "absolute";
		  divInner.style.top = 0;
		  divInner.style.left = 0;
		  divInner.style.color = "#fff";
		  var span = this._span = document.createElement("span");
		  span.style.display = "block";
		  span.style.padding = "0 4px";
		  span.style.lineHeight = "22px";
		  span.style.marginLeft = "27px";
		  span.style.backgroundColor = "#fff";
		  div.appendChild(span);
		  div.appendChild(divInner);
		  $(div).mouseover(function(){
			  $(this).addClass("mapMouseOn");
		  }).mouseout(function(){
			  $(this).removeClass("mapMouseOn");
		  });
		  span.appendChild(document.createTextNode(this._text));      
		  divInner.appendChild(document.createTextNode(this._index));
		  var that = this;

		  var arrow = this._arrow = document.createElement("div");
		  arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
		  arrow.style.backgroundPosition = "0px -20px";
		  arrow.style.position = "absolute";
		  arrow.style.width = "11px";
		  arrow.style.height = "10px";
		  arrow.style.top = "22px";
		  arrow.style.left = "10px";
		  arrow.style.overflow = "hidden";
		  div.appendChild(arrow);
		 
		  div.onmouseover = function(){
			var top = parseInt(this.style.top) - 6,
				top_arrow = parseInt(this.getElementsByTagName("div")[1].style.top) + 6;
			this.style.backgroundColor = "#EE5D5B";
			this.style.borderColor = "#BC3B3A";
			this.style.height = "30px";
			this.style.top = top + "px";
			this.getElementsByTagName("div")[0].style.width = "31px";
			this.getElementsByTagName("div")[0].style.height = "28px";
			this.getElementsByTagName("div")[0].style.lineHeight = "28px";
			this.getElementsByTagName("div")[1].style.top = top_arrow + "px";
			this.getElementsByTagName("span")[0].innerHTML = that._overText;
			this.getElementsByTagName("span")[0].style.lineHeight = "28px";
			this.getElementsByTagName("span")[0].style.marginLeft = "33px";
			arrow.style.backgroundPosition = "0px 0px";
		  }

		  div.onmouseout = function(){
			var top = parseInt(this.style.top) + 6,
				top_arrow = parseInt(this.getElementsByTagName("div")[1].style.top) - 6;
			this.style.backgroundColor = "#6BADCA";
			this.style.borderColor = "#0489B1";
			this.style.height = "24px";
			this.style.top = top + "px";
			this.getElementsByTagName("div")[0].style.width = "25px";
			this.getElementsByTagName("div")[0].style.height = "22px";
			this.getElementsByTagName("div")[0].style.lineHeight = "22px";
			this.getElementsByTagName("div")[1].style.top = top_arrow + "px";
			this.getElementsByTagName("span")[0].innerHTML = that._text;
			this.getElementsByTagName("span")[0].style.lineHeight = "22px";
			this.getElementsByTagName("span")[0].style.marginLeft = "27px";
			arrow.style.backgroundPosition = "0px -20px";
		  }

		  map.getPanes().labelPane.appendChild(div);
		  
		  return div;
		}
		ComplexCustomOverlay.prototype.draw = function(){
		  var map = this._map;
		  var pixel = map.pointToOverlayPixel(this._point);
		  this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
		  this._div.style.top  = pixel.y - 30 + "px";
		}
		for(i=0;i<points.length;i++){
			mouseoverTxt = curSpotNames[i];
			var myCompOverlay = new ComplexCustomOverlay(points[i], i, curSpotNames[i],mouseoverTxt);
			map.addOverlay(myCompOverlay);
		}
	}
	if(curPoints.length > 0){
		addTxt(curPoints);
		map.centerAndZoom(curPoints[0], 7);
	}
	map.enableScrollWheelZoom(true);
}

function initShare(con){
	var title = con,
		url = location.href,
		imgUrl = $(".spotItem:eq(0) img").attr("src");
	url = url.replace("detailMine/","");
	window._bd_share_config = {
			common : {
				bdText : '#天上西藏-说走就走的旅行#' + title,	
				bdDesc : '我在#天上西藏#制定了一个旅行计划，大家都背起背包，跟我一起去旅行吧！GO！',	
				bdUrl : url,
				bdPic : imgUrl
			},
			share : [{
				"bdSize" : 16
			}]
	}
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
}
function addFavorite(type,tid,a){
	var colBtn = $(a);
	$.ajax({
		type: "post",
		url: "/"+type+"/favorite/" + tid,
		success: function(data){
			var con;
			if(data != "fail"){
				con = "已加入我的收藏！";
				colBtn.after("<a href='javascript:void(0);' fid='" + data + "' class='pull-right hasCollected' onclick='cancelFavorite(\""+type+"\",\""+tid+"\",this)'>取消收藏</a>").remove();
			}else{
				con = "加入收藏失败！请重新尝试"
			}
			$.ubalert({
				content: con,
				delay: 2000
			});
		}
	});
}
function cancelFavorite(type,tid,a){
	var canBtn = $(a),
		fid = canBtn.attr("fid");
	$.ajax({
		type: "post",
		url: "/"+type+"/cancelFavorite/" + fid,
		success: function(data){
			var con;
			if(data == "success"){
				con = "已取消收藏！";
				canBtn.after("<a href='javascript:void(0);' class='pull-right addToCollection' onclick='addFavorite(\""+type+"\",\""+tid+"\",this)'>加入收藏</a>").remove();
			}else{
				con = "取消收藏失败！";
			}
			$.ubalert({
				content: con,
				delay: 2000
			});
		}
	});
}
function createMapBtn(){
	var dayList = $(".tripDay");
		btnList = "<li class='mapBtn'><a dayNum='0' class='mapBtnA' href='javascript:void(0);'>全部</a></li>";
	for(i=0;i<dayList.length;i++){
		var n = i + 1,
			act = i==0?" active":"";
			btn = "<li class='mapBtn" + act + "'><a dayNum='" + n + "' class='mapBtnA' href='javascript:void(0);'>第" + n + "天</a></li>";
		btnList += btn;
	}
	var	btnUlW = dayList.length>8?" style='width:90%;'":"",
		btnUl = "<ul class='mapBtnUl'" + btnUlW + ">" + btnList + "</ul>",
		btnL = dayList.length>8?"<div class='mapBtnTurnL glyphicon glyphicon-chevron-left' style='width:16px;'></div>":"",
		btnR = dayList.length>8?"<div class='mapBtnTurnR glyphicon glyphicon-chevron-right' style='width:16px;'></div>":"",
		mapBtnHtml = "<div class='mapBtnDiv' style='overflow:hidden;'>" + btnR + btnUl + btnL + "</div>";
	$("#mapDiv").append(mapBtnHtml);
	$(".mapBtnTurnL").click(function(){
		var left = $(".mapBtnUl").scrollLeft(),
		left = left - 496;
		$(".mapBtnUl").animate({scrollLeft:left+"px"},100);
	});
	$(".mapBtnTurnR").click(function(){
		var left = $(".mapBtnUl").scrollLeft(),
			left = left + 496;
		$(".mapBtnUl").animate({scrollLeft:left+"px"},100);
	});
	$(".mapBtnA").click(function(){
		var btnIndex = $(this).parent().index();
		var dayNum = parseInt($(this).attr("dayNum"));
		createMap(dayNum);
		//createMapBtn();
		$(".mapBtn").removeClass("active");
		$(".mapBtn").eq(btnIndex).addClass("active");
	});
	
}
function createMap(n){
	// 百度地图API功能
	var map = new BMap.Map("map");
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
	var opts = {type: BMAP_NAVIGATION_CONTROL_LARGE}    
	map.addControl(new BMap.NavigationControl(opts));    
	var bounds = null;
	var linesPoints = null;
	var curPoints = new Array(),
		curSpotNames = new Array(),
		spotList = n>0?$("#d" + n).find(".spotItem"):$(".itemList").find(".spotItem");
	for(i=0;i<spotList.length;i++){
		var spotCon = spotList.eq(i).find(".itemBody"),
			lo = parseFloat(spotCon.attr("longitude")),
			la = parseFloat(spotCon.attr("latitude"));
		curPoints[i] = new BMap.Point(lo,la);
		curSpotNames[i] = spotCon.parent().find(".itemHeader a").html();
	}
	var myIcon = new BMap.Icon("Mario.png", new BMap.Size(32, 70), {imageOffset: new BMap.Size(0, 0)});

	function initLine(){
	    bounds = new Array();
	    linesPoints = new Array();
	    map.clearOverlays();                                                    // 清空覆盖物
	    var driving = new BMap.DrivingRoute(map,{onSearchComplete:drawLine});  // 驾车实例,并设置回调
		for(i=0;i<curPoints.length - 1;i++){
			driving.search(curPoints[i], curPoints[i+1]); // 搜索一条线路
		}
	}

	function drawLine(results){
	    var opacity = 0.45;
	    var planObj = results.getPlan(0);
	    var b = new Array();
	    var addPoints = function(points){
	        for(var i = 0; i < points.length; i++){
	            bounds.push(points[i]);
	            b.push(points[i]);
	        }
	    }
	    
	    // 绘制驾车步行线路
	    for (var i = 0; i < planObj.getNumRoutes(); i ++){
	        var route = planObj.getRoute(i);
	        if (route.getDistance(false) <= 0){continue;}
	        addPoints(route.getPath());
	        // 驾车线路
	        if(route.getRouteType() == BMAP_ROUTE_TYPE_DRIVING){
	            map.addOverlay(new BMap.Polyline(route.getPath(), {strokeColor: "#0030ff",strokeOpacity:opacity,strokeWeight:6,enableMassClear:true}));
	        }else{
	        // 步行线路有可能为0
	            map.addOverlay(new BMap.Polyline(route.getPath(), {strokeColor: "#30a208",strokeOpacity:0.75,strokeWeight:4,enableMassClear:true}));
	        }
	    }
	    
	    map.setViewport(bounds);
	    linesPoints[linesPoints.length] = b;
	}
	function addTxt(points){
		function ComplexCustomOverlay(point, index, text, mouseoverText){
		  this._point = point;
		  this._text = text;
		  this._overText = mouseoverText;
		  this._index = index + 1;
		}
		ComplexCustomOverlay.prototype = new BMap.Overlay();
		ComplexCustomOverlay.prototype.initialize = function(map){
		  this._map = map;
		  var div = this._div = document.createElement("div");
		  div.style.position = "absolute";
		  div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
		  div.style.backgroundColor = "#6BADCA";
		  div.style.border = "1px solid #0489B1";
		  //div.style.color = "white";
		  div.style.height = "24px";
		  //div.style.padding = "2px";
		  div.style.lineHeight = "18px";
		  div.style.whiteSpace = "nowrap";
		  div.style.MozUserSelect = "none";
		  div.style.fontSize = "12px";
		  var divInner = document.createElement("div");
		  divInner.style.width = "25px";
		  divInner.style.height = "22px";
		  divInner.style.textAlign = "center";
		  divInner.style.position = "absolute";
		  divInner.style.top = 0;
		  divInner.style.left = 0;
		  divInner.style.color = "#fff";
		  var span = this._span = document.createElement("span");
		  span.style.display = "block";
		  span.style.padding = "0 4px";
		  span.style.lineHeight = "22px";
		  span.style.marginLeft = "27px";
		  span.style.backgroundColor = "#fff";
		  div.appendChild(span);
		  div.appendChild(divInner);
		  $(div).mouseover(function(){
			  $(this).addClass("mapMouseOn");
		  }).mouseout(function(){
			  $(this).removeClass("mapMouseOn");
		  });
		  span.appendChild(document.createTextNode(this._text));      
		  divInner.appendChild(document.createTextNode(this._index));
		  var that = this;

		  var arrow = this._arrow = document.createElement("div");
		  arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
		  arrow.style.backgroundPosition = "0px -20px";
		  arrow.style.position = "absolute";
		  arrow.style.width = "11px";
		  arrow.style.height = "10px";
		  arrow.style.top = "22px";
		  arrow.style.left = "10px";
		  arrow.style.overflow = "hidden";
		  div.appendChild(arrow);
		 
		  div.onmouseover = function(){
			var top = parseInt(this.style.top) - 6,
				top_arrow = parseInt(this.getElementsByTagName("div")[1].style.top) + 6;
			this.style.backgroundColor = "#EE5D5B";
			this.style.borderColor = "#BC3B3A";
			this.style.height = "30px";
			this.style.top = top + "px";
			this.getElementsByTagName("div")[0].style.width = "31px";
			this.getElementsByTagName("div")[0].style.height = "28px";
			this.getElementsByTagName("div")[0].style.lineHeight = "28px";
			this.getElementsByTagName("div")[1].style.top = top_arrow + "px";
			this.getElementsByTagName("span")[0].innerHTML = that._overText;
			this.getElementsByTagName("span")[0].style.lineHeight = "28px";
			this.getElementsByTagName("span")[0].style.marginLeft = "33px";
			arrow.style.backgroundPosition = "0px 0px";
		  }

		  div.onmouseout = function(){
			var top = parseInt(this.style.top) + 6,
				top_arrow = parseInt(this.getElementsByTagName("div")[1].style.top) - 6;
			this.style.backgroundColor = "#6BADCA";
			this.style.borderColor = "#0489B1";
			this.style.height = "24px";
			this.style.top = top + "px";
			this.getElementsByTagName("div")[0].style.width = "25px";
			this.getElementsByTagName("div")[0].style.height = "22px";
			this.getElementsByTagName("div")[0].style.lineHeight = "22px";
			this.getElementsByTagName("div")[1].style.top = top_arrow + "px";
			this.getElementsByTagName("span")[0].innerHTML = that._text;
			this.getElementsByTagName("span")[0].style.lineHeight = "22px";
			this.getElementsByTagName("span")[0].style.marginLeft = "27px";
			arrow.style.backgroundPosition = "0px -20px";
		  }

		  map.getPanes().labelPane.appendChild(div);
		  
		  return div;
		}
		ComplexCustomOverlay.prototype.draw = function(){
		  var map = this._map;
		  var pixel = map.pointToOverlayPixel(this._point);
		  this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
		  this._div.style.top  = pixel.y - 30 + "px";
		}
		for(i=0;i<points.length;i++){
			mouseoverTxt = curSpotNames[i];
			var myCompOverlay = new ComplexCustomOverlay(points[i], i, curSpotNames[i],mouseoverTxt);
			map.addOverlay(myCompOverlay);
		}
	}
	if(curPoints.length > 1){
		initLine();
	}
	if(curPoints.length > 0){
		addTxt(curPoints);
		if(curPoints.length == 1){
			map.centerAndZoom(curPoints[0], 15);
		}
	}
}
//图片滑动展示-start
var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}
Object.extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}

var GlideView = Class.create();
GlideView.prototype = {
  //容器对象 容器宽度 展示标签 展示宽度
  initialize: function(obj, iWidth, sTag, iMaxWidth, options) {
    var oContainer = document.getElementById(obj), oThis=this, len = 0;
	
	this.SetOptions(options);
	
	this.Step = Math.abs(this.options.Step);
	this.Time = Math.abs(this.options.Time);
	this.Showtext = false;//是否显示说明文本
	
	this._list = oContainer.getElementsByTagName(sTag);
	len = this._list.length;
	this._count = len;
	this._width = parseInt(iWidth / len);
	this._width_max = parseInt(iMaxWidth);
	this._width_min = parseInt((iWidth - this._width_max) / (len - 1));
	this._timer = null;
	
	this.Each(function(oList, oText, i){
		oList._target = this._width * i;//自定义一个属性放目标left
		oList.style.left = oList._target + "px";
		oList.style.position = "absolute";
		addEventHandler(oList, "mouseover", function(){ oThis.Set.call(oThis, i); });
		
	})
	
	//容器样式设置
	oContainer.style.width = iWidth + "px";
	oContainer.style.overflow = "hidden";
	oContainer.style.position = "relative";
	//移出容器时返回默认状态
	addEventHandler(oContainer, "mouseout", function(e){
		//变通防止执行oList的mouseout
		var o = Event(e).relatedTarget;
		if (oContainer.contains ? !oContainer.contains(o) : oContainer != o && !(oContainer.compareDocumentPosition(o) & 16)) oThis.Set.call(oThis, -1);
	})
  },
  //设置默认属性
  SetOptions: function(options) {
    this.options = {//默认值
		Step:			15,//滑动变化率
		Time:			10,//滑动延时
		TextTag:		"",//说明容器tag
		TextHeight:		0//说明容器高度
    };
    Object.extend(this.options, options || {});
  },
  //相关设置
  Set: function(index) {
	if (index < 0) {
		//鼠标移出容器返回默认状态
		this.Each(function(oList, oText, i){ oList._target = this._width * i; if(oText){ oText._target = this._height_text; } })
	} else {
		//鼠标移到某个滑动对象上
		this.Each(function(oList, oText, i){
			oList._target = (i <= index) ? this._width_min * i : this._width_min * (i - 1) + this._width_max;
			if(oText){ oText._target = (i == index) ? 0 : this._height_text; }
		})
	}
	this.Move();
  },
  //移动
  Move: function() {
	clearTimeout(this._timer);
	var bFinish = true;//是否全部到达目标地址
	this.Each(function(oList, oText, i){
		var iNow = parseInt(oList.style.left), iStep = this.GetStep(oList._target, iNow);
		if (iStep != 0) { bFinish = false; oList.style.left = (iNow + iStep) + "px"; }
		//有说明文本
		if (oText) {
			iNow = parseInt(oText.style.bottom), iStep = this.GetStep(oText._target, iNow);
			if (iStep != 0) { bFinish = false; oText.style.bottom = (iNow + iStep) + "px"; }
		}
	})
	//未到达目标继续移动
	if (!bFinish) { var oThis = this; this._timer = setTimeout(function(){ oThis.Move(); }, this.Time); }
  },
  //获取步长
  GetStep: function(iTarget, iNow) {
	var iStep = (iTarget - iNow) / this.Step;
	if (iStep == 0) return 0;
	if (Math.abs(iStep) < 1) return (iStep > 0 ? 1 : -1);
	return iStep;
  },
  Each:function(fun) {
	for (var i = 0; i < this._count; i++)
		fun.call(this, this._list[i], (this.Showtext ? this._text[i] : null), i);
  }
};
//图片滑动展示-end

//图片展示2-start
function randomView(id,bigW,itemW){
	var can = $("#" + id);
	can.css({
		width: bigW + "px",
		overflow: "hidden",
		position: "relative"
	});
	can.find("div").css("position","absolute");
	var itemNum = can.children().length,
		num = itemNum - 1,
		n = parseInt(itemNum*Math.random()),
		smW = (bigW - itemW)/num,
		left;
	for(r_i=1;r_i<itemNum;r_i++){
		if(r_i<=n){
			left = r_i * smW;
		}else{
			left = (r_i - 1)*smW + itemW;
		}
		can.children().eq(r_i).css("left",left);
	}
}
//图片展示2-end

function tripCreate(){
	var title = $("#title").val(),
		startDate = $("#startDate").val();
	$.ajax({
		url : "/trip/validate",
		type : "post",
		data : {
			title : title,
			stratDate : startDate
		},
		success : function(data){
			var data = eval("(" + data + ")");
			state = data.state;
			if(state == 0){
				type = data.type;
				error = data.error;
				errorMsg = "<span id='"+type+"errorMsg' class='loginError'>" + error + "</span>";
				$("#titleerrorMsg").remove();
				$("#stratDateerrorMsg").remove();
				if(type == "title"){
					$("#title").after(errorMsg);
				}
				if(type == "stratDate"){
					$("#startDate").after(errorMsg);
				}
			}
			if(state == 1){
				$("form").submit();
			}
		},
		error : function(){
			$.ubdialog({
				type: "text",
				title: "消息提示",
				content: "创建行程计划失败，请联系网站管理员！",
				align: "center"
			});
		}
	});
}
function Event(e){
	var oEvent = document.all ? window.event : e;
	if (document.all) {
		if(oEvent.type == "mouseout") {
			oEvent.relatedTarget = oEvent.toElement;
		}else if(oEvent.type == "mouseover") {
			oEvent.relatedTarget = oEvent.fromElement;
		}
	}
	return oEvent;
}
function addEventHandler(oTarget, sEventType, fnHandler) {
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEventType, fnHandler, false);
	} else if (oTarget.attachEvent) {
		oTarget.attachEvent("on" + sEventType, fnHandler);
	} else {
		oTarget["on" + sEventType] = fnHandler;
	}
};
function tripCustom(){
	var title = $("#title").val(),
		startDate = $("#startDate").val();
	$.ajax({
		url : "/trip/validate",
		type : "post",
		data : {
			title : title,
			stratDate : startDate
		},
		success : function(data){
			var data = eval("(" + data + ")");
			state = data.state;
			if(state == 0){
				type = data.type;
				error = data.error;
				errorMsg = "<span id='"+type+"errorMsg' class='loginError'>" + error + "</span>";
				$("#titleerrorMsg").remove();
				$("#stratDateerrorMsg").remove();
				if(type == "title"){
					$("#title").after(errorMsg);
				}
				if(type == "stratDate"){
					$("#startDate").after(errorMsg);
				}
			}
			if(state == 1){
				$("form").submit();
			}
		},
		error : function(){
			$.ubdialog({
				type: "text",
				title: "消息提示",
				content: "创建行程计划失败，请联系网站管理员！",
				align: "center"
			});
		}
	});
}
function tripHelp(){
	var title = $("#title").val(),
	startDate = $("#startDate").val();
$.ajax({
	url : "/trip/validate",
	type : "post",
	data : {
		title : title,
		stratDate : startDate
	},
	success : function(data){
		var data = eval("(" + data + ")");
		state = data.state;
		if(state == 0){
			type = data.type;
			error = data.error;
			errorMsg = "<span id='"+type+"errorMsg' class='loginError'>" + error + "</span>";
			$("#titleerrorMsg").remove();
			$("#stratDateerrorMsg").remove();
			if(type == "title"){
				$("#title").after(errorMsg);
			}
			if(type == "stratDate"){
				$("#startDate").after(errorMsg);
			}
		}
		if(state == 1){
			$("form").submit();
		}
	},
	error : function(){
		$.ubdialog({
			type: "text",
			title: "消息提示",
			content: "创建行程计划失败，请联系网站管理员！",
			align: "center"
		});
	}
});
}
function checkEmail(a){
	var email = $(a).val();
	if(email == ""){
		return; 
	}
	$.ajax({
		url : "/user/checkEmail",
		type : "post",
		data : {
			email: email
		},
		success : function(data){
			var data = eval("(" + data + ")");
			state = data.state;
			$(".loginError").remove();
			$(".ele_ok").remove();
			if(state == 0){
				var error = data.error,
					errorMsg = "<span class='loginError'><span class='ele_error pull-left' style='margin-top:3px;'></span>" + error + "</span>";
				$("#email").after(errorMsg);
			}
			if(state == 1){
				var msg = "<span class='ele_ok pull-left' style='margin-top:8px;'></span>";
				$("#email").parent().after(msg);
			}
		}				
	});
}
function checkPhone(a){
	var phone = $(a).val();
	if(phone == ""){
		return; 
	}
	$.ajax({
		url : "/user/checkPhone",
		type : "post",
		data : {
			phone: phone
		},
		success : function(data){
			var data = eval("(" + data + ")");
			state = data.state;
			$(".loginError").remove();
			$(".ele_ok").remove();
			if(state == 0){
				var error = data.error,
					errorMsg = "<span class='loginError'>" + error + "</span>";
				$("#phone").after(errorMsg);
				$("#getCaptcha").attr('disabled',true);
			}
			if(state == 1){
				var msg = "<span class='ele_ok pull-left' style='margin-top:8px;'></span>";
				$("#phone").parent().after(msg);
				$("#getCaptcha").attr('disabled',false);
			}
		}				
	});
}
function getValidate(btn){
	$(".loginError").remove();
	var phone = $("#phone").val();
	if(phone == ""){
		var errorMsg = "<span class='loginError'>请先填写手机号码</span>";
		$("#phone").after(errorMsg);
	}else{
		$.ajax({
			type : "post",
			url : "/user/sendCaptcha",
			data : {
				phone : phone
			},
			success : function(data){
				if(data == "fail"){
					$.ubalert({
						content:"获取验证码失败，请联系网站管理员",
						delay: 2000
					});
				}else{
					countDown(btn,"获取验证码");
				}
			},
			error : function(){
				$.ubalert({
					content:"获取验证码失败，请联系网站管理员",
					delay: 2000
				});
			}
		});
	}
}
function countDown(b,str){
	var s = 61;
	$(b).attr("disabled",true);
	function reduce(){
		s = s - 1;
		$(b).html("重新发送(" + s + ")");
		setTimeout(function(){
			if(s>0){
				reduce();
			}else{
				$(b).html(str).attr("disabled",false);
			}
		},1000);
	}
	return reduce();
}
function validatePhone(a){
	$(".loginError").remove();
	var captcha = $(a).val();
	var phone = $("#phone").val();
	if(captcha == ""){
		return; 
	}if(phone == ""){
		var errorMsg = "<span class='loginError'>请先填写手机号码</span>";
		$("#phone").after(errorMsg);
	}else{
		$.ajax({
			type : "post",
			url : "/user/checkCaptcha",
			data : {
				captcha : captcha,
				phone : phone
			},
			success : function(data){
				if(data == "fail"){
					$("#validate").after("<span class='loginError'>验证码错误</span>");
				}else if(data == "success"){
					$("#validate").after("<span class='loginError'>验证码正确</span>");
				}else{
					$.ubalert({
						content:"验证验证码失败，请联系网站管理员",
						delay: 2000
					});
				}
			},
			error : function(){
				$.ubalert({
					content:"验证验证码失败，请联系网站管理员",
					delay: 2000
				});
			}
		});
	}
}
function checkPassword(a){
	$(".loginError").remove();
	var psd = $(a).val();
	if(psd.length < 6 || psd.length > 16){
		errorMsg = "<span class='loginError'>密码长度为6至16位</span>";
		$("#password").after(errorMsg);
	}
}
function sendEmail(uid,a){
	var uid = uid;
	$.ajax({
		url : "/user/sendmail",
		type : "post",
		data : {
			uid : uid
		},
		success : function(data){
			if(data == "success"){
				countDown(a,"发送激活邮件");
			}else{
				$.ubalert({
					content:"您未绑定邮箱，请先绑定邮箱",
					delay: 2000
				});
			}
		},
		error : function(){
			$.ubalert({
				content:"发送邮件失败，请联系网站管理员",
				delay: 2000
			});
		}
	});
}
function checkAll(){
	var toptitle=$("#toptitle").val();
	var html = editor.html();
	$("#content").val(html);
	if(toptitle==""){
		$.ubalert({
			content:"标题不能为空!",
			delay: 2000
		});
		return false;
	}else if(toptitle.length>30){
		$.ubalert({
			content:"标题长度不能超过30个字!",
			delay: 2000
		});
		return false;
	}else if (html==""){
		$.ubalert({
			content:"内容不能为空!",
			delay: 2000
		});
		return false;
	}
	return true;
}
function logout(){
	$.ajax({
		url : "/user/logout",
		type : "get",
		async : false,
		success : function(data){
			if(data == "{1}"){
				location.reload();
			}else{
				$.ubdialog({
					type: "text",
					title: "消息提示",
					content: "请求失败，请稍后再尝试",
					align: "center"
				});
			}
		},
		error : function(){
			$.ubdialog({
				type: "text",
				title: "消息提示",
				content: "请求失败，请稍后再尝试",
				align: "center"
			});
		}
	});
}
function toLogin(a){
	var nextHref = $(a).attr("nextHref");
	$.ubdialog({
		type:'file',
		width:450,
		height:270,
		url:"/user/quicklogin",
		title:"登录天上西藏",
		param: {
			nextHref: nextHref
		}
	});
}
function loginClick(){
	var account = $(".quickEmail").val(),
		psd = $(".quickPsd").val();
	if(account != ""){
		$.ajax({
			url : "/user/getSalt",
			type : "post",
			async : false,
			data : {
				account : account
			},
			success : function(data){
				if(data != "{1}"){
					data = eval("(" + data + ")");
					salt = data.salt;
					random = data.random;
					$("#random").val(random);
					$("#salt").val(salt);
				}
			}
		});
	}
	var salt = $("#salt").val(),
		random = $("#random").val();
	var randomShaObj = new jsSHA(random,"TEXT");
	random = randomShaObj.getHash("SHA-512", "HEX");
	var shaObj = new jsSHA(psd+salt, "TEXT");
	var hashpsd = shaObj.getHash("SHA-512", "HEX");
	var hashpsdShaObj = new jsSHA(hashpsd+random, "TEXT");
	var hashpassword = hashpsdShaObj.getHash("SHA-512", "HEX");
	$.ajax({
		type: "post",
		url: "/user/auth",
		async : false,
		data: {
			account: account,
			password: hashpassword
		},
		success: function(data){
			$(".loginError").remove();
			if(data == "{1}"){
				var errorMsg = "<span class='loginError'>账号密码不正确</span>";
				$(".quickEmail").after(errorMsg);
			}else if(data == "{2}"){
				var errorMsg = "<span class='loginError'>该账号已被禁用</span>";
				$(".quickEmail").after(errorMsg);
			}else if(data == "{3}"){
				var errorMsg = "<span class='loginError'>该账号未激活</span>";
				$(".quickEmail").after(errorMsg);
			}else if(data == "{4}"){
				location.href = "/user/noname";
			}else{
				var href = myDiaParam.nextHref?myDiaParam.nextHref:location.href,
					w_index = href.indexOf("#"),
					href = w_index>-1?href.substring(0,w_index):href;
				location.href = href;
			}
		},
		error: function(){
			$.ubdialog({
				type: "text",
				title: "消息提示",
				content: "登录失败！",
				align: "center"
			});
		}
	});
}
function canleActivity(){
	var tid = $("#tid").val();
	$.ajax({
		url : "/trip/canleActivity",
		type : "post",
		data : {
			tid : tid
		},
		success : function(data){
			if(data == "success"){
				var href = location.href;
				var host = location.host;
				if(href.indexOf("/trip")>-1){
					location.reload();
				}else{
					location.href = "http://" + host + "/activity"
				}
			}
		},
		error : function(){
			$.ubalert({
				content:"撤销约伴出错，请联系网站管理员!",
				delay: 2000
			});
		}
	});
}
function saveActivity(a){
	var tid = $("#tid").val(),
		aid = $("#aid").val(),
		departCode = $("#activityCode").val(),
		planPerson = $("#planPerson").val(),
		description = $("#description").val(),
		criterion = $("#criterion").val(),
		attention = $("#attention").val(),
		disclaimer = $("#disclaimer").val(),
		a = $(a);
	if(departCode == ""){
		$("#activityerror").html("请选择出发地");
		return;
	}else if(planPerson == ""){
		$("#activityerror").html("请填写约伴上限");
		return;
	}else if(parseInt(planPerson) < 1){
		$("#activityerror").html("约伴上限不能少于两人");
		return;
	}else if(description == ""){
		$("#activityerror").html("请填写活动描述");
		return;
	}else if(criterion == ""){
		$("#activityerror").html("请填写加入标准");
		return;
	}else if(attention == ""){
		$("#activityerror").html("请填写注意事项");
		return;
	}else if(disclaimer == ""){
		$("#activityerror").html("请填写免责声明");
		return;
	}
	if(aid == ""){
		$.ajax({
			url : "/activity/save",
			type : "post",
			data : {
				tid : tid,
				departCode : departCode,
				planPerson : planPerson,
				description : description,
				criterion : criterion,
				attention : attention,
				disclaimer : disclaimer
			},
			success : function(data){
				if(data == "notrip"){
					$("#activityerror").html("您的旅行计划没有任何内容，不能发起约伴");
				}else{
					$.closeDia();
					location.reload();
				}
			}
		});
	}else{
		$.ajax({
			url : "/activity/update",
			type : "post",
			data : {
				aid : aid,
				tid : tid,
				departCode : departCode,
				planPerson : planPerson,
				description : description,
				criterion : criterion,
				attention : attention,
				disclaimer : disclaimer
			},
			success : function(data){
				if(data == "notrip"){
					$("#activityerror").html(data);
				}else{
					$.closeDia();
					location.reload();
				}
			}
		});
	}
}
function approve(id){
	var uid = id,
		id = $("#aid").val();
	$.ajax({
		url : "/activity/approve",
		type : "post",
		data : {
			id : id,
			uid : uid
		},
		success : function(data){
			if(data == "success"){
				location.reload();
			}
		},
		error : function(){
			$.ubalert({
				content:"通过申请出错，请联系网站管理员!",
				delay: 2000
			});
		}
	});
}
function refuse(id){
	var uid = id,
		id = $("#aid").val();
	$.ajax({
		url : "/activity/refuse",
		type : "post",
		data : {
			id : id,
			uid : uid
		},
		success : function(data){
			if(data == "success"){
				location.reload();
			}
		},
		error : function(){
			$.ubalert({
				content:"拒绝申请出错，请联系网站管理员!",
				delay: 2000
			});
		}
	});
}
function kick(id){
	$.ubdialog({
		type: "confirm",
		content: "确定要将该成员移出活动吗？",
		fun: function(){
			var uid = id,
				id = $("#aid").val();
			$.ajax({
				url : "/activity/kick",
				type : "post",
				data : {
					id : id,
					uid : uid
				},
				success : function(data){
					if(data == "success"){
						location.reload();
					}
				},
				error : function(){
					$.ubalert({
						content:"移出活动出错，请联系网站管理员!",
						delay: 2000
					});
				}
			});
		}
	});
}
function delelteReview(id,type){
	$.ajax({
		url : "/review/delete/"+type,
		type : "post",
		data : {
			id : id
		},
		success : function(data){
			if(data == "1"){
				$("div[rid='"+ id +"']").remove();
				var comNum = parseInt($(".commentsNum .num").html()) - 1;
				$(".commentsNum .num").html(comNum);
			}else{
				$.ubalert({
					content:"非法请求",
					delay: 2000
				});
			}
		},
		error : function(){
			$.ubalert({
				content:"删除回复出错，请联系网站管理员!",
				delay: 2000
			});
		}
	});
}
function delelteReviewReply(id,tid,type){
	$.ajax({
		url : "/review/delete/reply/"+type,
		type : "post",
		data : {
			id : id,
			tid : tid
		},
		success : function(data){
			if(data == "1"){
				$("li[replyid='"+ id +"']").remove();
				var size = $("#reviewSize_"+tid).html();
				size = parseInt(size)-1;
				$("#reviewSize_"+tid).html(size);
			}else{
				$.ubalert({
					content:"非法请求",
					delay: 2000
				});
			}
		},
		error : function(){
			$.ubalert({
				content:"删除回复出错，请联系网站管理员!",
				delay: 2000
			});
		}
	});
}
function deleteReply(id,type){
	$.ajax({
		url : "/comment/delete/"+type,
		type : "post",
		data : {
			id : id
		},
		success : function(data){
			if(data == "1"){
				$("div[tid='"+ id +"']").remove();
			}else{
				$.ubalert({
					content:"非法请求",
					delay: 2000
				});
			}
		},
		error : function(){
			$.ubalert({
				content:"删除回复出错，请联系网站管理员!",
				delay: 2000
			});
		}
	});
}
function tripRename(){
	var name = $("#tripRename").val(),
	    id = $("#tid").val();
	if(name == ""){
		$("#tripRenameError").html("计划名称不能为空");
		return;
	}else if(name.length>30){
		$("#tripRenameError").html("计划名称不能超过30个字");
		return;
	}
	$.ajax({
		type: "post",
		url: "/trip/updateName",
		data : {
			name : name,
			id : id
		},
		success: function(data){
			if(data == "success"){
				$.closeDia();
				$(".tripTitle").html(name);
			}else{
				$.closeDia();
				$.ubalert({
					content: "重命名失败，请检查网络环境是否畅通！",
					delay: 2000
				});
			}
		},
		error: function(){
			$.closeDia();
			$.ubalert({
				content: "重命名失败，请检查网络环境是否畅通！",
				delay: 2000
			});
		}
	});
}
function review(btn){
	var textarea = $(btn).parent().parent().find(".reviewEdit");
	if(textarea.css("display") == "none"){
		textarea.show().find(".reviewText").focus();
	}
}
function repyltoreply(btn,rid){
	var username = $(btn).parent().find(".replyuname").html();
	var textarea = $(btn).parent().parent().parent().parent().find(".reviewEdit");
	if(textarea.css("display") == "none"){
		textarea.show().find(".reviewText").focus().val("回复 "+username+"：");
	}
}
function subRev(b){
	var t = $(b),
		content = t.parent().parent().find(".reviewText").val(),
		tid = t.attr("tid");
	if(content == ""){
		t.parent().find(".replyError").html("");
		t.parent().find(".replyError").html("评论的内容不能为空");
		return;
	}
	$.ajax({
		url : "/review/reply/attraction",
		type : "post",
		data : {
			content : content,
			tid : tid
		},
		success : function(data){
			data = eval("(" + data + ")");
			$('#replyTemplate').tmpl(data).insertBefore('#def_'+tid);
			t.parent().parent().find(".reviewText").val("");
			t.parent().parent().hide();
			var size = $("#reviewSize_"+tid).html();
			size = parseInt(size)+1;
			$("#reviewSize_"+tid).html(size);
		},
		error : function(){
			$.ubalert({
				content:"回复出错，请联系网站管理员!",
				delay: 2000
			});
		}
	});
}
function canRev(b){
	$(b).parent().parent().hide();
}
//dialog-start
(function(){
	$.fn.mydialog = function(options){
		var t = $(this);
		var dialog = function(){
			t.click(function(){
				var diaW = options.width||500,
					diaH = options.height||400,
					url = options.url,
					title = options.title||"",
					type = options.type;
				myDiaParam = options.param||{};
				var diaTop = "<div class='diaTop'><div class='diaTitle'><span class='pull-left'>" + title + "</span>"
					+"<span class='closeDia pull-right'></span></div></div>",
				diaCon = "<div class='diaCon'><div class='diaForm'></div></div>";
				dialog = "<div class='diaDiv'>" + diaTop + diaCon + "</div>",
				diaBg = "<div class='diaBg'></div>",
				doH = $(document).height();
				$("body").append(dialog + diaBg);
				if(type != "text"){
					$(".diaDiv").width(diaW).height(diaH);
				}
				
				if(type != "confirm" && type != "text"){
					$(".diaCon").height($(".diaDiv").height() - $(".diaTop").height());
				}
				$(".diaBg").height(doH);
				$(".closeDia").click(function(){
					$(".diaDiv,.diaBg").remove();
				});
				if(type == "file"){
					$.ajax({
						type: "get",
						url: url,
						success: function(data){
							$(".diaForm").html(data);
						}
					});
				}else if(type == "file_ky"){
					$.ajax({
						type: "get",
						url: url,
						dataType: "jsonp",
						success: function(data){
							var html = data.html;
							$(".diaForm").html(html);
						}
					});
				}else if(type == "text"){
					var txt = options.content,
						align = options.align||"left",
						textAlign = " text-align:" + align + ";",
						btn = "<button type='button' class='btn btn-primary text_ok'>确定</button>",
						html = "<div class='txtDiv' style='padding:20px;min-width:200px;max-width:500px;" + textAlign + "'><p style='font-size:14px;word-break: break-all;'>" + txt + "</p></div>" + "<div  class='btnDiv' style='text-align:center;'>" + btn + "</div>";
					$(".diaForm").html(html);
					$(".diaDiv .text_ok").click(function(){
						$(".diaDiv,.diaBg").remove();
					});
				}else if(type == "confirm"){
					var txt = options.content,
						ok_btn = "<button class='btn btn-primary btn_ok' style='margin:0 10px;background:#46c2d8;'>确定</button>",
						cancel_btn = "<button class='btn btn-primary btn_cancel' style='margin:0 10px;background:#46c2d8;'>取消</button>",
						html = "<div class='txtDiv' style='min-width:200px;'><p style='font-size:16px;word-break: break-all;'>" + txt + "</p></div>" + "<div  class='btnDiv' style='text-align:center;position:absolute;bottom:0;'>" + ok_btn + cancel_btn + "</div>";
					$(".diaForm").html(html);
					$(".diaDiv").width("auto").height("auto");
					$(".btnDiv").width($(".txtDiv").width());
					if(type != "confirm"){
						$(".diaCon").height($(".diaDiv").height() - $(".diaTop").height());
					}
					$(".diaForm").css({padding:"20px 50px 70px",position:"relative"});
					$(".btn_ok").click(function(){
						options.fun();
						$(".diaDiv,.diaBg").remove();
					});
					$(".btn_cancel").click(function(){
						$(".diaDiv,.diaBg").remove();
					});
				}
				setPos();
				function setPos(){
					var winW = $(window).width(),
						winH = $(window).height(),
						docTop = $(document).scrollTop();
					if(type == "text" || type == "confirm"){
						diaH = $(".diaDiv").height();
						diaW = $(".diaDiv").width();
					}
					var left = (winW - diaW)/2,
						top = (winH - diaH)/2 + docTop,
						pos = {left:left,top:top};
					$(".diaDiv").offset(pos);
				}
				$(window).resize(function(){
					setPos();
				});
			});
			
		}
		return dialog();
	}
	
	$.fn.closeDia = function(){
		$(".diaDiv,.diaBg").remove();
	}
	
	$.extend({
		ubdialog: function(options){
			var diaW = options.width||500,
				diaH = options.height||400,
				url = options.url,
				title = options.title||"",
				type = options.type;
			myDiaParam = options.param||{};
			var diaTop = "<div class='diaTop'><div class='diaTitle'><span class='pull-left'>" + title + "</span>"
				+"<span class='closeDia pull-right'></span></div></div>",
			diaCon = "<div class='diaCon'><div class='diaForm'></div></div>";
			dialog = "<div class='diaDiv'>" + diaTop + diaCon + "</div>",
			diaBg = "<div class='diaBg'></div>",
			doH = $(document).height();
			$("body").append(dialog + diaBg);
			if(type != "text"){
				$(".diaDiv").width(diaW).height(diaH);
			}
			
			if(type != "confirm" && type != "text"){
				$(".diaCon").height($(".diaDiv").height() - $(".diaTop").height());
			}
			$(".diaBg").height(doH);
			$(".closeDia").click(function(){
				$(".diaDiv,.diaBg").remove();
			});
			if(type == "file"){
				$.ajax({
					type: "get",
					url: url,
					success: function(data){
						$(".diaForm").html(data);
					}
				});
			}else if(type == "file_ky"){
				$.ajax({
					type: "get",
					url: url,
					dataType: "jsonp",
					success: function(data){
						var html = data.html;
						$(".diaForm").html(html);
					}
				});
			}else if(type == "text"){
				var txt = options.content,
					align = options.align||"left",
					textAlign = " text-align:" + align + ";",
					btn = "<button type='button' class='btn btn-primary text_ok'>确定</button>",
					html = "<div class='txtDiv' style='padding:20px;min-width:200px;max-width:500px;" + textAlign + "'><p style='font-size:14px;word-break: break-all;'>" + txt + "</p></div>" + "<div  class='btnDiv' style='text-align:center;'>" + btn + "</div>";
				$(".diaForm").html(html);
				$(".diaDiv .text_ok").click(function(){
					$(".diaDiv,.diaBg").remove();
				});
			}else if(type == "confirm"){
				var txt = options.content,
					ok_btn = "<button class='btn btn-primary btn_ok' style='margin:0 10px;background:#46c2d8;'>确定</button>",
					cancel_btn = "<button class='btn btn-primary btn_cancel' style='margin:0 10px;background:#46c2d8;'>取消</button>",
					html = "<div class='txtDiv' style='min-width:200px;'><p style='font-size:16px;word-break: break-all;'>" + txt + "</p></div>" + "<div  class='btnDiv' style='text-align:center;position:absolute;bottom:0;'>" + ok_btn + cancel_btn + "</div>";
				$(".diaForm").html(html);
				$(".diaDiv").width("auto").height("auto");
				$(".btnDiv").width($(".txtDiv").width());
				$(".diaForm").css({padding:"20px 50px 70px",position:"relative"});
				$(".btn_ok").click(function(){
					options.fun();
					$(".diaDiv,.diaBg").remove();
				});
				$(".btn_cancel").click(function(){
					$(".diaDiv,.diaBg").remove();
				});
			}
			setPos();
			function setPos(){
				var winW = $(window).width(),
					winH = $(window).height(),
					docTop = $(document).scrollTop();
				if(type == "text" || type == "confirm"){
					diaH = $(".diaDiv").height();
					diaW = $(".diaDiv").width();
				}
				var left = (winW - diaW)/2,
					top = (winH - diaH)/2 + docTop,
					pos = {left:left,top:top};
				$(".diaDiv").offset(pos);
			}
			$(window).resize(function(){
				setPos();
			});
		},
		ubalert: function(options){
			var content = options.content||"",
				delay = parseInt(options.delay)||0;
			var alertTop = "<div class='alertTop text-right' style='padding:5px;'><a class='alertClose' style='cursor:pointer;'>关闭</a></div>",
				alertCon = "<div class='alertCon' style='padding:20px 30px 30px;min-width:150px;min-height:70px;'>" + content + "</div>",
				alertDiv = "<div class='alertDiv' style='background:#FBFBEF;position:absolute;border:1px solid #F2F5A9;'>" + alertTop + alertCon + "</div>";
			$("body").append(alertDiv);
			setAlertPos();
			$(".alertClose").click(function(){
				$(".alertDiv").remove();
			});
			$(window).resize(function(){
				setAlertPos();
			});
			if(delay != 0){
				setTimeout(function(){
					$(".alertDiv").remove();
				},delay);
			}
			function setAlertPos(){
				var alertW = $(".alertDiv").width(),
					alertH = $(".alertDiv").height(),
					winW = $(window).width(),
					winH = $(window).height(),
					docTop = $(document).scrollTop(),
					left = (winW - alertW)/2,
					top = (winH - alertH)/2 + docTop,
					pos = {left:left,top:top};
				$(".alertDiv").offset(pos);
			}
		},
		closeDia: function(){
			$(".diaDiv,.diaBg").remove();
		}
	});
})(jQuery);
//dialog-end
//placeholder for IE-start
;(function ($) {
    $.fn.extend({
        placeholder : function () {
            if ("placeholder" in document.createElement("input")) {
                return this //如果原生支持placeholder属性，则返回对象本身
            } else {
                return this.each(function () {
                    var _this = $(this);
					if (_this.val().length === 0){
						_this.addClass("ept").val(_this.attr("placeholder"));
					}
                    _this.focus(function () {
						_this.removeClass("ept");
                        if (_this.val() === _this.attr("placeholder")) {
                            _this.val("")
                        }
                    }).blur(function () {
                        if (_this.val().length === 0) {
							_this.addClass("ept");
                            _this.val(_this.attr("placeholder"))
                        }
                    });
                })
            }
        }
    })
})(jQuery);
//placeholder for IE-end
$(document).ready(function() {
	$(".navItem").mouseover(function() {
		$(this).addClass("on");
	}).mouseout(function() {
		$(this).removeClass("on");
	});
	$("input[type='text']").placeholder();
	$(window).scroll(function(){
		if($(document).scrollTop() > 200){
			$(".toTop").show();
		}else{
			$(".toTop").hide();
		}
	});
});