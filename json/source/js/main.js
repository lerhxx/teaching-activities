/* 
 * 简易LightBox控件
 * @id LightBox
 * @param{Object} {
 * 		id{String} : 指定的lightboxId , 如果使用这种只需要配置一个id即可,调用需自行使用show方法
 * 		type{String} : alert/confirm/loading , 如果使用这种下面的参数都可以配置，默认会调用show方法
 * 		title{String} : 标题文字
 *		buttonStr{Array} : ['确定','取消'],
 * 		str{String} : 弹窗里面的文字
 * 		width{Int} : 宽度，默认300
 * 		height{Int} : 高度，默认自适应
 *      tipType(String): 提示类型，有success 和 error两种
 *      singleLine(Boolean): 是否只有单行文字
 * 		callbacks{Array} : 回调函数，默认空 [function,function,function,...]
 * }
 */
 _.templateSettings.variable = 'data';
 String.prototype.escapeHtml = function(isAttr){
    if(isAttr) return $('<div>').text(this).html().replace(/"/g, '&quot;');
    return $('<div>').text(this).html();
}
function LightBox(options){
	this.box = $('#win_box');
	this.cover = $('#win_cover');
	this.opts = this.setOptions(options);
	this.animateWait = null;
	this.init();
}
LightBox.prototype.setOptions = function(options){
	var defaults = {
		id : null,
		type : 'alert',
		title : '提示',
		buttonStr : ['确定','取消'],
		str : null,
		width : 360,
		height: 'auto',
		showShut : true,
		callbacks : null,
		tipType: '',
		singleLine: true,
		boxClass: '',
		mask: true,
		autoPos: true
	}
	var opts = $.extend(defaults, options);
	if(opts.id){
		this.box = $('#' + opts.id);
	}
	opts.cid = Math.random().toString().substr(2);
	return opts;
}
LightBox.prototype.setHtml = function(){
	var opts = this.opts;
	/* 16-05-12 by zwb -START-*/
	// 方便自定义样式
	this.box.removeClass();
	this.box.addClass('win_box').addClass(opts.boxClass);
	/* 16-05-12 by zwb -END- */
	
	this.box.find('.win_content').attr('class', 'win_content '+opts.tipType);
	if(opts.singleLine){
		this.box.find('.win_content').addClass('single-line');
	} else {
		this.box.find('.win_content').removeClass('single-line');
	}
	this.box.find('.win_content .content_txt').html(opts.str);
	this.box.find('.win_title').html(opts.title);
	this.box.find('.confirm').html(opts.buttonStr[0]);
	this.box.find('.cancel').html(opts.buttonStr[1]);
}
LightBox.prototype.setStyle = function(){
	var opts = this.opts;
	var winWidth = $(window).width();
	var winHeight = $(document).height();
	var winSeeHeight = $(window).height();
	if(!opts.id){
		this.box.find('.win_shut, .win_bottom a').hide();
		switch(opts.type){
			case 'alert' : 
				this.box.find('.win_bottom a.confirm').show();
				break;
			case 'confirm' : 
				this.box.find('.win_bottom a').show();
				break;
			case 'loading' : 
				break;
		}
		if(opts.showShut){
			this.box.find('.win_shut').show().attr('cid', opts.cid);
		}else{
			this.box.find('.win_shut').hide().attr('cid', opts.cid);
		}
		this.box.css({
			'height': opts.height,
			'width': opts.width,
			'left': (winWidth - (opts.width=='auto'?this.box.outerWidth():opts.width))/2,
			'top': (winSeeHeight - this.box.outerHeight())/2 + $(window).scrollTop()
		});
	}else{
		try {
			this.box.find('.win_shut').eq(0).attr('cid', opts.cid);
		} catch(e) {}
		if (this.opts.autoPos) {
			this.box.css({
				'left': (winWidth - this.box.outerWidth())/2,
				'top': (winSeeHeight - this.box.outerHeight())/2 + $(window).scrollTop()
			});
		}
	}
	this.cover.css('height',winHeight);
}
LightBox.prototype.setEvent = function(){
	var _this = this;
	this.box.find('.win_shut').click(function(){
		if (_this.opts.cid !== $(this).attr('cid')) {
			return;
		}
		_this.shut();
		$(window).trigger('winClosed:' + _this.opts.cid);
		return false;
	});
	if(!this.opts.id){
		this.box.find('.confirm').off().on('click',function(){
			if(_this.opts.callbacks && _this.opts.callbacks[0]){
				_this.opts.callbacks[0]();
			}
			_this.shut();
			return false;
		});
		this.box.find('.cancel').off().on('click',function(){
			if(_this.opts.callbacks && _this.opts.callbacks[1]){
				_this.opts.callbacks[1]();
			}
			_this.shut();
			return false;
		});
	}
}
LightBox.prototype.scrollEvent = function(event){
	var _this = event.data;
	_this.animate();
}
LightBox.prototype.resizeEvent = function(event){
	var _this = event.data;
	_this.animate();
}
LightBox.prototype.animate = function(){
	var _this = this;
	if (!this.opts.autoPos) {
		return;
	}
	clearTimeout(this.animateWait);
	_this.cover.css('height',$(document).height());
	this.animateWait = setTimeout(function(){
		_this.box.stop().animate({
			'top' : ($(window).height() - _this.box.outerHeight())/2 + $(window).scrollTop(),
			'left' : ($(window).width() - _this.box.outerWidth())/2 + $(window).scrollLeft()
		},300);
	},0);
}
LightBox.prototype.show = function(){
	if(!this.opts.id){ this.setHtml(); }
	this.setStyle();
	this.opts.mask && this.cover.show();
	this.box.show().addClass('win_box_show');
	$(window).bind('scroll', this, this.scrollEvent);
	$(window).bind('resize', this, this.resizeEvent);
}
LightBox.prototype.shut = function(){
	var _this = this;
	var nowWin = $('.win_box_show').length;
	// if(nowWin == 1){
		$(window).unbind('scroll',this.scrollEvent);
		$(window).unbind('resize',this.resizeEvent);
		this.cover.hide();
	// }
	this.box.hide().removeClass('win_box_show');
}
LightBox.prototype.init = function(){
	if(!this.opts.id){ this.setHtml(); this.show();}
	this.setEvent();
}
var isDebug = 0;
function setHostPash(testPagePash, testCgiPash, realCgiPash) {
    var path;
    if (window.location && window.location.href) {
        path = window.location.href;
    }
    if (path.indexOf('http://cc.163.com') == 0) {
        isDebug = 0;
    } else {
        isDebug = 1;
    }
}
setHostPash();
var task_utils = {
	chnUnitSection:["","万","亿","万亿","亿亿"],
	chnUnitChar:["","十","百","千"],
	NumberToChinese:function(num){
		  var unitPos = 0;
		  var strIns = '', chnStr = '';
		  var needZero = false;
		 
		  if(num === 0){
		    return this.chnNumChar[0];
		  }
		 
		  while(num > 0){
		    var section = num % 10000;
		    if(needZero){
		      chnStr = this.chnNumChar[0] + chnStr;
		    }
		    strIns = this.SectionToChinese(section);
		    strIns += (section !== 0) ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
		    chnStr = strIns + chnStr;
		    needZero = (section < 1000) && (section > 0);
		    num = Math.floor(num / 10000);
		    unitPos++;
		  }
		 
		  return chnStr;
	},
	SectionToChinese:function(section){
	  var strIns = '', chnStr = '';
	  var unitPos = 0;
	  var zero = true;
	  while(section > 0){
	    var v = section % 10;
	    if(v === 0){
	      if(!zero){
	        zero = true;
	        chnStr = this.chnNumChar[v] + chnStr;
	      }
	    }else{
	      zero = false;
	      strIns = this.chnNumChar[v];
	      strIns += this.chnUnitChar[unitPos];
	      chnStr = strIns + chnStr;
	    }
	    unitPos++;
	    section = Math.floor(section / 10);
	  }
	  return chnStr;
	},
	chnNumChar:["一","二","三","四","五","六","七","八","九","十"]
	,
	//显示指定时间的日月小时
	getTargetDateString:function(time)
	{
		//加一秒钟
		var objD = new Date((time+1)*1000);
		var str = '';  
	    var MM = objD.getMonth()+1;  
	    var dd = objD.getDate();   
	    var hh = objD.getHours();   
	    var mm = objD.getMinutes();   
	    var ss = objD.getSeconds();  

		str+=MM+"月";
		str+=dd+"日";
		str+=hh+"点";
		return str;
	},
	//判断当前时间的合法性，-1,未到时间，0，当前时间在区间内，1，过时
	getTimeStatsu:function(_start,_end){
		var cur = parseInt(new Date().getTime()/1000);
		if (cur>=_start&&cur<=_end)
		{
			return 0;
		} else if (cur<_start){
			return -1;
		} else {
			return 1;
		}
	},
	getShortCutTitle:function(str)
	{
		return str.escapeHtml(true);
	}
}
var userApi = {
	// isLogin:false,//是否已登录
	//TODO
	isLogin: true,
	isPermission:true,//是否有权限,需要白名单判断，测试为true
	userInfo: null,
	provinces: null,
	isShare: false,
	mobileIsLogin: false,
	userTaskInfo:null,//用户数据缓存
	showLogin: function(){
		if("object" == typeof ccapi && ccapi && typeof ccapi.getUserStatus == 'function' && config.from == 'mobilecc'){
	        ccapi.showLoginView({
	            complete: function(res) {
	            	
	            }
	        });
		} else {
			webccLogin.showLogin();
			$('._common-login_ .close').attr('href','javascript:;');
		}
	},
	/*获取玩家的uid*/
	getUid:function(){
		//测试用uid
		//return 20077617;
		if (!userApi.userInfo||!userApi.userInfo.uid)
		{
			return config.uid||0;
		}
		return userApi.userInfo.uid;
	},
	/*提示登录*/
	showLoginWin:function(){
		new LightBox({
    	    'type': 'confirm',
    	    'str': '请登录查看户外任务',
    	    'buttonStr': ['立即登录', '取消'],
    	    'callbacks': [function() {
    	        webccLogin.showLogin();
    	    }]
    	});
	},
	loginInit: function(){
		if("object" == typeof ccapi && ccapi && typeof ccapi.getUserStatus == 'function' && config.from == 'mobilecc'){
			ccapi.config({
			    debug: false 
			});
			ccapi.ready();
			userApi.mobileLoginInit();
			$('.login-out-wrap').remove();
			setTimeout(function(){
				if(!userApi.mobileIsLogin){
		        	userApi.showLoginWin();
		        	$('.un-login').show();
		        	$('.is-logined').hide();
		        	if(config.uid){
		        		userApi.getUserData(config.uid);
		        	} else {
		        		pageApi.setRole('unLogin');
		        	}
	        		webccLogin.init({
	        	    	loginCb: function () {
	        	    		console.log("loginCb");
	        	    		window.location.reload();
	        	    	}
	        	    });
	        	    webccLogin.flash.login();
	        	    if(config.module == 'mobile'){
	        	    	$('.mobile-un-tcp-tip').show();
	        	    }
				}
			},2000);
			return;
		}

		if(webccLogin.getUser && typeof(webccLogin.getUser)=='function'){
			userApi.userInfo = webccLogin.getUser();
			if(userApi.userInfo && userApi.userInfo.uinfo){
				userApi.userInfo = userApi.userInfo.uinfo;
			}
		}
		if(!userApi.userInfo){
			userApi.showLoginWin();
			$('.un-login').show();
			$('.is-logined').hide();
			if(config.uid){
				userApi.getUserData(config.uid);
			} else {
				pageApi.setRole('unLogin');
			}
		} else {
			$('.un-login').hide();
			$('.is-logined').show();
			$('.my-photo').attr('src', userApi.userInfo.purl);
			$('.my-name').text(userApi.userInfo.nickname).attr('title',userApi.userInfo.nickname);
			userApi.getUserData();
			userApi.isLogin = true;
		}
		webccLogin.init({
	    	loginCb: function () {
	    		/*$('._common-login_').hide();
	    		if(webccLogin.getUser && typeof(webccLogin.getUser)=='function'){
	    			userApi.userInfo = webccLogin.getUser();
	    			if(userApi.userInfo && userApi.userInfo.uinfo){
	    				userApi.userInfo = userApi.userInfo.uinfo;
	    				$('.un-login').hide();
	    				$('.is-logined').show();
	    				$('.my-photo').attr('src', userApi.userInfo.purl);
	    				$('.my-name').text(userApi.userInfo.nickname).attr('title',userApi.userInfo.nickname);
						userApi.getUserData();
	    			}
	    		}*/
	    		console.log("loginCb");
	    		window.location.reload();
	    	}
	    });
	    webccLogin.flash.login();
	    if(config.module == 'mobile'){
	    	$('.mobile-un-tcp-tip').show();
	    }
	},
	mobileLoginInit: function(){
		ccapi.getUserStatus({
		    complete: function(res){
		    	userApi.mobileIsLogin = true;
		        if(res.code){
		        	$('.un-login').hide();
		        	$('.is-logined').show();
		        	$('.my-photo').attr('src', ccSubjectUI.getUserLogo(res.data.purl,res.data.ptype));
		        	$('.my-name').text(res.data.nickname).attr('title',res.data.nickname);
		        	userApi.userInfo = res.data;
		        	userApi.getUserData();
		        } else {
		        	userApi.showLoginWin();
		        	$('.un-login').show();
		        	$('.is-logined').hide();
		        	if(config.uid){
		        		userApi.getUserData(config.uid);
		        	} else {
		        		pageApi.setRole('unLogin');
		        		pageApi.initPage();
		        	}
		        }
		    }
		});
	},
	/*更新用户数据*/
	getUserInfoUpdate:function(norefresh){
		var uid = userApi.getUid();
		if(isDebug){
			url = 'http://192.168.229.171:55409/gamemarchoutdoor/get_outdoor_info?uid='+uid;
		} else {
			url = 'http://game.api.cc.163.com/gamemarchoutdoor/get_outdoor_info?uid='+uid;
		}
		ccSubjectUI.getData(url).then(function(data){
			var info;
			if(data.code === 0){
				info = data;
				if (info.hasOwnProperty("projectid")){
					taskApi.selectProjectid = info.projectid;
				} 
				userApi.setInfo(info);
				//console.log(info);
				if(!norefresh){
					taskApi.initTaskRender();
				}
			}
		})
	},
	/*判断是否有资格选择，是否晋级*/
	judgeIsPromotion:function(stageid){
		if (userApi.userTaskInfo.is_anchor_out.hasOwnProperty(stageid)){
			if (userApi.userTaskInfo.is_anchor_out[stageid]==1){
				return false;
			} else {
				return true;
			}
			return false;
		}
		return false;
	},
	/*判断是否是户外主播*/
	judgeIsOutTaskAnchor:function(){
		if (userApi.isPermission==false){
			new LightBox({
			    'type': 'alert',
			    'title' : '提示',
			    'tipType': 'error',
			    'str': '亲，户外组的主播才能上传图片哦～',
			    'buttonStr' : ['知道了'],
			    'callbacks': [function() {
			    }]
			});
			return false;
		}
		return true;
	},
	//获取主播户外信息
	getUserData: function(uid){
		var url = '';
		if(!uid){
			// uid = userApi.getUid();
			//TODO
			//删
			uid = 20074006;
		}
		if(isDebug){
			url = 'http://192.168.229.171:55409/gamemarchoutdoor/get_outdoor_info?uid='+uid;
		} else {
			url = 'http://game.api.cc.163.com/gamemarchoutdoor/get_outdoor_info?uid='+uid;
		}
		ccSubjectUI.getData(url).then(function(data){
			var info;
			if(data.code === 0){
				info = data;
				console.log(data)
				if (info.projectid>0){

				}
				userApi.setInfo(info);
				console.log(info);
			}
		})
	},
	//设置主播户外信息，所有任务的完成状态
	setInfo: function(info){
		userApi.userTaskInfo = info;
		userApi.isPermission = userApi.userTaskInfo.group==3;
		//记得删除！！
		//userApi.userTaskInfo.stage= 2;
	}
}
$(document).ready(function() {
	userApi.loginInit();
	taskApi.getConfig();
	pageApi.clientH = $(window).height();
    pageApi.clientW = $(window).width();
    pageApi.initPage();
    loader_utils.creat();
	move(".shineClz", "0.05");
	//taskApi.initTaskRender();
})
var pageApi = {
	indexPage: 0,
	clientH: 0,
	clientW: 0,
	init: false,
	initPage: function(){
		if(!pageApi.init){
			pageApi.initEvent();
			pageApi.init = true;
		}
	},
	/*显示当前阶段的标题*/
	initStageTitle:function(){
		if (taskApi.stage==null||taskApi.stage==0||taskApi.stage==1)
		{
			$(".active-step").addClass("active-step-one");
		} else {
			$(".active-step").addClass("active-step-two");
		}
	},
	initEvent: function(){
		//$(window).resize(pageApi.initPage);	
		$(window).resize(pageApi.resizeHandle);
	},
	initPageNav:function(){
		$('.nav-item').click(function(){
			pageApi.indexPage = $(this).index('.nav-item:visible');
			taskApi.selectTask = $(this).attr("_navid");
			pageApi.switchPage();
		});
		$(".btn-close").click(function(){
			$(".containt").hide();
		});
		pageApi.updateNavPos();
	},
	setRole: function( role ){
		var Page = $('.page'),
			NavItem = $('.nav-item');
			Page.show();
			NavItem.show();
			userApi.role = role;
			$('.page-nav-wrap').show();
	},
	switchIndex: function(direct){
		
		pageApi.switchPage();
	},
	switchPage: function(){
		//先获取数据，再显示上传界面
		userApi.getUserInfoUpdate();
	},
	resizeHandle:function(){
		if (window.innerHeight){
			pageApi.clientH = window.innerHeight; 
			pageApi.clientW = window.innerWidth; 
		} else if ((document.body) && (document.body.clientHeight)) {
			pageApi.clientH = document.body.clientHeight; 
			pageApi.clientW = document.body.clientWidth; 
		} if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) { 
			pageApi.clientH = document.documentElement.clientHeight; 
			pageApi.clientW = document.documentElement.clientWidth; 
		}
		pageApi.updateNavPos();

	},
	/*更新导航位置*/
	updateNavPos:function(){
		var navW = $('.page-nav-wrap').width();
		var tempW;
		if (pageApi.clientW>navW){
			tempW = -($('.page-nav-wrap').width()-pageApi.clientW/2)+"px";
			
		} else {
			tempW = -($('.page-nav-wrap').width())/2+"px";
		}

		var tempW2;
		if (pageApi.clientW>1920){
			tempW2 = -($('.intro-con').width()-pageApi.clientW/2) +  45+ "px";
			
		} else {
			tempW2 = "45px";
		}
		//console.log("width:"+pageApi.clientW+","+ navW +","+temp);
		$('.page-nav-wrap').css("margin-left", tempW);
		$(".intro-con").css("top", pageApi.clientH-262+"px");
		$(".intro-con").css("left", tempW2);
	},
	/*导航模板渲染*/
	pageRender:function(){
	   var template = _.template($('#page_nav_template').html());
	   var renderHtml;
	   var Boss = $('.page-nav-wrap');
	   //需要判断阶段

		renderHtml = template(taskApi.curStageConfig);
console.log(taskApi.curStageConfig)
		Boss.html(renderHtml);
	    pageApi.initPageNav();
	    pageApi.updateStatus();
	    $('.page-nav-wrap').show();
	},
	/*更新导航状态*/
	updateStatus:function(){
		if (taskApi.selectProjectid!=0)
		{
			$('.nav-item').removeClass("not-select").addClass("unselected");
			$('.nav-item[_navId="'+taskApi.selectTask+'"]').removeClass("unselected").addClass("selected");
		} else {
			$('.nav-item').addClass("not-select");
			$('.status-free-select').click(function(){
				var selectId = $('.nav-item.cur').attr("_navId");
				// var selectId = $(this).parent.parent.attr("_navId");
				//pageApi.indexPage = $(this).index('.nav-item:visible');
				
				if(userApi.judgeIsOutTaskAnchor()==false){
					return;
				}
				//弹出确认窗
				new LightBox({
				    'type': 'confirm',
				    'title' : '提示',
				    'tipType': 'error',
				    'str': '选择分类后无法更改。<br />是否确定选择?',
				    'buttonStr' : ['确定','取消'],
				    'callbacks': [function() {
				    	taskApi.selectTask = selectId;
				    	taskApi.selectMainTask();
				    }]
				});
			});
		}
	}
}

