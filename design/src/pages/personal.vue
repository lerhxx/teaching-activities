<template>
    <div class='padding-top'>
        <div>
            <p class='user'>{{this.userId}}</p>
        </div>
        <ul>
            <li v-for='item in selfArticles'>
                <h3>
                    <router-link :to="{name: 'article', params: {id: item._id}}">
                        item.title
                    </router-link>
                </h3>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    export default {
        created() {
            this.GET_SELF_ARTICLES()
                .catch(err => alert(err));
        },
        methods: mapActions(['GET_SELF_ARTICLES']),
        computed: mapState(['userId', 'selfArticles'])
    }
</script>

<style scopred lang='stylus'>
    @import '../css/common';
    .user 
        font-weight bold
</style>