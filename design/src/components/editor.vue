<template>
    <div class='edit-wrapper'>
        <div class='tool'>
            <div class='item-wrapper'>
                <input type='button' data-type='bold' class='toolbtn bold' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='italic' class='toolbtn italic' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='link' class='toolbtn link' @click='editEvent'/>
                <div class='inputt-wrapper' v-show='insertURL'>
                    <input type='text' class='insertURL' placeholder='请输入url' v-model='linkURL'/>
                    <input type='button' value='确定' class='btn btn-s btn-edit' @click='certianURL'/>
                </div>
            </div><div class='item-wrapper'>
                <input type='button' data-type='unlink' class='toolbtn unlink' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='font' class='toolbtn font' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='fontSize' class='toolbtn fontSize' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='foreColor' class='toolbtn foreColor' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='header' class='toolbtn header' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='insertImage' class='toolbtn insertImage' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='justifyCenter' class='toolbtn justifyCenter' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='justifyFull' class='toolbtn justifyFull' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='justifyLeft' class='toolbtn justifyLeft' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='justifyRight' class='toolbtn justifyRight' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='strike' class='toolbtn strike' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='underline' class='toolbtn underline' @click='editEvent'/>
            </div>
        </div>
        <div class='edit-outter'>
            <div class='edit' id='edit' contenteditable=true @focus='onFocus' @blur='onBlur'>
            </div>
            <span v-show='!isFocus && !content' class='placeholder'>{{contentTip}}</span>
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
                    'underline'
                ],
                id: 'edit',
                insertURL: false,
                isFocus: false,
                contents: [],
                linkURL: '',
                contentTip: '请编辑。。。'
            }
        },
        created() {
            console.log(this.content)
        },
        methods: {
            editEvent(e) {
                // console.log(type)
                // document.execCommand('bold', false, undefined)
                let type = e.target.getAttribute('data-type');
                switch(type) {
                    case 'bold':
                        this.exec('bold');
                        break;
                    case 'italic':
                        this.exec('italic');
                        break;
                    case 'link':
                        this.insertURL = !this.insertURL;
                        break;
                    case 'unlink':
                        this.exec('unlink');
                        break;
                    case 'font':
                        break;
                    case 'fontSize':
                        break;
                    case 'foreColor':
                        break;
                    case 'header':
                        break;
                    case 'insertImage':
                        break;
                    case 'justifyCenter':
                        this.exec('justifyCenter');
                        break;
                    case 'justifyFull':
                        this.exec('justifyFull');
                        break;
                    case 'justifyLeft':
                        this.exec('justifyLeft');
                        break;
                    case 'justifyRight':
                        this.exec('justifyRight');
                        break;
                    case 'strike':
                        this.exec('strikeThrough');
                        break;
                    case 'underline':
                        this.exec('underline');
                        break;
                }
            },
            exec(type, arg) {
                document.execCommand(type, false, arg)
            },
            certianURL() {
                if(this.linkURL) {
                    this.exec('createLink', this.linkURL)
                }
                this.insertURL = !this.insertURL;
            },
            onFocus() {
                this.isFocus = true;
            },
            onBlur() {
                this.contents = document.getElementById(this.id).childNodes;
                this.isFocus = false;
                console.log(this.contents)
            }
        }
    }
</script>

<style scoped lang='stylus'>
    @import '../css/funs';
    @import '../css/form';
    .edit-outter
        relative()
    .edit
        width 100%
        min-height 300px
        padding 5px 10px
        border 1px solid #c9d8db
        outline none
    .placeholder
        absolute(top 3px left 10px)
    .tool
        display inline-block
        margin-bottom 10px
    .item-wrapper
        relative()
        display inline-block
    .toolbtn
        display inline-block
        width 16px
        height 16px
        margin 0 5px
        border none
        outline none
        background-color #fff
        background url(../imgs/icons/bold.png) center no-repeat
        cursor pointer
    .bold
        background-image url(../imgs/icons/bold.png)
    .italic
        background-image url(../imgs/icons/italic.png)
    .link
        background-image url(../imgs/icons/link.png)
    .unlink
        background-image url(../imgs/icons/unlink.png)
    .font
        background-image url(../imgs/icons/font-fam.png)
    .fontSize
        background-image url(../imgs/icons/font-size.png)
    .foreColor
        background-image url(../imgs/icons/color.png)
    .header
        background-image url(../imgs/icons/header.png)
    .insertImage
        background-image url(../imgs/icons/pic.png)
    .justifyCenter
        background-image url(../imgs/icons/ju-center.png)
    .justifyFull
        background-image url(../imgs/icons/ju-full.png)
    .justifyLeft
        background-image url(../imgs/icons/ju-left.png)
    .justifyRight
        background-image url(../imgs/icons/ju-right.png)
    .strike
        background-image url(../imgs/icons/strike.png)
    .underline
        background-image url(../imgs/icons/underline.png)
    .copy
        background-image url(../imgs/icons/copy.png)
    .cut
        background-image url(../imgs/icons/cut.png)
    .paste
        background-image url(../imgs/icons/paste.png)
    .inputt-wrapper
        absolute(top 25px)
        white-space nowrap
    .insertURL
        padding 5px 8px
        border 1px solid #3fc6bb
        outline none
        font-size 16px
        border-radius 4px
</style>