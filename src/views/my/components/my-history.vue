<!--  -->
<template>
<div class='my-history'>
   <!-- 导航栏 -->
    <van-nav-bar
    title="阅读历史"
    left-text="取消"
    @click-left="$emit('close')"
     />
    <!-- /导航栏 -->

    <van-cell 
    class="article-item"
    :to="{
        name: 'article',
        params: {
            articleId: item.art_id
        }
    }"
    v-for="(item,index) in myhistory"
    :key="index"
     >
        <div slot="title" class="title van-multi-ellipsis--l2">{{item.title}}</div>
        <div class="label-info-right">
            <span>{{item.aut_name}}</span>
            <span>{{item.comm_count}}评论</span>
            <span>{{item.pubdate | relativeTime}}</span>
        </div>
    </van-cell>
</div>
</template>

<script>
export default {
//import引入的组件需要注入到对象中才能使用
name: "MyHistory",
components: {},
props: {
  myhistory: {
    type: Array,
    required: true
  }
},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

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
.article-item {
   display: flex;
   flex-direction: column;
    .title {
        font-size: 32px;
        color: #3a3a3a;
    }
    .van-cell__value {
        width: 502px;
        height: 146px;
        text-align: left;
    }
    .label-info-right span {
        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px;
    }
}
</style>