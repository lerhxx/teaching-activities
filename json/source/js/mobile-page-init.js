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
