<!--  -->
<template>
<div class='channel-edit'>
    <van-cell :border="false">
        <div slot="title" class="title-text">我的频道</div>
        <van-button 
        class="edit-btn"
        type="danger" 
        plain 
        round 
        size="mini"
        @click="isEdit = !isEdit">{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
        <van-grid-item 
        class="grid-item"
        v-for="(channel,index) in myChannels" 
        :key="index" 
        @click="onMyChannelClick(channel,index)"
        >
            <van-icon 
            slot="icon" 
            name="clear"
            v-show="isEdit && !fiexChannels.includes(channel.id)"></van-icon>
            <span 
            class="text" 
            slot="text"
            :class="{active: index === active}">
                {{channel.name}}
            </span>
        </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
     <van-cell :border="false">
        <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
        <van-grid-item
         class="grid-item" 
        v-for="(channel,index) in recommendChannels" 
        :key="index" 
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)" />
    </van-grid>
    <!-- 频道推荐 -->
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getAllChannels,addUserChannel,deleteUserChannel } from "@/api/channel"
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
//import引入的组件需要注入到对象中才能使用
name:"ChannelEdit",
components: {},
props:{
    myChannels: {
        type: Array,
        required: true
    },
    active: {
        type: Number,
        required: true
    }
},
data() {
//这里存放数据
return {
    allChannels: [],//所有频道
    isEdit: false,//控制编辑状态的显示
    fiexChannels: [0],//固定频道不允许删除
};
},
//监听属性 类似于data概念
computed: {
    ...mapState(['user']),
    recommendChannels () {  
        // return this.allChannels.filter(channel => {
        //  const channels = []

        //  数组的 find 方法：遍历数组，把符合条件的第1个元素返回
        // return !this.myChannels.find(myChannel => {
        //   return myChannel.id === channel.id
        // })

        //  return channels 
        const channels = []
        this.allChannels.forEach(channel => {
            const ret = this.myChannels.find(myChannel => {
                return myChannel.id === channel.id
            })
            // 如果我的频道中不包含该频道项
            if(! ret) {
                channels.push(channel)
            }
        })
        return channels
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    async loadAllChannels (){
        try {
            const { data } = await getAllChannels()
            console.log(data);
            this.allChannels = data.data.channels
        } catch (error) {
            this.$toast("数据获取失败")
        }
    },
    async onAddChannel (channel) {
        this.myChannels.push(channel)
        if(this.user){
            //已登录,存储在线上
            try {
                await addUserChannel({
                id: channel.id,//频道id
                seq: this.myChannels.length//序号
            })
            } catch (error) {
                this.$toast("保存失败")
            }
        }else {
            //存储在本地
            setItem('TOUTIAO_CHANNELS',this.myChannels)
        }
    },
    onMyChannelClick(channel,index) {
        //如果是编辑状态，则执行删除频道
        if(this.isEdit) {
            if(this.fiexChannels.includes(channel.id)){
                return
            }
            this.myChannels.splice(index,1)
            if(index < this.active){
                //让激活频道的索引减去1
                this.$emit('update-active',this.active - 1,true)
            } 
            //处理持久化
            this.deleteChannel(channel)                 
        }else {
            //非编辑状态切换频道
            this.$emit('update-active',index,false)
        }   
    },
    async deleteChannel (channel) {
        try {
            if(this.user){
                //已经登陆，将数据更新到线上
                await deleteUserChannel(channel.id)
            }else {
                //未登录，将数据更新到本地
                setItem('TOUTIAO_CHANNELS',this.myChannels)
            }
        } catch (error) {
            this.$toast('删除频道失败')
        }
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.loadAllChannels()
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
.channel-edit {
    padding: 85px 0;
    .title-text {
        font-size: 32px;
        color: #333333;
    }
    .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }
    /deep/ .grid-item {
        width: 160px;
        height: 86px;
        .van-grid-item__content {
            white-space: nowrap;
            background-color: #f4f5f6;
            .van-grid-item__text, .text {
                font-size: 28px;
                color: #222;
                margin-top: 0;               
            }
            .active {
                color: red;
            }
            .van-grid-item__icon-wrapper {
                position: unset;
            }
        }
    }
    /deep/ .my-grid {
        .grid-item {
            .van-icon-clear {
                position: absolute;
                right: -10px;
                top: -10px;
                font-size: 30px;
                color: #cacaca;
                z-index: 2;
            }
        }
    }

    /deep/ .recommend-grid {
        .grid-item{
            .van-grid-item__content {
                flex-direction: row;
                .van-icon-plus {
                    font-size: 28px;
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>