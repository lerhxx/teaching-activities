<template>
    <div class='edit-wrapper'>
        <div class='tool'>
            <span type='button' v-for='btn in btns' :data-type='btn' :class='btn' class='toolbtn' @click='editEvent(btn)'></span>
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
                    'link',
                    'unlink',
                    'font',
                    'fontSize',
                    'foreColor',
                    'header',
                    'insertImage',
                    'justifyCenter',
                    'justifyFull',
                    'justifyLeft',
                    'justifyRight',
                    'strike',
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
    .toolbtn
        display inline-block
        width 16px
        height 16px
        margin 0 5px
        background-color #fff
    .bold
        background url(../imgs/icons/bold.png) center no-repeat
    .italic
        background url(../imgs/icons/italic.png) center no-repeat
    .link
        background url(../imgs/icons/link.png) center no-repeat
    .unlink
        background url(../imgs/icons/unlink.png) center no-repeat
    .font
        background url(../imgs/icons/font-fam.png) center no-repeat
    .fontSize
        background url(../imgs/icons/font-size.png) center no-repeat
    .foreColor
        background url(../imgs/icons/color.png) center no-repeat
    .header
        background url(../imgs/icons/header.png) center no-repeat
    .insertImage
        background url(../imgs/icons/pic.png) center no-repeat
    .justifyCenter
        background url(../imgs/icons/ju-center.png) center no-repeat
    .justifyFull
        background url(../imgs/icons/ju-full.png) center no-repeat
    .justifyLeft
        background url(../imgs/icons/ju-left.png) center no-repeat
    .justifyRight
        background url(../imgs/icons/ju-right.png) center no-repeat
    .strike
        background url(../imgs/icons/strike.png) center no-repeat
    .underline
        background url(../imgs/icons/underline.png) center no-repeat
    .copy
        background url(../imgs/icons/copy.png) center no-repeat
    .cut
        background url(../imgs/icons/cut.png) center no-repeat
    .paste
        background url(../imgs/icons/paste.png) center no-repeat
</style>