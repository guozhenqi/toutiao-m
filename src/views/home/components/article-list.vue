<!-- 文章列表组件 -->
<template>
<div class='article-list'>
<van-pull-refresh 
v-model="isFreshLoading" 
@refresh="onRefresh"
:success-text="refreshSuccessText"
:success-duration="1500">
    <van-list
    v-model="loading"
    :finished="finished"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    finished-text="没有更多了"
    @load="onLoad"
    >
    <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
    <article-item 
    v-for="(article,index) in list" :key="index" :title="article.title" :article="article"/>
    </van-list>
</van-pull-refresh>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getArticles} from "@/api/article"
import ArticleItem from "@/components/article-item"
export default {
name: "ArticleList",
//import引入的组件需要注入到对象中才能使用
components: {
    ArticleItem
},
props: {
    channel:{
    type:Object,
    required:true
    }
},
data() {
//这里存放数据
return {
    list: [],
    loading: false,
    finished: false,
    timestamp: null ,//请求获取下一页的时间戳
    error: false,     //控制列表失败的提示状态
    isFreshLoading: false,
    refreshSuccessText: "刷新成功"
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    async onLoad() {
        try {
            //1.请求获取数据
            const {data} = await getArticles({
                channel_id: this.channel.id,
                timestamp: this.timestamp || Date.now(),
                with_top: 0
            })
            //2.把数据放入list中
            const { results } = data.data
            //数组的展开操作符，把数据展开  
            this.list.push(...results)
            //3.本次数据加载数据之后要把加载状态设置为结束  加载状态结束
            this.loading  = false
            //4.loading关闭之后才能触发下一次的加载
            if(results.length){
                //更新获取下一页的时间戳
                this.timestamp = data.data.pre_timestamp
            }else{
                //没有数据将finished设置为true
                this.finished =true
            }
        } catch (error) {
            this.error = true
            this.loading= false
        } 
    },
    async onRefresh(){
        try {
            //请求获取数据
            const {data} = await getArticles({
                channel_id: this.channel.id,
                timestamp: Date.now(),
                with_top: 0
            })
            //测试加载失败
            // if(Math.random() > 0.2){
            //     JSON.parse('sssudsaun')
            // }
            //拿数据放到顶部
            this.list.unshift(...data.data.results)
            //关闭下拉刷新的loading状态
            this.isFreshLoading = false
            this.refreshSuccessText = "刷新成功，更新了10条数据"
        } catch (error) {
            this.isFreshLoading = false
            this.refreshSuccessText="刷新失败，请重试"
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

<style scoped lang ="less">
.article-list{
    height: 79vh;
    overflow-y: auto;
}
</style>