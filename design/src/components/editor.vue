<template>
    <div class='edit-wrapper'>
        <div class='tool'>
            <div class='item-wrapper'>
                <input type='button' data-type='bold' class='toolbtn bold' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='italic' class='toolbtn italic' @click='editEvent'/>
            </div><div class='item-wrapper'>
                <input type='button' data-type='link' class='toolbtn link' @click='editEvent'/>
                <!--<div class='inputt-wrapper' v-show='insertURL'>
                    <input type='text' class='insertURL' placeholder='请输入url' v-model='linkURL'/>
                    <input type='button' value='确定' class='btn btn-s btn-edit' @click='certianURL'/>
                </div>-->
            </div><div class='item-wrapper'>
                <input type='button' data-type='unlink' class='toolbtn unlink' @click='editEvent'/>
            </div><div class='item-wrapper item-font-wrapper'>
                <input type='button' data-type='fontSize' class='toolbtn fontSize'/>
                <div class='font-wrapper' @click='onSelectFontSize'>
                    <input type='button' value='1'/>
                    <input type='button' value='2'/>
                    <input type='button' value='3'/>
                    <input type='button' value='4'/>
                    <input type='button' value='5'/>
                    <input type='button' value='6'/>
                    <input type='button' value='7'/>
                </div>
            </div><div class='item-wrapper item-font-wrapper'>
                <input type='button' data-type='header' class='toolbtn header'/>
                <div class='font-wrapper' @click='onSelectHeader'>
                    <input type='button' value='h1'/>
                    <input type='button' value='h2'/>
                    <input type='button' value='h3'/>
                    <input type='button' value='h4'/>
                    <input type='button' value='h5'/>
                    <input type='button' value='h6'/>
                </div>
            </div><div class='item-wrapper'>
                <span class='toolbtn insertImage'></span>
                <input type='file' data-type='insertImage' class='toolbtn insertImageInput' @change='onInsertImage'/>
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
            <div class='edit' id='edit' contenteditable='plaintext-only' @focus='onFocus' @blur='onBlur'>
            </div>
            <span v-show='!isFocus && !contents' class='placeholder'>{{contentTip}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                el: '',
                btns: [
                    'bold',
                    'italic',
                    'link',
                    'unlink',
                    'fontSize',
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
                isFocus: false,
                contents: '',
                linkURL: '',
                selectText: '',
                contentTip: '请编辑。。。',
                inlineEle: ['span', 'i', 'b', 'label', 'small', 'a', 'em', 'font', 'strong', 'sub', 'sup', 'u']
            }
        },
        created() {
        },
        methods: {
            editEvent(e) {
                // console.log(type)
                // document.execCommand('bold', false, undefined)
                let type = e.target.getAttribute('data-type');
                switch(type) {
                    case 'bold':
                    console.log(this.getSelectionText())
                        this.exec('bold');
                        break;
                    case 'italic':
                        this.exec('italic');
                        break;
                    case 'link':
                        this.link();
                        break;
                    case 'unlink':
                        this.unLink();
                        break;
                    case 'header':
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
            getSelectionText() {
                return document.getSelection().toString();

            },
            isSelection() {
                this.selectText = this.getSelectionText();
                if(this.selectText.length === 0) {
                    alert('当前没有选中文本！');
                    return false;
                }
                return true;
            },
            exec(type, arg) {
                // console.log(type)
                document.execCommand(type, false, arg)
            },
            link() {
                if(!this.isSelection()) {
                    return;
                }

                let parent = document.getSelection().focusNode.parentNode;
                let href = 'http://';

                this.linkURL = prompt('请输入URL', parent.href);
                if(this.linkURL && this.linkURL !== 'http://' && this.linkURL !== 'https://') {
                    this.linkURL = /\:\/\//.test(this.linkURL) ? this.linkURL : href + this.linkURL;
                    if(parent.href) {
                        parent.href = this.linkURL;
                    }else {
                        this.exec('createLink', this.linkURL)
                        this.exec('foreColor', 'blue')
                        this.exec('underline')
                    }
                }
            },
            unLink() {
                // 获取祖先元素 color 值
                let ancestor = document.getSelection().focusNode.parentNode.parentNode.parentNode.parentNode,
                    color = parent.style.color || window.getComputedStyle(ancestor).color;

                this.exec('unlink')
                this.exec('foreColor', color)
                this.exec('underline')
            },
            onSelectFontSize(e) {
                let size = e.target.value || 1;
                this.exec('fontSize', size);
            },
            onSelectHeader(e) {
                let size = e.target.value || 'p';
                let format = document.queryCommandValue('formatBlock');

                format === size ? this.exec('formatBlock', 'p') : this.exec('formatBlock', size);
            },
            onInsertImage(e) {
                if(!FileReader) {
                    alert('您的浏览器不支持上传图片，建议使用高版本 Chorme 上传！');
                    return;
                }
                if(!e.target.files[0]) {
                    return;
                }

                let file = e.target.files[0],
                    reader = new FileReader(),
                    src = '',
                    self = this;

                reader.onload = function() {
                    src = this.result;
                    self.exec('insertImage', src || '');
                }

                reader.readAsDataURL(file);
            },
            onFocus() {
                this.isFocus = true;
            },
            onBlur() {
                this.contents = document.getElementById(this.id).innerHTML;
                this.isFocus = false;
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
        a
            color blue
            text-decoration underline
    .placeholder
        absolute(top 3px left 10px)
    .tool
        display inline-block
        margin-bottom 10px
    .item-wrapper
        relative()
        display inline-block
        &:hover
            background-color #ddd
    .toolbtn
        display inline-block
        width 40px
        height 25px
        padding 0
        border none
        outline none
        background-color #fff
        background url(../imgs/icons/bold.png) center no-repeat
        cursor pointer
        &:hover
            background-color #ddd
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
    .insertImageInput
        absolute(top 0 left 0)
        opacity 0
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
    .item-font-wrapper
        &:hover
            .font-wrapper
                visibility visible
    .font-wrapper
        absolute(top 25px)
        border 1px solid #ccc
        cursor pointer
        background #fff
        z-index 9
        visibility hidden
        input
            width 35px
            height 30px
            border none
            outline none
            background transparent
            cursor pointer
            &:hover
                color #fff
                background-color #53c3e7
    .insertURL
        padding 5px 8px
        border 1px solid #3fc6bb
        outline none
        font-size 16px
        border-radius 4px
</style>