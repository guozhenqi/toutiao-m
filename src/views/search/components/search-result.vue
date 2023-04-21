<!--  -->
<template>
<div class='search-result'>
    <van-list
    v-model="loading"
    :finished="finished"
    error-text="加载失败,请点击重试"
    :error.sync="error"
    finished-text="没有更多了"
    @load="onLoad"
    >
    <van-cell 
    v-for="(article,index) in list" 
    :key="index" 
    :title="article.title"
    :to="{
        name: 'article',
        params: {
            articleId: article.art_id
        }
    }" />
    </van-list>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getSearchResult } from '@/api/search'
export default {
//import引入的组件需要注入到对象中才能使用\
name: "SearchResult",
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
    list: [],
    loading: false,
    finished: false,
    page: 1,
    per_page: 10,
    error: false
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    // 1.请求获取数据
    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page,//页码
          per_page: this.per_page,//每页大小
          q: this.searchText
        })
        // 2.将数据加载到数组列表中
        const { results } = data.data
        this.list.push(...results)
        // 3.将本次加载中的loading关闭
        this.loading = false
        // 4.判断是否含有数据
        if(results.length){
          this.page++
        }else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
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

<style scoped>

</style>