<!--  -->
<template>
<div class='searcj-history'>
    <van-cell title="搜索历史">
        <div v-if="isDeleteShow">
            <span @click="$emit('clear-search-histories',[])">全部删除</span>
            &nbsp; &nbsp;
            <span @click="isDeleteShow = false">完成</span>
        </div>
        <van-icon name="delete" v-else @click="isDeleteShow = true"/>
    </van-cell>
    <van-cell 
    :title="item"
    v-for="(item,index) in searchHistories"
    :key="index"
    @click="onSearchItem(item,index)">
        <van-icon name="close" v-if="isDeleteShow"/>
    </van-cell>
    
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
name: "SearchHistory",
components: {},
props: {
      // Prop 数据
    //  Prop 是受父组件数据影响的
    //    如果是普通数据（数字、字符串、布尔值）绝对不能修改
    //    即便改了也不会传导给父组件
    //
    //    如果是引用类型数据（数组、对象）
    //        可以修改，例如 [].push(xxx)，对象.xxx = xxx
    //        不能重新赋值, xxx = []
    searchHistories: {
        type: Array,
        required: true
    }
},
data() {
//这里存放数据
return {
    isDeleteShow:false
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    onSearchItem(item,index){
        if(this.isDeleteShow){
            //删除状态
            this.searchHistories.splice(index,1)       
        } else {
            this.$emit('search',item)
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