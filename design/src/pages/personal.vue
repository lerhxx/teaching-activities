<template>
    <div class='padding-top personal'>
        <div>
            <h2 class='user'>{{this.userId}}</h2>
        </div>
        <ul class=''>
            <li class='count-list-item'>
                <router-link to='/'>
                    文章
                </router-link>
            </li>
            <li class='count-list-item'>
                <router-link to='/'>
                    统计
                </router-link>
            </li>
        </ul>
        <ul class='list'>
            <li class='list-item' v-for='item in selfArticles'>
				<router-link :to="{name: 'article', params:{id: item._id}}">
					<img :src='item.url' />
					<h3 class='text-ellipsis'>
                        {{item.title}}
                    </h3>
				</router-link>
                <p class='time color-g'>{{item.time | timeFormat}}</p>
                <p class='abstract'>{{item.content | filterContent}}</p>
                <div class='group-btn'>
                    <span class='color-b' @click='edit(item)'>编辑</span>
                    <span class='color-g' @click='deleteArt(item)'>删除</span>
                </div>
			</li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {get} from '../assets/cookieUtil';
    export default {
        created() {
            let user = this.userId ? this.userId : get('user');
            if(user) {
                this.$store.dispatch('GET_SELF_ARTICLES', {id: user})
                    .catch(err => alert(err));
            }else {
                this.$router.push({name: 'index'});
            }
        },
        methods: {
            edit(item) {
                this.$store.commit('SET_EDITINT_MODE', true);
                this.$router.push({name: 'articleEdit', params: {artId: item._id}});
                // this.$store.dispatch('EDIT_ARTICLE', {id: item._id})
                //     .catch(err => alert(err));
            },
            deleteArt(item) {
                this.$store.dispatch('DELETE_ARTICLE', {id: item._id})
                    .then(res => alert(res.data.msg))
                    .catch(err => alert(res.data.msg))
            }
        },
        computed: mapState(['userId', 'selfArticles']),
        filters: {
            timeFormat(value) {
                let date = new Date(value);
                return `${date.getFullYear()}年${date.getMonth() > 9 ? date.getgetMonthHours() : '0' + date.getMonth()}月${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}日 
                        ${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:
                        ${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;
            },
			filterContent(value) {
                let len = value.substr(0, 102).replace(/[^\x00-\xff]/g,"01").length,
                    newValue = value;
				if(len > 102) {
					let index = 0;
					for(let i = 0; i < value.length || i < 102; ++i) {
						if(/^[\x00-\xff]$/.test(value[i])) {
							index ++;
						}else {
							index += 2;
						}
						if(index > 102) {
							newValue = value.substr(0, 102) + '...';
							break;
						}
					}
				}
                // console.log(value)
				return newValue;
			}
        }
    }
</script>

<style scoped lang='stylus'>
    @import '../css/common';
    @import '../css/funs';

    .personal
        width 90%
        min-width 800px
        margin 0 auto
    .user
        margin 20px 0
        text-align center
        font-size 25px
    .count-list-item
        display inline-block
        padding 5px
        border 1px solid #ddd
        border-radius(8px)
    .list-item
        display inline-block
        width 32.5%
        padding 15px 8px 15px 0
        margin 5px 0
        vertical-align top
        box-sizing border-box
        box-shadow 2px 0px 0px 0px #ddd
        &:nth-child(2n)
            margin 5px 1.25%
        img
            display block
            width 100%
            height 120px
            margin auto
    h3
        display inline-block
        max-width 100%
        margin-top 15px
        font-size 20px
        a
            &:after
                display block
                width 100%
                margin auto
                border-bottom 1px solid #000
                content ''
                transform scale3d(0, 1, 1)
                transition transform .15s ease-in-out
            &:hover:after
                transform scale3d(1, 1, 1)
    .time
        margin-bottom 10px
        font-size 14px
    .group-btn
        margin-top 10px
        text-align left
        font-size 12px
        cursor pointer
        span
            margin-right 10px

</style>