var taskApi = {
	isUploading:false,//是否在上传图片中
	uploader:null,
	selectTask:-1,//当前选择显示的主任务
	selectSubTask:-1,//当前选择的sub任务id
	selectId:'',//选择上传图片的容器的id
	selectStepId:-1,//三级任务的id
	selectProjectid:0,//用户选择要完成的任务
	uploading:false,//是否在上传中
	stage:-1,//当前的阶段，0-未开始,1-阶段1,2-复赛1,3-复赛2,4-复赛3,5-结束
	curStageConfig:null,//当前阶段的任务配置
	selectShowStageId:-1,//选择显示任务的阶段,
	mergeTaskData:null,//复赛阶段的合并数据
	selectStepId_temp:0,//三级任务的id缓存
	selectId_temp:0,//选择上传图片的容器的id缓存
	addUploadIteming:false,//正在初始化上传界面
	canShowItem:function(item) {
		if (item.hasClass("allow-select")) {
			return true;
		} else {
			//判断一下是否登录，未登录弹窗
			if(userApi.isLogin==false){
				userApi.showLoginWin();
			} else if(userApi.judgeIsOutTaskAnchor()==false){
				//不是户外主播
			} else {
				return true;
			}
			return false;
		}
	},

	init:function(){
		// taskApi.uploader.addButton($('.imgPickerBtn'));
		$('.step_con').bind('click', function() {
			var tempRoot = $(this);
			taskApi.selectSubTask = tempRoot.attr("_taskid");
			taskApi.selectShowStageId = tempRoot.attr("_stageId");
			//判断是否有登录
			console.log(userApi.isLogin)
			if (userApi.isLogin==false){
				userApi.showLoginWin();
				return;
			}
			//如果是户外主播，是否已经淘汰？
			if (userApi.userTaskInfo.group==3&&userApi.judgeIsPromotion(taskApi.selectShowStageId)==false)
			{
				//弹出提示，没有资格选择
				new LightBox({
				    'type': 'alert',
				    'title' : '提示',
				    'tipType': 'error',
				    'str': '亲，您没有晋级，不能选择任务',
				    'buttonStr' : ['知道了'],
				    'callbacks': [function() {
				    }]
				});
				return;
			}
			//是否户外主播
			if (userApi.judgeIsOutTaskAnchor()==false)
			{
				return;
			}
			//判断是否还没有选择大类任务，提醒选择
			if (taskApi.selectProjectid==0)
			{
				//弹出确认窗
				new LightBox({
				    'type': 'confirm',
				    'title' : '提示',
				    'tipType': 'error',
				    'str': '选择分类后无法更改。<br />是否确定选择?',
				    'buttonStr' : ['确定','取消'],
				    'callbacks': [function() {
				    	taskApi.selectMainTask();
				    }]
				});
				return;
			} else if (taskApi.selectProjectid != taskApi.selectTask)
			{
				//不是当前选中的任务，不处理
				return;
			}
			if (tempRoot.hasClass("active")) {
				//判断是不是户外主播，提示之
				if (!userApi.judgeIsOutTaskAnchor())
				{

				}
				return;
			}else if (taskApi.judgeTargetTaskTimeLimit(taskApi.selectShowStageId)==false){
				return;
			}else if (taskApi.canShowItem(tempRoot)){
				taskApi.addUploadItem();
				tempRoot.addClass("active").siblings().removeClass("active");
				//console.log("addClass active");
			}
		});

		$('.switch-btn').bind('click', function(e) {
			var tempRoot = $(this).parent().parent();
			if (tempRoot.hasClass("active")) {
				setTimeout(function(){
					tempRoot.removeClass("active");
				},100);
				//console.log("removeClass active");
			}else if (taskApi.canShowItem(tempRoot)){
				//taskApi.addUploadItem();
				//console.log("addClass active");
			}
		});

		webccLogin.init({
			loginCb: function() {
				console.log('loginCb');
				window.location.reload();
			}
		});

		taskApi.updateListener();
		taskApi.addImgListener();
	},

	/*添加图片上传按钮*/
	addPicBtn:function(){
		var len = loader_utils.btnArr.length;
		if (len>0){
			for(var i = 0;i<len;i++){
				var tempName = '#'+loader_utils.btnArr[i];
				taskApi.uploader.addButton({
				    id: tempName
				});
			}
		}
		// var len = loader_utils.btnArr.length;
		// if (len>0){
		// 	taskApi.uploader.addButton({
		// 		    id: '.my-img-picker'
		// 	});
		// }
	},
	/*添加需要显示的上传任务*/
	addUploadItem:function(){
		if (taskApi.addUploadIteming==true){
			return;
		}
		taskApi.addUploadIteming = true;
		//判断上传任务是否在审核状态
		var isAuditing = false;
		var curTask = {};
		loader_utils.btnArr=[];
		if (userApi.userTaskInfo.projectid==taskApi.selectTask)
		{
			var len = userApi.userTaskInfo.tasks.length;
			if (len>0){
				for(var i = 0;i<len;i++)
				{
					if (taskApi.selectSubTask == userApi.userTaskInfo.tasks[i].taskid&&userApi.userTaskInfo.stage==taskApi.selectShowStageId){
						curTask = userApi.userTaskInfo.tasks[i];
						if (curTask.items.length==4)
						{
							isAuditing = true;
						} else {
							isAuditing = false;
						}
						break;
					}
					
				}
			}
		}
		

		var template,renderHtml,configObj,stepItems,Boss,tempBoss;
		stepItems = $('.step_con');
		var len = stepItems.length;
		for(var i = 0;i<len;i++){
			$tempBoss = stepItems.eq(i);
			if ($tempBoss.attr("_taskid")==taskApi.selectSubTask&&$tempBoss.attr("_stageid")==taskApi.selectShowStageId)
			{
				Boss = $tempBoss.find(".upload_info");
				break;
			}
		}
		if (isAuditing){
			configObj = taskApi.getSubTaskConfig(taskApi.selectShowStageId,taskApi.selectTask,taskApi.selectSubTask);
			configObj.userInfo = curTask;
			template = _.template($('#status_auditing_template').html());
		} else {
			configObj = taskApi.getSubTaskConfig(taskApi.selectShowStageId,taskApi.selectTask,taskApi.selectSubTask);
			
			template = _.template($('#status_upload_template').html());
		}
		// if (userApi.isLogin)
		// {
		// 	configObj.canSelect = true;
		// } else {
		// 	configObj.canSelect = false;
		// }
		if (configObj==null){
			//数据获取出错
			return;
		}

	    renderHtml = template(configObj);
		Boss.html(renderHtml);
		taskApi.updateListener();
		taskApi.addImgListener();
		taskApi.addUploadIteming = false;
		setTimeout(taskApi.addPicBtn,500);
		//Boss.addClass("active").siblings().removeClass("active");
		
	},
	/*获取指定主任务的分支任务*/
	getSubTaskConfig:function(stageid,projectid,subtaskid)
	{
		var arr = task_config.config.projects[taskApi.getConfigArrindex(stageid)];
		var len = arr.length;
		for(var i = 0;i<len;i++){
			if (projectid == arr[i].projectid){
				var arr2 = arr[i].tasks;
				var len2 = arr2.length;
				for(var j = 0;j<len2;j++){
					if (subtaskid == arr2[j].taskid){
						return arr2[j];
					}
				}
				break;
			}
		}
		return null;
	},
	/*根据状态获取数据下标*/
	getConfigArrindex:function(index){
		if(index == 0||index==1)
		{
			return 0;
		} else if (index >= 5){
			return 3;
		} else {
			return index-1;
		}
	},
	/*更新侦听事件*/
	updateListener:function(){
		$('.submit-btn').bind('click', function(e) {
			if ($(this).hasClass("enable"))
			{
				return;
			}
			taskApi.submitTask();
		});
		$('.submit-btn-again').bind('click', function(e) {
			var len = userApi.userTaskInfo.tasks.length;
			if (len>0){
				for(var i = 0;i<len;i++)
				{
					if (taskApi.selectSubTask == userApi.userTaskInfo.tasks[i].taskid){
						userApi.userTaskInfo.tasks[i].taskid=-10;
						break;
					}
					
				}
			}
			$(".step_con.active").find(".step_item").removeClass("finish-upload");
			taskApi.addUploadItem();
			
		});

		$('.addphotobtn').bind('mouseover', function() {
			if (taskApi.isUploading){
				taskApi.selectId_temp = $(this).attr("id");
				taskApi.selectStepId_temp = $(this).attr("step_id");
				return
			};
			taskApi.selectId = $(this).attr("id");
			taskApi.selectStepId = $(this).attr("step_id");
		});

		$('.upload-btn').bind('mouseover', function() {
			if (taskApi.isUploading){
				taskApi.selectId_temp = $(this).attr("id");
				taskApi.selectStepId_temp = $(this).attr("step_id");
				return
			};
			taskApi.selectId = $(this).attr("id");
			taskApi.selectStepId = $(this).attr("step_id");
		});

		$('.re-upload-btn').bind('mouseover', function() {
			if (taskApi.isUploading){
				taskApi.selectId_temp = $(this).attr("id");
				taskApi.selectStepId_temp = $(this).attr("step_id");
				return
			};
			taskApi.selectId = $(this).attr("id");
			taskApi.selectStepId = $(this).attr("step_id");
		});
		
		$('.upload-btn').bind('click', function() {
			if (taskApi.isUploading){
				if(taskApi.selectStepId == $(this).parent().attr("step_id"))
				{
					return;
				}
				taskApi.uploadingNotice();
				return
			}
			taskApi.selectId = $(this).parent().attr("id");
		 	taskApi.selectStepId = $(this).parent().attr("step_id");
		 	console.log	("upload-btn click");
		});

		$('.re-upload-btn').bind('click', function() {
			if (taskApi.isUploading){
				if(taskApi.selectStepId == $(this).parent().parent().attr("step_id"))
				{
					return;
				}
				taskApi.uploadingNotice();
				return
			}
			taskApi.selectId = $(this).parent().parent().attr("id");
		 	taskApi.selectStepId = $(this).parent().parent().attr("step_id");
		 	console.log	("re-upload-btn click");
		});

		// $('.upload-btn').bind('click', function() {
		// 	if (taskApi.isUploading){
		// 		taskApi.uploadingNotice();
		// 		return
		// 	};
		// 	//时间不合法
		// 	if (taskApi.judgeTaskTimeLimit()==false)
		// 	{
		// 		return;
		// 	}
		// 	taskApi.setMyTaskImgById(taskApi.selectTask,taskApi.selectSubTask,taskApi.selectStepId,"");
		// 	taskApi.selectId = $(this).parent().attr("id");
		// 	taskApi.selectStepId = $(this).parent().attr("step_id");
		// 	var targetBoss = $('.fileList[id="'+taskApi.selectId+'"]').addClass("upload-state-loading");
		// 	console.log("select pick id:"+taskApi.selectId);
		// 	if(userApi.isLogin==false){
		// 		userApi.showLoginWin();
		// 	} else {
		// 		if ($(this).hasClass("upload-state-done"))
		// 		{
		// 			var link = $(this).attr('_img');
		// 		    var preload = $('<img src="'+link+'" alt="" class="memory-img">');
		// 		    $('body').append(preload);
		// 		    preload.load(function(){
		// 		    	var win = new LightBox({
		// 		    	    'type': 'loadding',
		// 		    	    'width': preload.width()+20,
		// 		    	    'boxClass': 'memory-win',
		// 		    	    'autoPos': true,
		// 		    	    'str': '<img src="'+link+'" alt="" class="memory-img"><div class="memory-desc"></div>'
		// 		    	});
		// 		    	preload.remove();
		// 		    })
		// 		} else {
		// 			 $('.webuploader-element-invisible').click();
		// 		}
		// 	}
		// });


		// //重新上传
		// $('.re-upload-btn').bind('click', function() {
		// 	if (taskApi.isUploading){
		// 		taskApi.uploadingNotice();
		// 		return
		// 	};
		// 	taskApi.setMyTaskImgById(taskApi.selectTask,taskApi.selectSubTask,taskApi.selectStepId,"");
		// 	taskApi.selectId = $(this).parent().parent().attr("id");
		// 	taskApi.selectStepId = $(this).parent().parent().attr("step_id");
		// 	var targetBoss = $('.fileList[id="'+taskApi.selectId+'"]');
		// 	if (targetBoss.hasClass("upload-state-done")||targetBoss.hasClass("upload-state-error"))
		// 	{
		// 		targetBoss.addClass("upload-state-loading");
		// 		console.log("可以重新上传");
		// 		 $('.webuploader-element-invisible').click();
		// 	}
		// });
	},
	/*侦听预览*/
	addImgListener:function(){
		$('.img-thumbnail').bind('click',function(e){
			var link = $(this).attr('_img');
			if (window.event) {
			  e.cancelBubble=true;// ie下阻止冒泡
			 } else {
			  e.preventDefault();
			  e.stopPropagation();// 其它浏览器下阻止冒泡
			 }
		    var preload = $('<img src="'+link+'" alt="" class="memory-img">');
		    $('body').append(preload);
		    preload.load(function(){
		    	var win = new LightBox({
		    	    'type': 'loadding',
		    	    'width': preload.width()+20,
		    	    'boxClass': 'memory-win',
		    	    'autoPos': true,
		    	    'str': '<img src="'+link+'" alt="" class="memory-img"><div class="memory-desc"></div>'
		    	});
		    	preload.remove();
		    })
		});
	},
	uploadingNotice:function(){
		new LightBox({
		    'type': 'alert',
		    'title' : '提示',
		    'tipType': 'error',
		    'str': '亲，文件上传中，请稍等～',
		    'buttonStr' : ['知道了'],
		    'callbacks': [function() {
		    }]
		});
	},
	/*任务模板渲染*/
	initTaskRender:function(){
		var template = _.template($('#task_list_template').html());
	    var renderHtml;

	    var taskLen = taskApi.curStageConfig.length;
	    console.log(taskApi.curStageConfig)
	    var Boss = $('.containt .task-info-con');
	    var configObj;
	   
	    if(taskApi.stage==null||taskApi.stage == 0||taskApi.stage == 1)
	    {
	    	 for(var i = 0;i<taskLen;i++)
		    {
		    	if (taskApi.selectTask == taskApi.curStageConfig[i].projectid)
		    	{
		    		configObj = taskApi.curStageConfig[i];
		    		//判断是否可以选择任务.如果已经提交完成设置css，upload-finish
		    		// if (userApi.isLogin)
		    		// {
		    		// 	configObj.canSelect = true;
		    		// } else {
		    		// 	configObj.canSelect = false;
		    		// }
		    		
		    		break;
		    	}
		    	
		    }
	    } else {
	    	//如果是复赛，需要合并数据
	    	configObj = taskApi.getFinalsConfig();
	    }
	    renderHtml = template(configObj);
		Boss.html(renderHtml);
		taskApi.init();
		taskApi.updateStatus();
		$(".containt").show();
	    
	},
	/*获取复赛的合并数据*/
	getFinalsConfig:function(){
		var curproject = taskApi.selectTask;
		var len = task_config.config.projects.length;
		var config = {"name":'',"projectid":'',tasks:[]};
		for(var i = 1;i<len;i++)
		{
			if (task_config.config.projects[i].length>0){
				var sebLen = task_config.config.projects[i].length;
				for(var j = 0;j<sebLen;j++){
					if (task_config.config.projects[i][j].projectid==curproject){
						config.name = task_config.config.projects[i][j].name;
						config.projectid = task_config.config.projects[i][j].projectid;
						var taskLen = task_config.config.projects[i][j].tasks.length;
						for(var k = 0;k<taskLen;k++){
							config.tasks.push(task_config.config.projects[i][j].tasks[k]);
						}
					}
				}
			}
		}
		return config;
	},
	//获取对应任务的图片地址
	getMyTaskImgById:function(mainId,subid,step)
	{
		if (my_task.hasOwnProperty(mainId))
		{
			if (my_task[mainId].hasOwnProperty(subid)){
				if (my_task[mainId][subid].hasOwnProperty(step)){
					return my_task[mainId][subid][step];
				} else {
					my_task[mainId][subid][step] = {};
					return "";
				}
			} else {
				my_task[mainId][subid] = {};
				return "";
			}
		} else {
			my_task[mainId] = {};
			return "";
		}
	},
	//存储我的任务对应的图片地址
	setMyTaskImgById:function(mainId,subid,step,val)
	{
		var old = taskApi.getMyTaskImgById(mainId,subid,step);
		if (old!=val)
		{
			if (my_task.hasOwnProperty(mainId))
			{
				if (my_task[mainId].hasOwnProperty(subid)){
					if (my_task[mainId][subid].hasOwnProperty(step)){
					} else {
						my_task[mainId][subid][step] = {};
					}
				} else {
					my_task[mainId][subid] = {};
				}
			} else {
				my_task[mainId] = {};
			}
			my_task[mainId][subid][step] = val;
		}
	},
	/*更新任务状态*/
	updateStatus:function(){
		if (taskApi.selectProjectid!=0)
		{
			$('.main_task').removeClass("not-select").addClass("unselected");
			$('.main_task[_mainTaskId="'+taskApi.selectProjectid+'"]').removeClass("unselected").addClass("selected");
		} else {
			$('.main_task').addClass("not-select");
		}
	},
	//更新当前任务完成状态，看是否能提交
	updateCurTaskStatus:function(){
		 var $li = $(".step_con.active");
         if ($li.find(".upload-state-done").length==4)
         {
         	$li.find(".submit-btn").removeClass("enable");
         	// $li.find(".step_item").addClass("finish-upload");
         } else {
         	$li.find(".submit-btn").removeClass("enable").addClass("enable");
         }
	},
	/*户外任务-获取配置信息*/
	getConfig: function(){
		 //pageApi.pageRender();
		var url = '';
		if(isDebug){
			url = 'http://192.168.229.171:55409/gamemarchoutdoor/get_outdoor_config';
		} else {
			url = 'http://game.api.cc.163.com/gamemarchoutdoor/get_outdoor_config';
		}
		ccSubjectUI.getData(url).then(function(data){
			if(data.code === 0){
				task_config = data;
				//增加下每个projectid的阶段码
				var len = task_config.config.projects.length;
				for(var i = 0;i<len;i++){
					var len2 = task_config.config.projects[i].length;
					if (len2>0){
						for(j = 0;j<len2;j++){
							var len3 = task_config.config.projects[i][j].tasks.length;
							for(k = 0;k<len3;k++){
								task_config.config.projects[i][j].tasks[k].stageId = i+1;
							}
						}
					}
				}
				taskApi.stage = task_config.stage;
				//记得删除！！
				//taskApi.stage = 2;
				pageApi.initStageTitle();
				taskApi.curStageConfig = taskApi.getCurTaskConfig();
				pageApi.pageRender();
			}
		})
	},
	/*获取当前状态是否是审核中*/
	getAuditingStyle:function(stageid,projectid,taskid){
		if (taskApi.selectProjectid == projectid)
		{
			var isAuditing = false;
			var len = userApi.userTaskInfo.tasks.length;
			if (len>0){
				for(var i = 0;i<len;i++)
				{
					if (taskid == userApi.userTaskInfo.tasks[i].taskid&&userApi.userTaskInfo.stage==stageid){
						curTask = userApi.userTaskInfo.tasks[i];
						if (curTask.items.length==4)
						{
							isAuditing = true;
						} else {
							isAuditing = false;
						}
						break;
					}
					
				}
			}
			if (isAuditing){
				return "step_item finish-upload";
			} else {
				return "step_item";
			}
		} else {
			return "step_item";
		}
	},
	/*获取当前阶段的配置数据*/
	getCurTaskConfig:function(){
		var len = task_config.config.projects.length;
		if(taskApi.stage==null||taskApi.stage == 0||taskApi.stage==1)
		{
			return task_config.config.projects[0];
		} else if (taskApi.stage >= 5){
			return task_config.config.projects[len-1];
		} else {
			return task_config.config.projects[taskApi.stage-1];
		}
	},
	/*选择任务大类*/
	selectMainTask:function(){
		var url = '';
		var submitId = taskApi.selectTask;
		if(isDebug){
			//http://192.168.229.171:55409/gamebest/choose_project?uid=20074006&projectid=1
			url = 'http://192.168.229.171:55409/gamebest/choose_project?uid=';
		} else {
			url = 'http://game.api.cc.163.com/gamebest/choose_project?uid=';
		}
		url+=userApi.getUid()+"&projectid="+submitId;
		ccSubjectUI.getData(url).then(function(data){
			if(data.code === 0&&data.result === 0){
				if (data.hasOwnProperty("projectid")){
					taskApi.selectProjectid = data.projectid;
				} else {
					taskApi.selectProjectid = submitId;
				}
				// var tempStr = '您已选'+'<span class="warn-clz">'+ taskApi.getTaskNameById(taskApi.selectProjectid)+'</span>类任务，可点击下方的任务条提交任务：';
				// $(".main-task-title").text(tempStr);
		    	//pageApi.updateStatus();
		    	//taskApi.updateStatus();
		    	userApi.getUserInfoUpdate();
			} else {
				var errorMsg = '选择任务失败';
				if(data.result === 2){
					errorMsg = '亲，目前已经过了上传图片的时间了哦～';
				} else if (data.result === 1){
					errorMsg = '其他失败';
				} else if (data.result === 3){
					errorMsg = '不在户外主播名单';
				} else if (data.result === 4){
					errorMsg = '选择项目不是可选范围内';
				} else if (data.result === 5){
					errorMsg = '已选择项目';
				} else if (data.result === 6){
					errorMsg = '该阶段已淘汰，不能选';
				} else {
					errorMsg = data.reason;
				}
				new LightBox({
				    'type': 'alert',
				    'title' : '提示',
				    'tipType': 'error',
				    'str': errorMsg,
				    'buttonStr' : ['知道了'],
				    'callbacks': [function() {
				    }]
				});
			}
		})
	},
	/*判断是否要纠正当前任务*/
	updateCurSelectItem:function(){
		if (taskApi.selectId_temp!=0&&taskApi.selectStepId_temp!=0){
			// taskApi.selectId= taskApi.selectId_temp;
			// taskApi.selectStepId_temp = taskApi.selectStepId_temp;
			// askApi.selectId_temp = 0 ;
			// taskApi.selectStepId_temp = 0;
		}
	},
	/*判断当前任务能否操作，上传图片、提交任务、并且提示*/
	judgeTaskTimeLimit:function(){
		var selectStage = $(".step_con.active").attr("_stageid");
		var timeArr = task_config.config.act_time[selectStage-1];
		//-1,未到时间，0，当前时间在区间内，1，过时
		var timeStatus = task_utils.getTimeStatsu(timeArr[0],timeArr[1]);
		if (timeStatus == 1){
			new LightBox({
				    'type': 'alert',
				    'title' : '提示',
				    'tipType': 'error',
				    'str': "亲，目前已经过了上传图片的时间了哦～",
				    'buttonStr' : ['知道了'],
				    'callbacks': [function() {
				    }]
				});
			return false;
		} else if(timeStatus == -1){
			new LightBox({
				    'type': 'alert',
				    'title' : '提示',
				    'tipType': 'error',
				    'str': "亲，目前还没有到上传图片的时间哦～",
				    'buttonStr' : ['知道了'],
				    'callbacks': [function() {
				    }]
				});
			return false;
		} else {
			return true;
		}
	},
	/*判断当前任务能否操作，上传图片、提交任务、并且提示*/
	judgeTargetTaskTimeLimit:function(_stageid){
		var selectStage = _stageid;
		var timeArr = task_config.config.act_time[selectStage-1];
		//-1,未到时间，0，当前时间在区间内，1，过时
		var timeStatus = task_utils.getTimeStatsu(timeArr[0],timeArr[1]);
		if (timeStatus == 1){
			new LightBox({
				    'type': 'alert',
				    'title' : '提示',
				    'tipType': 'error',
				    'str': "亲，目前已经过了上传图片的时间了哦～",
				    'buttonStr' : ['知道了'],
				    'callbacks': [function() {
				    }]
				});
			return false;
		} else if(timeStatus == -1){
			new LightBox({
				    'type': 'alert',
				    'title' : '提示',
				    'tipType': 'error',
				    'str': "亲，目前还没有到上传图片的时间哦～",
				    'buttonStr' : ['知道了'],
				    'callbacks': [function() {
				    }]
				});
			return false;
		} else {
			return true;
		}
	},
	/*提交上传任务*/
	submitTask:function(){
		//先判断下任务活动时间，是还没有开始呢，还是已经结束
		if (taskApi.judgeTargetTaskTimeLimit(taskApi.selectShowStageId)==false)
		{
			return;
		}
		

		var url = '';
		if(isDebug){
			//http://192.168.229.171:55409/gamebest/add_outdoor_task?uid=20074006&projectid=1&taskid=1&items=http://baidu.com,http://163.com
			url = 'http://192.168.229.171:55409/gamemarchoutdoor/add_outdoor_task?uid=';
		} else {
			url = 'http://game.api.cc.163.com/gamemarchoutdoor/add_outdoor_task?uid=';
		}
		url+=userApi.getUid()+"&projectid="+taskApi.selectTask+"&taskid="+taskApi.selectSubTask+"&items="+taskApi.getSubmitPic();
		ccSubjectUI.getData(url).then(function(data){
			if(data.code === 0&&data.result === 0){
				taskApi.updateStatus();
				var targetItem = $('.step_con[_taskid="'+taskApi.selectSubTask+'"]');
				targetItem.addClass("task-status-auditing").find(".fileList").addClass("img-thumbnail");
				targetItem.find(".submit-btn").removeClass("enable").addClass("enable").text("等待审核");
				taskApi.addImgListener();
				$(".step_con.active").find(".step_item").addClass("finish-upload");
				userApi.getUserInfoUpdate(true);
				new LightBox({
				    'type': 'alert',
				    'title' : '提示',
				    'tipType': 'error',
				    'str': "任务提交成功",
				    'buttonStr' : ['知道了'],
				    'callbacks': [function() {
				    }]
				});
			} else {
				var errorMsg = '选择任务失败';
				if(data.result === 2){
					errorMsg = '亲，目前已经过了上传图片的时间了哦～';
				} else if (data.result === 1){
					errorMsg = '其他失败';
				} else if (data.result === 3){
					errorMsg = '不在户外主播名单';
				} else if (data.result === 4){
					errorMsg = '选择大类项目错误';
				} else if (data.result === 5){
					errorMsg = '没有该任务';
				} else if (data.result === 6){
					errorMsg = '不在任务时间';
				}  else if (data.result === 7){
					errorMsg = '状态不对';
				} else {
					errorMsg = data.reason;
				}
				new LightBox({
				    'type': 'alert',
				    'title' : '提示',
				    'tipType': 'error',
				    'str': errorMsg,
				    'buttonStr' : ['知道了'],
				    'callbacks': [function() {
				    }]
				});
			}
		})
	},
	/*获取当前需要提交的图片数据*/
	getSubmitPic:function(){
		var $li = $(".step_con.active");
		var str = '',
		list=[],
		len = $li.find(".upload-state-done").length;
		if (len == 4){
			for(var i = 0;i<len;i++)
			{
				list.push( $li.find(".upload-state-done").eq(i).attr("photourl"));
			}
		}
		str = list.join(",");
		return str;
	},
	/*获取当前item状态css，是否可以选择，有没资格选择*/
	getCurStatusItemCss:function(stageid,projectid,taskid){
		if (userApi.isLogin&&taskApi.selectProjectid!=0)
		{
			if (taskApi.selectProjectid!=projectid){
				return '';
			} else {
				//复赛阶段，时间未到，不能点开
				if (stageid>1){
					var timeArr = task_config.config.act_time[stageid-1];
					//-1,未到时间，0，当前时间在区间内，1，过时
					var timeStatus = task_utils.getTimeStatsu(timeArr[0],timeArr[1]);
					if (timeStatus==-1){
						return '';
					}
				} 
				//判断是否有资格，没有不能点击，暂时屏蔽，记得取消！！！
				//0是晋级，1是没有晋级
				if (userApi.userTaskInfo.is_anchor_out.hasOwnProperty(stageid)&&userApi.userTaskInfo.is_anchor_out[stageid]==1){
					return '';
				}
				return 'allow-select';
			}
		} else {
			return 'status-free-select';
		}
	},
	/*判断当前任务是否需要显示开始时间*/
	needShowStart:function (stageid){
		return stageid>1;
	},
	/*获取当前任务的开始日期*/
	getTaskStartTime:function(stageId){
		var lastTime = '';
		var len = task_config.config.act_time.length;
		if(taskApi.stage==null||stageId == 0||taskApi.stage==1)
		{
			lastTime = task_config.config.act_time[0][0];
		} else if (stageId >= 5){
			lastTime  = task_config.config.act_time[len-1][0];
		} else {
			lastTime = task_config.config.act_time[stageId-1][0];
		}
		return task_utils.getTargetDateString(lastTime+1);
	},
	/*获取当前任务的截至日期*/
	getTaskLastTime:function(stageId){
		var lastTime = '';
		var len = task_config.config.act_time.length;
		if(stageId == 0||stageId==1)
		{
			lastTime = task_config.config.act_time[0][1];
		} else if (stageId >= 5){
			lastTime  = task_config.config.act_time[len-1][1];
		} else {
			lastTime = task_config.config.act_time[stageId-1][1];
		}
		return task_utils.getTargetDateString(lastTime+1);
	},
	/*获取指定任务名称*/
	getTaskNameById:function(id)
	{
		var len = taskApi.getCurTaskConfig().length;
		for(var i=0;i<len;i++)
		{
			if (taskApi.getCurTaskConfig()[i].projectid==id)
			{
				return taskApi.getCurTaskConfig()[i].name;
			}
		}
		return '';
	},
	/*限制选择*/
	limitPick:function(boo){
		if (boo){
			 taskApi.isUploading=true;
			$('.picker-con').addClass("upload-status-limitpick");
		} else {
			taskApi.isUploading=false;
			$('.picker-con').removeClass("upload-status-limitpick");
		}
		
	}

}

