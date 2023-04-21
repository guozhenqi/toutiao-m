<!--  -->
<template>
<div class='search-container'>
    <!-- 顶部搜索栏 -->
    <form class="search-form" action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
    />
    </form>
    <!-- 顶部搜索栏 -->

     <!-- 搜索结果 -->
    <search-result 
    v-if="isResultShow"
    :search-text="searchText"
    />
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion 
    v-else-if="searchText"
    :search-text="searchText"
    @search="onSearch"/>
    <!-- 联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history 
    v-else 
    :search-histories="searchHistories"
    @clear-search-histories="searchHistories = []"
    @search="onSearch"/>
    <!-- 搜索历史记录 -->
</div>
</template>

<script>
import router from '@/router';
import SearchHistory from "./components/search-history.vue"
import SearchSuggestion from "./components/search-suggestion.vue"
import SearchResult from "./components/search-result.vue"
import { setItem,getItem } from '@/utils/storage'

export default {
//import引入的组件需要注入到对象中才能使用
name: "SearchIndex",
components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
},
data() {
//这里存放数据
return {
     searchText: '',
     isResultShow: false,//控制搜索结果的展示
     searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] ,//搜索的历史记录
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
    searchHistories (value) {
        setItem('TOUTIAO_SEARCH_HISTORIES',value)
    }
},
//方法集合
methods: {
    onSearch(val) {
        //更新文本框内容
      this.searchText = val
      //存储搜索历史记录
      // 要求 ；不要有重复记录
      const index = this.searchHistories.indexOf(val)
      if(index !== -1){
        this.searchHistories.splice(index,1)
      }
      this.searchHistories.unshift(val)
      //展示搜索结果
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
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
.search-container {
    padding-top: 108px;
    .van-search__action {
        color: #fff;
    }
    .search-form {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
}
</style>