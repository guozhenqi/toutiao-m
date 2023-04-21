<template>
<div class='qa-container'>
    <van-nav-bar
    title="问答"
    left-arrow
    />
    <van-cell-group>
    <van-cell title="作为 IT 行业的过来人，你有什么话想对后辈说的？" value="" label="赞同 1000+评论 500+1小时前" >
        <div slot="icon" class="icon_img"></div>
    </van-cell>
    <van-cell title="作为 IT 行业的过来人，你有什么话想对后辈说的？" value="" label="赞同 1000+评论 500+1小时前" >
        <div slot="icon" class="icon_img"></div>
    </van-cell>
    <van-cell title="作为 IT 行业的过来人，你有什么话想对后辈说的？" value="" label="赞同 1000+评论 500+1小时前" >
        <div slot="icon" class="icon_img"></div>
    </van-cell>
    <van-cell title="作为 IT 行业的过来人，你有什么话想对后辈说的？" value="" label="赞同 1000+评论 500+1小时前" >
        <div slot="icon" class="icon_img"></div>
    </van-cell>
    </van-cell-group>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    name: "QaIndex",
    //import引入的组件需要注入到对象中才能使用
    components: {},
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

<style scoped>
.icon_img {
   background: url('@/assets/mobile.png');
   width: 200px;
   height: 200px;
   position: absolute;
   margin-left: 500px;
   margin-top: -62px;

}
</style>