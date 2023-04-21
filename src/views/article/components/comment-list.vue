<!--  -->
<template>
    <van-list
    v-model="loading"
    :finished="finished"
    :error="error"
    error-text="加载失败，请点击重试"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
    >
    <comment-item
    v-for="(item,index) in list" 
    :key="index" 
    :comment="item"
    @reply-click="$emit('reply-click',$event)" />
    </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
//import引入的组件需要注入到对象中才能使用
name: "CommentList",
components: {
    CommentItem
},
props :{
    source: {
        type: [Number,String,Object],
        required: true
    },
    list: {
        type: Array,
        default: function () {
            return []
        }
    },
    type: {
        type: String,
        validator (value) {
            return ['a','c'].includes(value)
        },
        default: 'a'
    }
},
data() {
//这里存放数据
return {
    //list: [],
    loading: false,
    finished: false,
    offset: null,// 获取下一页数据的标记
    limit: 10,
    error: false
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
            // 1.请求获取数据
            const { data } = await getComments ({
                type: this.type,  // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
                source: this.source.toString(), // 源id，文章id或评论id
                offset: this.offset,
                limit: this.limit
            })
            // 2.将数据添加到列表中
            const { results, total_count: totalCount } = data.data
            this.list.push(...results)
            this.$emit("onload-success",data.data)
            // 3.将loading设置为false
            this.loading = false
            // 4. 判断是都含有数据
            if(results.length){
                this.offset = data.data.last_id
            }else {
                this.finished = true
            }
            //    有更新下一页的数据
            //    没有将finished设置为true
        } catch (error) {
            this.error = true
            this.loading = false
        }
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.loading = true
    this.onLoad()
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