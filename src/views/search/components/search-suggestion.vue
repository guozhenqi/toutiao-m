<!--  -->
<template>
<div class='search-suggestion'>
    <van-cell
    v-for="(text,index) in suggestions" 
    :key="index" 
    icon="search"
    @click="$emit('search',text)"
    >
        <div slot="title" v-html="hightlight(text)"></div>
    </van-cell>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import{ getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
//import引入的组件需要注入到对象中才能使用
name: "SearchSuggestion",
components: {},
props: {
    searchText: {
        type: String,
        required: true
    }
},
data() {
//这里存放数据
return {
    suggestions: [],
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
    searchText: {
        //当searchText发生变化时就会调用handler函数
        // 注意： handler函数名称是固定的
        handler: debounce(function(value){
            this.loadSearchSuggestions(value)
        },1000),
        immediate:true
    }
},
//方法集合
methods: {
    async loadSearchSuggestions (q) {
        try {
            const { data } = await getSearchSuggestion(q)
            this.suggestions = data.data.options
        } catch (error) {
            this.$toast("数据获取失败")
        }
    },
    hightlight (text) {
        const highlightStr = `<span class="active">${this.searchText}</span>`
        //正则v表达式中间都会当作匹配字符来使用，不是数据变量
        // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
        const reg = new RegExp(this.searchText,'gi')
        return text.replace(reg,highlightStr)
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style scoped lang="less">
    .search-suggestion {
        /deep/ span.active {
            color:#3296fa;
        }
    }
</style>