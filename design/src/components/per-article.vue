<template>
    <div class='per'>
        <ul class='list'>
            <li class='list-item' v-for='item in selfArticles'>
                <router-link :to="{name: 'article', params:{id: item._id}}">
                    <img :src='item.url' />
                    <h3 class='text-ellipsis'>
                        {{item.title}}
                    </h3>
                </router-link>
                <p class='time color-g'>{{item.time | timeFormat}}</p>
                <p class='abstract' v-html='filterContent(item.content)'></p>
                <modify :item='item'></modify>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {get} from '../assets/cookieUtil';
    import modify from '../components/modify.vue';
    export default {
        data() {
            return {
                isPerArt: true
            }
        },
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
        },
        computed: mapState(['userId', 'selfArticles']),
        filters: {
            timeFormat(value) {
                let date = new Date(value);
                let year = date.getFullYear();
                let mon = date.getMonth();
                let day = date.getDate();
                let hours = date.getMonth();
                let mins = date.getDate();
                return `${year}年${mon > 9 ? mon : '0' + mon}月${day > 9 ? day : '0' + day}日 
                        ${hours > 9 ? hours : '0' + hours}:
                        ${mins > 9 ? mins : '0' + mins}`;
            },
        },
        components: {
            modify
        }
    }
</script>

<style scoped lang='stylus'>
    @import '../css/common';
    @import '../css/form';

    .per
        padding 0 20px
    .list
        justify-content flex-start
    .list-item
        width 32.5%
        padding 15px 8px 15px 0
        margin 5px 0
        vertical-align top
        box-sizing border-box
        box-shadow 2px 0px 0px 0px #ddd
        &:nth-child(3n-1)
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
</style>