<template>
    <div class='group-btn modify-toolbars'>
        <span class='color-b' @click='edit'>编辑</span>
        <span class='color-g' @click='deleteArt'>删除</span>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object
            },
            cb: {
            },
            params: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        methods: {
            edit(item) {
                this.$store.commit('SET_EDITINT_MODE', true);
                this.$router.push({name: 'articleEdit', params: {artId: this.item._id}});
            },
            deleteArt(item) {
                if(!this.cb) {
                    alert('请传入“cb”参数！');
                    return;
                }
                console.log(this.params)
                let self = this;
                this.$store.dispatch('DELETE_ARTICLE', {id: this.item._id})
                    .then(res => {
                        alert(res);
                        if(self.cb instanceof Function) {
                            self.cb()
                        }else {
                            this.$store.dispatch(this.cb, this.params);
                        }
                    })
                    .catch(err => alert(err))
            }
        },
    }
</script>

<style scoped lang='stylus'>
    .modify-toolbars
        span
            cursor pointer
</style>