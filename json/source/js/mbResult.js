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
var userApi = {
	userInfo: null,
	provinces: null,
	isShare: false,
	mobileIsLogin: false,
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
	loginInit: function(){
		if("object" == typeof ccapi && ccapi && typeof ccapi.getUserStatus == 'function' && config.from == 'mobilecc'){
			ccapi.config({
			    debug: false 
			});
			ccapi.ready();
			userApi.mobileLoginInit();
			$('.login-out-wrap').remove();
			/*ccapi.registerService({
			    pageType: "activity",
			    sid: 41309, 
			    cid: 6
			});
			ccapi.registerService({
			    pageType: "activity",
			    sid: 41309, 
			    cid: 8
			});
			ccapi.registerWebHandler('onRecvServiceData', function(data){
				var sid = data.sid,
					cid = data.cid,
					result = data.data;
				alert(JSON.stringify(data.data));
				if(sid === 41309 && cid === 6){
					userApi.fansTicketHandle(result);
				}
				if(sid === 41309 && cid === 8){
					userApi.shareHandle(result);
				}
			})*/
			setTimeout(function(){
				if(!userApi.mobileIsLogin){
		        	new LightBox({
		        	    'type': 'confirm',
		        	    'str': '登录查看你和谜底的那些事儿',
		        	    'buttonStr': ['立即登录', '取消'],
		        	    'callbacks': [function() {
		        	        webccLogin.showLogin();
		        	    }]
		        	});
		        	$('.un-login').show();
		        	$('.is-logined').hide();
		        	if(config.uid){
		        		userApi.getUserRole(config.uid);
		        		userApi.getUserData(config.uid);
		        	} else {
		        		pageApi.setRole('unLogin');
		        		pageApi.initPage();
		        	}
	        		webccLogin.init({
	        	    	loginCb: function () {
	        	    		window.location.reload();
	        	    	}
	        	    });
	        	    webccLogin.flash.login();
	        	    if(config.module == 'mobile'){
	        	    	$('.mobile-un-tcp-tip').show();
	        	    	$('#getFansTicket').addClass('disabled');
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
		if(!userApi.userInfo || !userApi.userInfo.uid){
			new LightBox({
			    'type': 'confirm',
			    'str': '登录查看你和谜底的那些事儿',
			    'buttonStr': ['立即登录', '取消'],
			    'callbacks': [function() {
			        webccLogin.showLogin();
			    }]
			});
			$('.un-login').show();
			$('.is-logined').hide();
			if(config.uid){
				userApi.getUserRole(config.uid);
				userApi.getUserData(config.uid);
			} else {
				pageApi.setRole('unLogin');
				pageApi.initPage();
			}
		} else {
			$('.un-login').hide();
			$('.is-logined').show();
			$('.my-photo').attr('src', userApi.userInfo.purl);
			$('.my-name').text(userApi.userInfo.nickname).attr('title',userApi.userInfo.nickname);
			userApi.getUserRole();
			userApi.getUserData();
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
						userApi.getUserRole();
						userApi.getUserData();
	    			}
	    		}*/
	    		window.location.reload();
	    	}
	    });
	    webccLogin.flash.login();
	    if(config.module == 'mobile'){
	    	$('.mobile-un-tcp-tip').show();
	    	$('#getFansTicket').addClass('disabled');
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
		        	userApi.getUserRole();
		        	userApi.getUserData();
		        } else {
		        	new LightBox({
		        	    'type': 'confirm',
		        	    'str': '登录查看你和谜底的那些事儿',
		        	    'buttonStr': ['立即登录', '取消'],
		        	    'callbacks': [function() {
		        	        ccapi.showLoginView({
	        	                complete: function(res) {
	        	                	
	        	                }
		        	        });
		        	    }]
		        	});
		        	$('.un-login').show();
		        	$('.is-logined').hide();
		        	if(config.uid){
		        		userApi.getUserRole(config.uid);
		        		userApi.getUserData(config.uid);
		        	} else {
		        		pageApi.setRole('unLogin');
		        		pageApi.initPage();
		        	}
		        }
		    }
		});
	},
	getUserRole: function(uid){
		var url = '';
		if(!uid){
			uid = userApi.userInfo.uid;
		}
		if(isDebug){
			url = 'http://192.168.229.171:18668/year90068/get_follow_info?uid='+uid;
		} else {
			url = 'http://game.combo.cc.163.com//year90068/get_follow_info?uid='+uid;
		}
		ccSubjectUI.getData(url).then(function(data){
			var info;
			if(data.code === 0){
				info = data.data;

				if(!info){
					pageApi.setRole('visitor');
					pageApi.initPage();
				} else if(info.is_anchor){
					pageApi.setRole('anchor');
					pageApi.initPage();
					userApi.setInfo(info);
					userApi.getAnchorFirstView(uid);
				} else {
					pageApi.setRole('fans');
					pageApi.initPage();
					userApi.setInfo(info);
				}
			}
		})
	},
	getUserData: function(uid){
		var url = '';
		if(!uid){
			uid = userApi.userInfo.uid;
		}
		if(isDebug){
			url = 'http://192.168.229.171:55409/celeact/get_data?uid='+uid;
		} else {
			url = 'http://game.api.cc.163.com/celeact/get_data?uid='+uid;
		}
		ccSubjectUI.getData(url).then(function(data){
			var info;
			if(data.code === 0){
				info = data;
				userApi.setInfo(info);
				console.log(info)
			}
		})
	},
	getAnchorFirstView: function(uid){
		var url = '';
		if(isDebug){
			url = 'http://vquery.v.cc.163.com/video/querystartat?uid='+uid;
		} else {
			url = 'http://vquery.v.cc.163.com/video/querystartat?uid='+uid;
		}
		$.ajax({
			url: url,
			dataType: 'json',
			success: function(data){
				if(data && data[0]){
					if(data[0].startat - 0){
						$('.first-online-time').text(data[0].startat);
						$('.first-online-exceed').text(data[0].rate+'%');
					} else {
						$('.first-online-time').hide().siblings('.event-other').text('亲，期待您的第一次直播')
					}
				} else {
					$('.first-online-time').hide().siblings('.event-other').text('亲，期待您的第一次直播')
				}
			}
		})
	},
	getProvinces: function(){
		$.ajax({
			url: 'js/province-config.json',
			dataType: 'json',
			complete: function(data){
				userApi.provinces = JSON.parse(data.responseText);
			}

		})
	},
	getShareInfo: function(){
		var url = '';
		if(isDebug){
			url = 'http://192.168.229.171:55409/celeact/get_share_info';
		} else {
			url = 'http://game.api.cc.163.com/celeact/get_share_info';
		}
		ccSubjectUI.getData(url).then(function(data){
			if(data.code === 0){
				var viewNum = Math.ceil(data.share*140/data.total),
					divisor = parseInt(viewNum/4),
					remainder = viewNum%4,
					grassItem = $('.grass-item');
				for (var i = 0; i < divisor; i++) {
					grassItem.eq(i).addClass('grass-0');
				}
				if(remainder){
					grassItem.eq(i).addClass('grass-'+(4-remainder));
				}
			}
		})
	},
	setInfo: function(info){
		if(info.province!==undefined){
			$('.my-city').text(info.province||'亲，查不到您的水表，居住在火星？');
		}
		if(info.max_anchor_province){
			$('.max-anchor-city').text(info.max_anchor_province);
		}
		if(info.max_fans_province){
			$('.max-fans-city').text(info.max_fans_province);
		}
		if(info.total_fans){
			$('.total-fans').text(info.total_fans);
		}
		if(info.total_anchor){
			$('.total-anchors').text(info.total_anchor);
		}
		if(info.province_id!==undefined){
			if(info.province_id){
				if(!userApi.provinces){
					var waitProvice = setInterval(function(){
						if(userApi.provinces){
							clearInterval(waitProvice);
							if(userApi.provinces[info.province_id+'']){
								$('.map-block .icon-pos').css({left: userApi.provinces[info.province_id+''].x-35, top: userApi.provinces[info.province_id+''].y-93})
							}
						}
					},1000);
				} else if(userApi.provinces[info.province_id+'']){
					$('.map-block .icon-pos').css({left: userApi.provinces[info.province_id+''].x-35, top: userApi.provinces[info.province_id+''].y-93})
				}
			} else {
				$('.map-block .icon-pos').hide();
			}
		}
		if(info.follow_num){
			$('.follow-num').text(info.follow_num);
		}
		if(info.rank!==undefined){
			if(info.rank-0){
				$('.follow-num-exceed').text(info.rank+'%');
			} else {
				$('.follow-num-exceed').parent().text('亲，积极开播是增加粉丝的不二选择').siblings('.left').hide();	
			}
			
		}

		if(info.first_follow_head !== undefined){
			if(info.first_follow_head){
				$('.first-follow .person-photo').attr('src',info.first_follow_head);
			}
		}
		

		if(info.first_follow_nick !== undefined){
			if(info.first_follow_nick){
				$('.first-follow .person-name').text(info.first_follow_nick).attr('title',info.first_follow_nick);
			} else {
				$('.first-follow').hide().parent().append($('<p class="event-other">您暂没有粉丝，请再接再厉</p>'));
			}
		}

		if(info.first_follow_time !== undefined){
			if(!info.first_follow_time){
				$('.first-follow').hide().parent().append($('<p class="event-other">您暂没有粉丝，请再接再厉</p>'));
			}
		}
		if(info.first_enter){
			if(info.first_enter.time){
				$('.first-enter-time').text(info.first_enter.time);
				$('.first-enter-exceed').text(info.first_enter.percent/100+'%');
				userApi.first_enter_percent = info.first_enter.percent/100;
			} else {
				$('.first-enter-time').hide().siblings('.event-other').text('亲，期待您的第一次观看');
			}
		}
		if(info.is_get_vote!==undefined){
			if(info.is_get_vote>0&&userApi.userInfo &&userApi.userInfo.uid){
				$('#getFansTicket').addClass('disabled').attr('title','今天已领取');
			}
			userApi.is_get_vote = info.is_get_vote;
		}
		if(info.is_share){
			userApi.isShare = true;
		}
		if(info.players){
			$('.rank-item').hide();
			if(info.players.length){
				$('.data-none').hide();
				for (var i = 0; i < info.players.length; i++) {
					$('.rank-item').eq(i).show().find('.schedule-text').text(info.players[i].percent/100+'%')
						.end().find('.schdule-box').css('height',info.players[i].percent*1.6/100+25+'px')
						.end().find('.anchor-img').attr('src',ccSubjectUI.getUserLogo(info.players[i].purl,info.players[i].ptype))
						.end().find('.anchor-name').text(info.players[i].nick).attr('title',info.players[i].nick);
				}
			} else {
				$('.data-none').show();
			}
		}
		if(info.first_send_gift){
			if(info.first_send_gift.num){
				$('.first-gift .person-photo').attr('src',ccSubjectUI.getUserLogo(info.first_send_gift.purl,info.first_send_gift.ptype));
				$('.first-gift .person-name').text(info.first_send_gift.nick).attr('title',info.first_send_gift.nick);
				$('.first-gift .gift-img').attr('src',info.first_send_gift.img);
				$('.first-gift .gift-num').text(info.first_send_gift.num);
			} else {
				$('.first-gift .event-person').hide();
				$('.first-gift .event-other').text('您还没给谜底主播送过礼物哦');
			}
		}
		if(info.anchor){
			if(info.anchor.num){
				$('.my-rank-num').text(info.anchor.num);
				$('.my-fans-exceed').text(info.anchor.percent/100+'%');
			} else {
				$('.my-rank-num').parent().text('亲！你离开直播行业也太久了吧！！');
				$('.my-fans-exceed').parent().text('都找不到你的辉煌历史了！');
			}
			if(info.anchor.head_url){
				$('.anchor-photo').attr('src', ccSubjectUI.getUserLogo(info.anchor.purl,info.anchor.ptype));
			}
			if(info.anchor.nick){
				$('.anchor-name').text(info.anchor.nick);
			}
		}
		//签约
		if(info.sign_time){
			$('.sign-date').text(info.sign_time);
		}
		if(info.sign_percentage){
			info.sign_percentage -= 0;
			$('.sign-exceed').text(info.sign_percentage+'%');
			userApi.sign_exceed = info.sign_percentage;
		}
	},
	shareHandle: function(data){
		if(data.result == 0){
			new LightBox({
			    'type': 'alert',
			    'title' : '温馨提示',
			    'tipType': 'error',
			    'str': '恭喜你成功拔草。获得'+data.num+'张粉丝票奖励和谜底周年庆专属尾灯（7天）。<br />在谜底周年庆活动送粉丝票有机会赢取iphone7',
			    'buttonStr' : ['知道了'],
			    'callbacks': [function() {
			    }]
			});
			var viewNum = Math.ceil(data.share*140/data.total),
				divisor = parseInt(viewNum/4),
				remainder = viewNum%4,
				grassItem = $('.grass-item');
			grassItem.attr('css','grass-item');
			for (var i = 0; i < divisor; i++) {
				grassItem.eq(i).addClass('grass-0');
			}
			if(remainder){
				grassItem.eq(i).addClass('grass-'+(4-remainder));
			}
		}
	},
	shareFun: function(){
		if(!userApi.userInfo || !userApi.userInfo.uid){
			userApi.showLogin();
			return false;
		}
		var type = $(this).attr('_type'),
			title = "",
			name = "",
			percent = 0,
			src = '',
			pic = 'http://res.cc.netease.com/act/pc/2016/MDAnniversary/images/events/share1.jpg';

		if(window.location.search){
			src = window.location.href+'&uid='+userApi.userInfo.uid;
		} else {
			src = window.location.href+'?uid='+userApi.userInfo.uid;
		}
		src = src.replace('from=mobilecc','a=b');
		if(type == 'weixin'){
			src += '&from=mdwx';
		} else {
			src += '&from=mdwb';
		}

		if(userApi.role == 'fans'){
			percent = userApi.first_enter_percent-0||0;
			if(percent>90){
				name = "骠骑将军"
			} else if(percent>70){
				name = "神武都尉"
			} else if(percent>50){
				name = "飞骑御使"
			} else if(percent>30){
				name = "威虎校尉"
			} else {
				name = "护城小兵";
			}
			title="我守护谜底的时间竟然超越了"+percent+"%的68粉！荣获“"+name+"”称号";
		} else if(userApi.role == 'anchor'){
			percent = userApi.sign_exceed-0||0;
			if(percent>90){
				name = "谜底传奇"
			} else if(percent>70){
				name = "谜底巨星"
			} else if(percent>50){
				name = "人气偶像"
			} else if(percent>30){
				name = "谜底新秀"
			} else {
				name = "素人主播";
			}
			title="我守护谜底的时间竟然超越了"+percent+"%的主播！荣获“"+name+"”称号!";
		} else {
			title="我刚刚成为CC90068的谜底小鲜肉粉！速度领取粉丝票抽iphone!";
		}
		if("object" == typeof ccapi && ccapi && typeof ccapi.sendMsg == 'function' && config.from == 'mobilecc'){
			ccapi.sendMsg({
			    sid:41309, 
			    cid:8, 
			    params:{},
			    complete:function(res){}
			});
			if(!userApi.isShare){
				new LightBox({
				    'type': 'alert',
				    'title' : '温馨提示',
				    'tipType': 'error',
				    'str': '恭喜你成功拔草。获得1张粉丝票奖励和谜底周年庆专属尾灯（7天）。<br />在谜底周年庆活动送粉丝票有机会赢取iphone7',
				    'buttonStr' : ['知道了'],
				    'callbacks': [function() {
				    }]
				});
				userApi.isShare = true;
			}
		} else {
			webccLogin.flash.send(41309, 8, {}, function (data) {
				userApi.shareHandle(data);
				console.log(data);
			})
		}
		if("object" == typeof ccapi && ccapi && typeof ccapi.getUserStatus == 'function' && config.from == 'mobilecc'){
			ccapi.sharePage({
			    url: src, // 分享的页面地址
			    title: title, // 分享的标题
			    complete: function(result) {
			    }
			});
			return;
		} else {
			ccSubjectUI.share(type, title, src, pic);
		}
	},
	fansTicketHandle: function(data){
    	if(data.result == 0){
			new LightBox({
			    'type': 'alert',
			    'title' : '温馨提示',
			    'tipType': 'error',
			    'str': '感谢您一路的陪伴，获得2张粉丝票奖励。<br />在谜底周年庆活动送粉丝票有机会赢取iphone7',
			    'buttonStr' : ['知道了'],
			    'callbacks': [function() {
			    }]
			});
			$('#getFansTicket').addClass('disabled').attr('title','今天已领取');
		} else if(data.result == 1){
			$('#getFansTicket').addClass('disabled').attr('title','今天已领取');
			new LightBox({
			    'type': 'alert',
			    'title' : '温馨提示',
			    'tipType': 'error',
			    'str': '今天已领取',
			    'buttonStr' : ['知道了'],
			    'callbacks': [function() {
			    }]
			});
		} else {
			new LightBox({
			    'type': 'alert',
			    'title' : '温馨提示',
			    'tipType': 'error',
			    'str': '服务器出了点问题，请稍后再试',
			    'buttonStr' : ['知道了'],
			    'callbacks': [function() {
			    }]
			});
		}
	},
	getFansTicketFun: function(){
		if(!userApi.userInfo || !userApi.userInfo.uid){
			userApi.showLogin();
			return false;
		}
		if("object" == typeof ccapi && ccapi && typeof ccapi.sendMsg == 'function' && config.from == 'mobilecc'){
			ccapi.sendMsg({
			    sid:41309, 
			    cid:6, 
			    params:{},
			    complete:function(res){}
			});
			new LightBox({
			    'type': 'alert',
			    'title' : '温馨提示',
			    'tipType': 'error',
			    'str': '感谢您一路的陪伴，获得2张粉丝票奖励。<br />在谜底周年庆活动送粉丝票有机会赢取iphone7',
			    'buttonStr' : ['知道了'],
			    'callbacks': [function() {
			    }]
			});
			$('#getFansTicket').addClass('disabled').attr('title','今天已领取');
		} else {
			webccLogin.flash.send(41309, 6, {}, function (data) {
				userApi.fansTicketHandle(data);
			})
		}
	}
}
$(document).ready(function() {
	userApi.loginInit();
	userApi.getProvinces();
	userApi.getShareInfo();
    
    $('#memorymap area').click(function(){
    	var link = $(this).attr('_img'),
    		desc = $(this).attr('_desc');

	    var preload = $('<img src="'+link+'" alt="" class="memory-img">');
	    $('body').append(preload);
	    preload.load(function(){
	    	var win = new LightBox({
	    	    'type': 'loadding',
	    	    'width': preload.width()+20,
	    	    'boxClass': 'memory-win',
	    	    'autoPos': true,
	    	    'str': '<img src="'+link+'" alt="" class="memory-img"><div class="memory-desc"><div class="desc-wrap">'+desc+'</div></div>'
	    	});
	    	preload.remove();
	    })
    })
    $('.grass-list').bind('mouseover', function(e){
    	var offset = $(e.target).offset(),
    		parentOffest = $(this).closest('.grass-block').offset();
    	$(this).closest('.grass-block').find('.win-tip').show().css({'top': offset.top-parentOffest.top+70, 'left': offset.left-parentOffest.left})
    }).bind('mouseout', function(){
    	$(this).closest('.grass-block').find('.win-tip').hide();
    }).bind('click', function(){
    	$(this).closest('.grass-block').addClass('active');
    })

    $('body').click(function(e){
    	if($(e.target).hasClass('share-cloud-open') || $(e.target).closest('.share-cloud-open').length>0){
    		return;
    	}
    	$('.share-cloud').hide();
    	$('.grass-block').removeClass('active');
    })
    $('.share-cloud-open').click(function(){
    	$(this).siblings('.share-cloud').show();
    })
    $('.share-link').click(userApi.shareFun);
    $('#getFansTicket').click(function(){
    	if($(this).hasClass('disabled')) return;
    	userApi.getFansTicketFun();
    })

    $('#musicOpen').click(function(){
    	if($(this).hasClass('close')){
    		$('#music').get(0).play();
    		$(this).removeClass('close');
    	} else {
    		$('#music').get(0).pause();
    		$(this).addClass('close');
    	}
    })
    $(".dot-ellipsis").dotdotdot({});
})
var pageApi = {
	clientH: 0,
	clientW: 0,
	initPage: function(){
		pageApi.clientH = $(window).height();
		pageApi.clientW = $(window).width();
		$('body, .containt, .page').height(pageApi.clientH);
		//$('body, .containt, .page').width(pageApi.clientW);
		var scale = 'scale('+pageApi.clientW/1000+')',
			halfScale = 'scale('+pageApi.clientW*2/1000+')';
		$('.scale-main, .only-scale, .icon-down, .page-control').css({'transform':scale,'-webkit-transform':scale,'-o-transform':scale,'-moz-transform':scale});
		$('#win_box').css({'transform':halfScale,'-webkit-transform':halfScale,'-o-transform':halfScale,'-moz-transform':halfScale});

		/* 页面切换 */
		var mySwiper = new Swiper ('.mobile', {
		    direction: 'vertical',
		    speed: 500,
		    
		    // 如果需要前进后退按钮
		    nextButton: '.page-down',

		    //获取索引
		    onSlideChangeStart: function(obj){
		    	$('#nav').addClass('before');
		    	$('.page:visible').eq(obj.activeIndex).addClass('on').siblings().removeClass('on');
		    },

		    //切换结束后
		    onSlideChangeEnd: function(obj){
		    	$('.nav-item:visible').eq(obj.activeIndex).addClass('cur').siblings().removeClass('cur');
		    	if(obj.activeIndex == ($('.nav-item:visible').length-1)){
		    		$('.page-down').hide();
		    	} else {
		    		$('.page-down').show();
		    	}
		    }

		});
		$(window).resize(function(){
			mySwiper.updateSlidesSize();
			mySwiper.onResize();
		});
		/* 导航 */
		$('.nav-item').on('click', function(event) {
			event.preventDefault();
			var item = $(this).index('.nav-item:visible');

			if($(this).hasClass('hover')){
				return false;
			};
			mySwiper.slideTo(item, 300, function(){
				$('.nav-item:visible').eq(obj.activeIndex).addClass('cur').siblings().removeClass('cur');
			});
		});
	},
	setRole: function( role ){
		var Page = $('.page'),
			NavItem = $('.nav-item');
		Page.hide();
		NavItem.hide();
		if(role == 'unLogin'){
			Page.filter('.page-1').show();
			Page.filter('.page-2').show();
			Page.filter('.page-6').show();
			NavItem.eq(0).show();
			NavItem.eq(1).show();
			NavItem.eq(5).show();
		} else if(role == 'fans'){
			Page.show();
			NavItem.show();
			$('.fans').show();
			$('.visitor').hide();
			$('.anchor').hide();
		} else if(role == 'anchor'){
			Page.show();
			NavItem.show();
			$('.fans').hide();
			$('.visitor').hide();
			$('.anchor').show();
		} else {
			Page.filter('.page-1').show();
			Page.filter('.page-2').show();
			Page.filter('.page-5').show();
			Page.filter('.page-6').show();
			NavItem.eq(0).show();
			NavItem.eq(1).show();
			NavItem.eq(4).show();
			NavItem.eq(5).show();
			$('.fans').hide();
			$('.visitor').show();
			$('.anchor').hide();
		}
		userApi.role = role;
		$('.page-nav-wrap').show();
	}
}
