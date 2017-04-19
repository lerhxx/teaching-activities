<template>
	<div class='padding-top user'>
		 <ul class='per-list'>
            <li class='per-list-item' :class="{active: !isAdd}" @click='toggleAdd(1)'>
                    用户信息
            </li><li class='per-list-item' :class="{active: isAdd}" @click='toggleAdd(2)'>
                    添加用户
            </li>
        </ul>
        <!--用户信息-->
        <ul class='info-list' v-show='!isAdd'>
            <li class='thead'>
                <span>名称</span><span>账号</span><span>职称</span><span>所属系</span><span>等级</span><span></span><span></span>
            </li>
        	<li class='tbody' v-for='(item, index) in users'>
        		<span>{{item.name}}</span><span>{{item.account}}</span><span>{{item.title}}</span><span>{{item.faculty.type}}</span><span>{{rankToText(item.rank)}}</span><span class='btn-mod' @click='onModify(item, index)'>修改</span><span class='btn-del' @click='onDelete(item.account, index)'>删除</span>
        	</li>
        </ul>
        <!--添加用户-->
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
        		<input class='btn btn-edit' type="button" name="add" @click='addUser' value='添加'>
        	</div>
        </form>
        <!--修改模态框-->
        <div class='modal' v-show='showDialog'>
            <form class='modal-form'>
                <h2>修改{{modifyUser.name}}信息</h2>
                <div class='group-con'>
                    <label>名称：</label>
                    <input type='text' v-model='modifyUser.name'/>
                </div>
                <div class='group-con'>
                    <label>账号：</label>
                <input type='text' v-model='modifyUser.account'/>
                </div>
                <div class='group-con'>
                    <label>职称：</label>
                    <select v-model='modifyUser.title'>
                        <option v-for='title in titleOption'>{{title}}</option>
                    </select>
                </div>
                <div class='group-con'>
                    <label>所属系：</label>
                    <select v-model='modifyUser.faculty'>
                        <option v-for='faculty in facultyOption' v-bind:value='faculty.index'>{{faculty.type}}</option>
                    </select>
                </div>
                <div class='group-con'>
                    <label>等级：</label>
                    <select v-model='modifyUser.rank'>
                        <option v-for='rank in rankOption' v-bind:value='rank'>{{rankToText(rank)}}</option>
                    </select>
                </div>
                <div class='group-con'>
                    <input type='button' class='btn btn-edit' value='修改' @click='certenModify'/>
                    <input type='button' class='btn btn-cancle' value='取消' @click='cancleModify'/>
                </div>
            </form>
        </div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
    import {deepCopy} from '../js/common';
	export default {
		data() {
            return {
                isAdd: true,
                name: '',
                pwd: '',
                rank: 0,
                faculty: 0,
                title: '',
                rankOption: [0, 1, 2],
                facultyOption: [{
                    type: '信息管理教研室',
                    index: '1-1'
                }, {
                    type: '工业工程教研室',
                    index: '1-2'
                }],
                titleOption: ['普通教师', '一级教师', '教授'],
                modifyUser: {
                    name: '',
                    account: '',
                    title: '',
                    faculty: '',
                    rank: ''
                },
                modifyIndex: -1,
                showDialog: false
            }
        },
        created() {
            // if(this.userRank < 1) {
            //     this.$router.push('index');
            // }
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
                let range = null;
                if(this.userRank == 1) {
                    range = this.userFaculty;
                }
                this.$store.dispatch('GET_USERS')
                    .catch(err => alert(err));
            },
            onModify(item, index) {
                this.modifyUser = deepCopy(item);
                this.modifyUser.faculty = item.faculty.index
                this.showDialog = true;
                this.modifyIndex = index;
            },
            onDelete(account, index) {
                this.$store.dispatch('DELETE_USER', {id: account})
                    .then(res => {
                        alert(res);
                        this.users.splice(index,1);
                    })
                    .catch(err => alert(err))
            },
            onChangeFaculty(e) {
                console.log(e.target)
            },
            certenModify() {
                let newInfo = deepCopy(this.modifyUser);
                newInfo.faculty = this.textToFaculty(newInfo.faculty)
                this.$store.dispatch('MODIFY_USER', newInfo)
                    .then(res => {
                        alert(res);
                        this.users[this.modifyIndex].name = newInfo.name;
                        this.users[this.modifyIndex].account = newInfo.account;
                        this.users[this.modifyIndex].rank = newInfo.rank;
                        this.users[this.modifyIndex].faculty = newInfo.faculty;
                        this.users[this.modifyIndex].title = newInfo.title;
                        this.showDialog = false;
                    })
                    .catch(err => alert(err));
                // console.log(newInfo)
            },
            cancleModify() {
                this.showDialog = false;
            },
            rankToText(rank) {
                switch(rank) {
                    case 0:
                        return '普通用户';
                    case 1:
                        return '普通管理员';
                    case 2:
                        return '系统管理员';
                    case 3:
                        return '系统管理员';
                }
            },
            textToFaculty(rank) {
                switch(rank) {
                    case '1-1':
                        return {
                            type: '信息管理教研室',
                            index: '1-1'
                        };
                    case '1-2':
                        return {
                            type: '工业工程教研室',
                            index: '1-2'
                        };
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
    .modal
        absolute(top 0 left 0 right 0 bottom 0)
        background rgba(0, 0, 0, .5)
    .modal-form
        width 500px
        margin-top 50%
        background #fff
        transform translateY(-50%)
        border-radius 8px
        h2
            margin-top -15px
            margin-bottom 30px
        select
            outline none
        label
            display inline-block
            width 70px
            text-align right
        input,
        select
            width 250px
            height 25px
            font-size 20px
            line-height 25px
            border-radius 6px
        select
            height 30px
        .btn
            width 100px
            height 45px
            margin-bottom -10px
</style>