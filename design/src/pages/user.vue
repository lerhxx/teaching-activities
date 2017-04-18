<template>
	<div class='padding-top user'>
		 <ul class='per-list'>
            <li class='per-list-item' :class="{active: !isAdd}" @click='toggleAdd(1)'>
                    用户信息
            </li><li class='per-list-item' :class="{active: isAdd}" @click='toggleAdd(2)'>
                    添加用户
            </li>
        </ul>
        <ul class='info-list' v-show='!isAdd'>
            <li class='thead'>
                <span>用户名</span><span>账号</span><span>职称</span><span>所属系</span><span>等级</span><span></span><span></span>
            </li>
        	<li class='tbody' v-for='item in users'>
        		<span>{{item.name}}</span><span>{{item.account}}</span><span>{{item.title}}</span><span>{{item.faculty.type}}</span><span>{{item.rank|filterRank}}</span><span class='btn-mod' @click='onModify'>修改</span><span class='btn-del' @click='onDelete(item.account)'>删除</span>
        	</li>
        </ul>
        <form v-show='isAdd' class='add-user'>
        	<div class='group-con'>
        		<label>用户名：</label>
        		<input type="text" name="username" v-model='name'>
        	</div>
        	<div class='group-con'>
        		<label>初始密码：</label>
        		<input type="password" name="pwd" v-model='pwd'>
        	</div>
        	<div class='group-con'>
        		<label>权限：</label>
        		<select v-model='rank'>
        			<option v-for='item in rankOption' v-bind:value='item.index'>{{item.type}}</option>
        		</select>
        	</div>
        	<div class='group-con'>
        		<label>所属教研室：</label>
        		<select v-model='faculty'>
        			<option v-for='item in facultyOption' v-bind:value='item.index'>{{item.type}}</option>
        		</select>
        	</div>
            <div class='group-con'>
        		<label>职称</label>
        		<input type="text" name="title" v-model='title'>
        	</div>
        	<div clas='group-btn'>
        		<input class='btn btn-cancle' type="button" name="add" @click='addUser' value='添加'>
        	</div>
        </form>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
            return {
                isAdd: true,
                name: '',
                pwd: '',
                rank: 0,
                faculty: 0,
                title: '',
                rankOption: [{
                    type: '普通用户',
                    index: 0
                },{
                    type: '普通管理员',
                    index: 1
                },{
                    type: '系统管理员',
                    index: 2
                }],
                facultyOption: [{
                    type: '信息管理教研室',
                    index: 1
                },{
                    type: '工业工程教研室',
                    index: 2
                }]
            }
        },
        created() {
        	this.getUser();
        },
        methods: {
            toggleAdd(type) {
                switch(type) {
                    case 1:
                        this.isAdd = false;
                        break;
                    case 2:
                        this.isAdd = true;
                        break;
                    default:
                        this.isAdd = false;
                }
            },
            addUser() {
                let form = {};
                form.id = this.name;
                form.pwd = this.pwd;
                form.title = this.title;
                form.rank = this.rank;
                for(let i = 1, len = this.facultyOption.length; i < len; ++i) {
                    if(i === this.faculty) {
                        form.faculty = this.facultyOption[i];
                        break;
                    }
                }
                this.$store.dispatch('ADD_USER', form)
                    .then(res => {
                        this.getUser();
                        this.isAdd = false;
                    })
            },
            getUser() {
                // if(this.userRank < 1) {
                //     this.$router.push('index');
                // }
                let range = null;
                if(this.userRank == 1) {
                    range = this.userFaculty;
                }
                this.$store.dispatch('GET_USERS')
                    .catch(err => alert(err));
            },
            onModify() {
                console.log('modyify')
            },
            onDelete(account) {
                console.log(account);
                this.$store.dispatch('DELETE_USER', {id: account})
                    .then(res => {
                        alert(res);
                        for(let i = 0, len = this.users.length; i < len; ++i) {
                            if(this.users[i].account == account) {
                                this.users.splice(i,1);
                                break;
                            }
                        }
                    })
                    .catch(err => alert(err))
            }
        },
        filters: {
            filterRank(item) {
                switch(item) {
                    case 0:
                        return '普通用户';
                    case 1:
                        return '普通管理员';
                    case 2:
                        return '系统管理员';
                    case 3:
                        return '系统管理员';
                }
            }
        },
        computed: mapState(['users', 'academyList', 'facultiesList', 'userRank', 'userFaculty'])
	}
</script>

<style scoped lang='stylus'>
    @import '../css/common';
    @import '../css/funs';
    @import '../css/form';
    
    .user
   	    text-align center
    .info-list
        width 80%
        margin 30px auto
        border-spacing 0
    .thead
        width 100%
        padding 8px 0
        color #fff
        background #000
    .thead,
    .tbody
        span
            display inline-block
            padding 5px 0
            &:nth-child(1)
                width 10%
            &:nth-child(2)
                width 15%
            &:nth-child(3)
                width 15%
            &:nth-child(4)
                width 23%
            &:nth-child(5)
                width 20%
            &:nth-child(6)
                width 6%
            &:nth-child(7)
                width 6%
    .tbody
        display block
        width 100%
        padding 5px 0px
        &:hover
            background #ddd
        span
            &:nth-child(6),
            &:nth-child(7)
                margin 0 5px
                color #fff
                font-size 12px
                background #00bcd4
                cursor pointer
                box-sizing border-box
                border-radius 6px
    .per-list
        relative()
        margin-top 20px
        margin-bottom 10px
        text-align center
        &:before
            absolute(top 0 bottom 0 left 0 right 0)
            width 50%
            height 0px
            margin auto
            border 1px solid #000
            content ''
            z-index -1
    .per-list-item
        padding 10px 35px
        border 1px solid #000
        background #fff
        cursor pointer
        &.active
            color #fff
            background #000
    .add-user
    	display inline-block
    	margin 30px auto
    	text-align left
    	label
    		display inline-block
    		width 100px
    	input,
    	select
    		width 300px
</style>