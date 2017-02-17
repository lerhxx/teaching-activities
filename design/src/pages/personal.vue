<template>
    <div class='padding-top personal'>
        <div>
            <h2 class='user'>{{this.userId}}</h2>
        </div>
        <ul class='list'>
            <li class='list-item' v-for='item in selfArticles'>
				<router-link :to="{name: 'article', params:{id: item._id}}">
					<img :src='item.url' />
					<h3 class='text-ellipsis'>
                        <router-link :to='{name: "article"}'>
                            {{item.title}}
                        </router-link>
                    </h3>
				</router-link>
                <p class='time color-g'>{{item.time | timeFormat}}</p>
                <p class='abstract'>{{item.content | filterContent}}</p>
                <div class='group-btn'>
                    <span class='color-b'>编辑</span>
                    <span class='color-g'>删除</span>
                </div>
			</li>
        </ul>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
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
        methods: mapActions(['GET_SELF_ARTICLES']),
        computed: mapState(['userId', 'selfArticles']),
        filters: {
            timeFormat(value, len) {
                let date = new Date(value);
                return `${date.getFullYear()}年${date.getMonth() > 9 ? date.getgetMonthHours() : '0' + date.getMonth()}月${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}日 
                        ${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:
                        ${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;
            },
			filterContent(value) {
				return value.length > 51 ? value.substr(0, 51) + '...' : value;
			}
        }
    }
</script>

<style scoped lang='stylus'>
    .personal
        width 90%
        min-width 800px
        margin 0 auto
    .user
        margin 20px 0
        text-align center
        font-size 25px
    .list-item
        display inline-block
        width 33.33%
        padding 15px 10px
        vertical-align top
        box-sizing border-box
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