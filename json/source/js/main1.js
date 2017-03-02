var config = {
  user_uid : 0,  //用户id
  hostPash: ''
}
config.user_uid = (ClientICC.getUid() > 0) ? ClientICC.getUid() : config.user_uid;

function setHostPash() {
	var path;
	if(window.location && window.location.href) {
		path = window.location.href
	}
	if(path.indexOf('//cc.163.com') != -1) {
		config.hostPash = '//game.api.cc.163.com';
		CommonSetting.disabledKeys();
	}else {
		config.hostPash = '//192.168.229.171:55409';
		Vue.config.devtools = true;
	}
}
setHostPash();

Vue.component('task', function(res, rej) {
	Vue.http.get('./template/task.html').then(function(response) {
		res({
			template: response.data,
			data: function() {
				return {
					projects: this.projectInfo,
					curItem: '',
					curTask: '',
					showItem: ''
				}
			},
			props: [
				'projectInfo'
			],
			methods: {
				itemid: function(item) {
					this.curItem = item;
				},
				taskid: function(task) {
					this.curTask = task;
				},
				uploadPic: function(e) {
					console.log(this.projects.projectid)
					console.log(this.projects.tasks[this.curTask].items[this.curItem])
					if(typeof FileReader==='undefined'){
		                alert('您的浏览器不支持图片上传，请升级您的浏览器');
		                return false;
		            }
					var files = e.target.files || e.dataTransfer.files;
					var reader = new FileReader(),
						result = new FormData();

					reader.readAsDataURL(files[0]);
					// reader.onload = function(e) {
					// 	result = e.target.result;
					// 	console.log('ok')
					// }
					result.append(files[0].name,files[0]);
					console.log(result.get(files[0].name))
					Vue.http.jsonp(config.hostPash + '/gamemarchoutdoor/upload?pic=' + result)
						.then(function(res) {
							if(res.data.code) {
								console.log(res.data.url)
								this.projects.tasks[this.curTask].items[this.curItem].url = res.data.url;
							}
						})
				},
				commitTask: function() {
					var allItems = this.projects.tasks[this.curTask].items,
						items = [],
						len = allItems.length,
						i;
						console.log(this.curTask)
					for(i = 0; i < len; ++i) {
						items.push(allItems[i].url);
					}
					items.join(',');
					//TODO
					// url: '/gamemarchoutdoor/add_outdoor_task?uid=' + config.user_uid + '&projectid=' + projectid + '&taskid=' + taskid + '&items=' + items
					// Vue.http.jsonp(config.hostPash + '/gamemarchoutdoor/add_outdoor_task?uid=20074006&projectid=1&taskid=1&items=http://baidu.com,http://163.com')
					// 	.then(function(res) {
					// 		if(res.data.code) {
					// 			console.log(res.data.url)
					// 		}
					// 	})
				},

			},
			watch: {
				'projectInfo': function() {
					this.projects = this.projectInfo
				}
			}
		})
	})
})

var contain = new Vue({
	el: '#contain',
	data: {
		userProjects: [],
		projectsInfo: [],
		projectid: 1,
		login: false,
		taskType: 4,
		showTask: false,
		curTask: 0
	},
	ready: function() {
		var self = this;
		//TODO
		//uid '/gamemarchoutdoor/get_outdoor_info?uid=' + config.user_uid
		Vue.http.jsonp(config.hostPash + '/gamemarchoutdoor/get_outdoor_info?uid=20074006')
			.then(function(res) {
				if(res.data.code === 0) {
					self.userProjects = res.data.projects;
					self.userProjects[0][0].items[0] = 'images/bg.jpg'
					// console.log(self.userProjects[0][0].items)
				}
				// console.log(typeof res.body)
			})

		Vue.http.jsonp(config.hostPash + '/gamemarchoutdoor/get_outdoor_config')
			.then(function(res) {
				if(res.data.code === 0) {
					self.projectsInfo = res.data.config.projects;
				}
					// console.log(self.projectsInfo[0])
			})
	},
	methods: {
		signin: function() {
			console.log('signin')
		},
		signup: function() {
			console.log('signup')
		},
		signout: function() {
			console.log('signout')
		},
		showTaskItem: function(type) {
			this.projectid = type;
			this.showTask = true;
		},
		close: function() {
			this.showTask = false;
		}
	},
})