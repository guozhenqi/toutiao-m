<template>
<div class='home-container'>
    <van-nav-bar 
    class="page-nav-bar" 
    fixed
    >
      <van-button 
      class="search-btn" 
      slot="title" 
      type="info" 
      size="small" 
      round icon="search"
      to="/search">搜索</van-button>
    </van-nav-bar>

    <!-- 频道 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
        <van-tab 
        :title="channel.name"
        v-for="channel in channels"
        :key = "channel.id"
         >
         <!-- 文章列表 -->
         <article-list :channel="channel"/>
        </van-tab>
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow=true">
            <i class="toutiao toutiao-gengduo"></i>
        </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
        <van-popup
        v-model="isChannelEditShow"
        closeable
        position="bottom"
        close-icon-position="top-left"
        :style="{ height: '100%' }"
        >
            <channel-edit 
            :my-channels="channels"
            :active="active"
            @update-active="onUpdateActive" />
        </van-popup>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {getUserChannels} from "@/api/user"
import ArticleList from './components/article-list.vue'
import ChannelEdit from "./components/channel-edit.vue"
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
    name:"HomeIndex",
    //import引入的组件需要注入到对象中才能使用
    components: {
        ArticleList,
        ChannelEdit
    },
    data() {
    //这里存放数据
    return {
        active: 0,
        channels: [], //频道列表
        isChannelEditShow: false, //控制编辑频道弹出层的显示状态
    };
    },
    //监听属性 类似于data概念
    computed: {
        ...mapState(['user'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        async loadChannels (){
            try {
                let channels = []
                if(this.user){
                    const {data} = await getUserChannels()
                    channels = data.data.channels
                }else {
                    const localChannels = getItem('TOUTIAO_CHANNELS')
                    if(localChannels){
                        channels = localChannels
                    }else {
                        const {data} = await getUserChannels()
                        channels = data.data.channels
                    }
                }
                this.channels = channels
            } catch (error) {
                this.$toast('获取频道数据失败')
            }
        },

        onUpdateActive(index,isChannelEditShow = true){
            this.active = index
            this.isChannelEditShow = isChannelEditShow
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.loadChannels()
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

<style scoped lang='less'>
.home-container {
    padding-bottom: 100px;
    padding-top: 174px;
    ::v-deep .van-nav-bar__title {
        max-width: unset;
    }
    .search-btn {
        width: 555px;
        height: 64px;
        background-color: #5babfb;
        border: none;
        font-size: 28px;
        .van-icon {
            font-size: 32px;
        }
    }

  /deep/ .channel-tabs {
        .van-tabs__wrap {
            position: fixed;
            top: 92px;
            z-index: 1;
            left: 0;
            right: 0;
            height: 82px;
        }
        .van-tab {
            min-width: 200px;     
            border-right: 1px solid #edeff3;
            font-size: 30px;
            color: #777777;
        }
        .van-tabs--active {
            color: #333333;
        }
        .van-tabs__nav {
            padding-bottom: 0;
        }
        .van-tabs__line {
            bottom: 8px;
            width: 31px !important;
            height: 6px;
            background-color: #3296fa;
        }
        .hamburger-btn {
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 66px;
            height: 82px;
            background-color: #fff;
            opacity: 0.902;
            right: 0;
            i.toutiao {
                font-size: 33px;
            }
            &:before {
                content: '';
                width: 2px;
                height: 100%;
                position: absolute;
                left: 0;
                background-image: url("~@/assets/gradient-gray-line.png");
                background-size: contain;
            }
        }
        .placeholder {
            flex-shrink: 0;
            width: 50px;
            height: 82px;
        }
    }
}
</style>