function showTestImg(){
	var link = $( '#'+taskApi.selectId ).attr('_img');

    var preload = $('<img src="'+link+'" alt="" class="memory-img">');
    $('body').append(preload);
    preload.load(function(){
    	var win = new LightBox({
    	    'type': 'loadding',
    	    'width': preload.width()+20,
    	    'boxClass': 'memory-win',
    	    'autoPos': true,
    	    'str': '<img src="'+link+'" alt="" class="memory-img"><div class="memory-desc"></div>'
    	});
    	preload.remove();
    })
}

var loader_utils = {
	count:0,
	recount:0,
	init:false,
	btnArr:[],
	getIndex:function(){
		
		var idName = "upload-btn"+loader_utils.count;
		loader_utils.count++;
		loader_utils.btnArr.push(idName);
		return idName;
	},
	creat:function(){
		if (loader_utils.init){
			return;
		}
		loader_utils.init=true;
	    var $ = jQuery,
        $list = $('.addphotobtn'),
        $targetList,
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,

        // 缩略图大小
        thumbnailWidth = 235 * ratio,
        thumbnailHeight = 260 * ratio,

        // Web Uploader实例
        uploader;
        var uplaodImgUrl = '';
		if(isDebug){
			uplaodImgUrl = 'http://192.168.229.171:55409/gamemarchoutdoor/upload';
		} else {
			uplaodImgUrl = 'http://game.api.cc.163.com/gamemarchoutdoor/upload';
		}

	    // 初始化Web Uploader
	    uploader = WebUploader.create({

	        // 自动上传。
	        auto: true,

	        // swf文件路径
	        swf: 'js/Uploader.swf',

	        // 文件接收服务端。
	        //server: 'http://millionangles.act.cc.163.com/angles/upload',
	         server:uplaodImgUrl,

	        // 选择文件的按钮。可选。
	        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
	        pick: '.imgPicker1',

	        // 只允许选择文件，可选。
	        accept: {
	            title: 'Images',
	            extensions: 'jpg,png',
	            mimeTypes: 'image/*'
	        },
	        fileVal:'pic',
	        fileSingleSizeLimit :2097152

	    });

	    taskApi.uploader = uploader;
	     // 不过类型判断允许不允许，先派送 `beforeFileQueued`
	     uploader.on( 'beforeFileQueued', function( file ) {
	     	console.log("beforeFileQueued active");
	     });
	// 类型不匹配，则派送错误事件，并返回。
	      uploader.on( 'error', function( file ) {
	     	console.log("error active");
	     });

	    // 当有文件添加进来的时候
	    uploader.on( 'fileQueued', function( file ) {
	    	
	    	taskApi.limitPick(true);
	    	var targetBoss = $('.fileList[id="'+taskApi.selectId+'"]');
			targetBoss.removeClass("upload-state-loading").addClass("upload-state-loading");
	    	console.log("fileQueued active");
	    	$targetList = $("#"+taskApi.selectId);

	        $info = $targetList.parent().find('div.info');
	        $info.text("上传中...");

	    	//$list.find(".file-item").remove();
	    	$targetList.find(".thumbnail").remove();//删除原来的图片
	        var $li = $(
	                '<div id="' + file.id + '" class="file-item thumbnail">' +
	                    '<img>' +
	                    //'<div class="info">' + file.name + '</div>' +
	                '</div>'
	                ),
	            $img = $li.find('img');

	        $targetList.append( $li );

	        // 创建缩略图
	        uploader.makeThumb( file, function( error, src ) {
	            if ( error ) {
	                $img.replaceWith('<span>不能预览</span>');
	                return;
	            }

	            $img.attr( 'src', src );
	        }, thumbnailWidth, thumbnailHeight );
	        //创建原图
	         uploader.makeThumb( file, function( error, src ) {
	             $( '#'+taskApi.selectId ).attr("_img",src);
	        },1,1);

	       
	    });

	    // 文件上传过程中创建进度条实时显示。
	    uploader.on( 'uploadProgress', function( file, percentage ) {
	        var $li = $( '#'+taskApi.selectId ),
	            $percent = $li.find('.progress span');

	        // 避免重复创建
	        if ( !$percent.length ) {
	            $percent = $('<p class="progress"><span></span></p>')
	                    .appendTo( $li )
	                    .find('span');
	        }

	        $percent.css( 'width', percentage * 100 + '%' );
	    });

	    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
	    uploader.on( 'uploadSuccess', function( file, data ) {
	        var $li = $( '#'+taskApi.selectId ),
	            $info = $li.parent().find('div.info'),
	            $stepItem = $( '#step_item'+taskApi.selectSubTask+"_"+taskApi.selectStepId );
	        //$photo_sticker = $li.parent().find('[name="photo_sticker"]');
	    	$li.removeClass("upload-state-error").removeClass("upload-state-loading").addClass('upload-state-done');
	    	// $stepItem.addClass("finish-upload");

	        
	        // 避免重复创建
	        if ( !$info.length ) {
	            $info = $('<div class="info"></div>').appendTo( $li );
	        }
	        $info.text('已完成');
	        $info.parent().removeClass("upload-status-error").addClass("upload-status-done");
	        console.log('上传成功');
	        var datatext = /\{.+\}/.exec(data._raw)[0],
	        	photourl = $.parseJSON(datatext).data.url;
	       // $photo_sticker.val(photourl);
	       	$li.attr("photourl",photourl)
	        //记录上传的图片地址
	       
	        taskApi.setMyTaskImgById(taskApi.selectTask,taskApi.selectSubTask,taskApi.selectStepId,photourl);
	    	taskApi.updateCurSelectItem();
	    });

	    // 文件上传失败，现实上传出错。
	    uploader.on( 'uploadError', function( file ) {
	    	//2345944，20000000
	    	taskApi.limitPick(false);
	    	taskApi.setMyTaskImgById(taskApi.selectTask,taskApi.selectSubTask,taskApi.selectStepId,"");
	        var $li = $( '#'+taskApi.selectId ),
	            $info = $li.parent().find('div.info');
	        // 避免重复创建
	        if ( !$info.length ) {
	            $info = $('<div class="info"></div>').appendTo( $li );
	        }
	        $li.removeClass("upload-state-done").removeClass("upload-state-loading").addClass('upload-state-error');
	        $info.text('上传失败');
	        $info.parent().removeClass("upload-status-done").addClass("upload-status-error");
	        taskApi.updateCurSelectItem();
	        console.log('上传失败');
	    });

	    // 完成上传完了，成功或者失败，先删除进度条。
	    uploader.on( 'uploadComplete', function( file ) {
	    	taskApi.limitPick(false);
	        $( '#'+taskApi.selectId ).find('.progress').remove();
	         console.log('完成上传完了，成功或者失败');
	         taskApi.updateCurTaskStatus();
	         taskApi.updateCurSelectItem();
	    });
	    //
	    uploader.on('error', function(type){
	    	taskApi.limitPick(false);
	    	taskApi.setMyTaskImgById(taskApi.selectTask,taskApi.selectSubTask,taskApi.selectStepId,"");
	    	var $li = $( '#'+taskApi.selectId ),
	            $info = $li.parent().find('div.info');
	    	if (type == "F_EXCEED_SIZE") {
		        // 避免重复创建
		        if ( !$(".info").length ) {
		            $info = $('<div class="error"></div>').appendTo($(".addphotobtn"));
		        }
		        $li.removeClass("upload-state-done").removeClass("upload-state-loading").addClass('upload-state-error');
		        $info.parent().removeClass("upload-status-done").addClass("upload-status-error");
		        $info.text('图片大小不能超过2M');
		        //ff345f
		        taskApi.updateCurSelectItem();
		        console.log('图片过大');
	    	}
		});
	}
}
function move(obj, my_speed){
    $(document).mousemove(function(e) {  
        var VarShowTop = e.pageY;
        var VarShowLeft = e.pageX;
       
        var DocHeight_z =  pageApi.clientH/2;
        var Move_Left;
        var Move_top;
        var spritW = $(obj).width();
         
        var DocWidth_z = pageApi.clientW/2;
        speed=my_speed;
        // parseInt($(obj).css("margin-left")
        if(VarShowLeft<pageApi.clientW/2)
        {
            Move_left  = DocWidth_z + (DocWidth_z - VarShowLeft)*speed;
        }
        else
        {
            Move_left = DocWidth_z - (VarShowLeft - DocWidth_z)*speed;  
        };
        if(VarShowTop<Move_top)
        {
            Move_top = DocHeight_z + (DocHeight_z - VarShowTop)*speed;
        }
        else
        {
            Move_top = DocHeight_z - (VarShowTop - DocHeight_z)*speed;  
        };
        //Move_left-=395;
        $(obj).css({"top" :Move_top + "px","left" :Move_left + "px"});  
         //console.log(parseInt($(obj).css("margin-left")));
    }); 
}

