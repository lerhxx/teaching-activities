<template>
    <div class='group-btn'>
        <span class='color-b' @click='edit(item)'>编辑</span>
        <span class='color-g' @click='deleteArt(item)'>删除</span>
    </div>
</template>

<script>
    export default {
        props: [
            'item'
        ],
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
    }
</script>