<template>
	<div class='padding-top user'>
		 <ul class='per-list'>
            <li class='per-list-item' :class="{active: !isAdd}" @click='toggleAdd(1)'>
                    用户信息
            </li><li class='per-list-item' :class="{active: isAdd}" @click='toggleAdd(2)'>
                    添加用户
            </li>
        </ul>
        <table v-show='!isAdd'>
        	<tr>
        		<th>用户名</th>
        		<th>所属系</th>
        	</tr>
        	<tr v-for='item in users'>
        		<td>{{item.id}}</td>
        		<td>{{item.faculty}}</td>
        	</tr>
        </table>
        <form v-show='isAdd' class='add-user'>
        	<div class='group-con'>
        		<label>用户名：</label>
        		<input type="text" name="username" v-model='name'>
        	</div>
        	<div class='group-con'>
        		<label>初始密码：</label>
        		<input type="passowrd" name="pwd" v-model='pwd'>
        	</div>
        	<div class='group-con'>
        		<label>权限：</label>
        		<select v-model='rank'>
        			<option>普通用户</option>
        			<option>普通管理员</option>
        			<option>系统管理员</option>
        		</select>
        	</div>
        	<div class='group-con'>
        		<label>所属系：</label>
        		<select v-model='faculty'>
        			<option>校</option>
        			<option>数信</option>
        			<option>经管</option>
        			<option>外国语</option>
        		</select>
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
                rank: '',
                faculty: ''
            }
        },
        created() {
        	this.$store.dispatch('GET_USERS')
        		.catch(err => alert(err));
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
            	console.log(this.name);
            	console.log(this.rank);
            	console.log(this.rank);
            	console.log(this.faculty);
            }
        },
        computed: mapState(['users'])
	}
</script>

<style scoped lang='stylus'>
    @import '../css/common';
    @import '../css/funs';
     @import '../css/form';

   .user
   	text-align center
   table
   		margin 30px auto
   		text-align center
   		td
   			padding 10px 30px
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