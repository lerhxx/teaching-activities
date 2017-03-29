<template>
    <div class='edit-wrapper'>
        <div class='tool'>
            <button type='button' v-for='btn in btns' :data-type='btn' @click='editEvent(btn)'>{{btn}}</button>
        </div>
        <div class='edit' contenteditable=true @focus='onFocus' @blur='onBlur'>
            {{content}}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                btns: [
                    'bold',
                    'italic',
                    'h1',
                    'link',
                    'unlink',
                    'fontName',
                    'fontSize',
                    'foreColor',
                    'formatBlock',
                    'insertImage',
                    'justifyCenter',
                    'justifyFull',
                    'justifyLeft',
                    'justifyRight',
                    'strikeThrough',
                    'underline',
                    'copy',
                    'cut',
                    'paste'
                ],
                content: '',
                contentTip: '请编辑。。。'
            }
        },
        created() {
            this.content = this.contentTip
        },
        methods: {
            editEvent(type) {
                console.log(type)
                // document.execCommand('delete', false, null)
                switch(type) {
                    case 'bold':
                        break;
                    case 'italic':
                        break;
                    case 'h1':
                        break;
                    case 'link':
                        break;
                    case 'unlink':
                        break;
                    case 'fontName':
                        break;
                }
            },
            onFocus() {
                if(this.content === this.contentTip) {
                    this.content = '';
                }
            },
            onBlur() {
                if(!this.content) {
                    this.content = this.contentTip;
                }
            }
        }
    }
</script>

<style scoped lang='stylus'>
    .edit
        width 100%
        min-height 300px
        padding 5px 10px
        border 1px solid #c9d8db
        outline none
    .tool
        display inline-block
        margin-bottom 10px
        button
            display inline-block
            padding 5px 10px
            color #fff
            border none
            outline none
            border-right 1px solid rgba(0, 0, 0, .3)
            box-shadow 1px 0 1px rgba(255, 255, 255, .3)
            background #000
            background -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,0.30)), color-stop(0.5, rgba(255,255,255,0.10)), color-stop(0.5, rgba(255,255,255,0.00))), -webkit-gradient(linear, left top, left bottom, from(#5c5c5c), to(#292929))
            background linear-gradient(rgba(255,255,255,0.30), rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.00) 50%), linear-gradient(#5c5c5c, #292929)
            //border-radius 5px
            &:last-child
                border-right-width 0
</style>