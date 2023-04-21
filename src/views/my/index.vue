<template>
<div class='my-container'>

     <div v-if="user" class="header user-info">
        <div class="base-info">
            <div class="left">
                <van-image
                round
                class="avatar"
                :src="userInfo.photo"
                fit="cover"
                />
                <span class="name">{{userInfo.name}}</span>
            </div>
            <div class="right">
                <van-button size="mini" round to="/user/profile">编辑资料</van-button>
            </div>
        </div>
        <div class="data-stats">
            <div class="data-item">
                <span class="count">{{userInfo.art_count}}</span>
                <span class="text">头条</span>
            </div>
            <div class="data-item">
                 <span class="count">{{userInfo.follow_count}}</span>
                <span class="text">关注</span>
            </div>
            <div class="data-item">
                 <span class="count">{{userInfo.fans_count}}</span>
                <span class="text">粉丝</span>
            </div>
            <div class="data-item">
                 <span class="count">{{userInfo.like_count}}</span>
                <span class="text">获赞</span>
            </div>
        </div>
    </div>

    <div class="header not-login" v-else>
      <div class="login-btn">
        <img
        class="mobile-img"
        src="~@/assets/mobile.png"
        @click="$router.push('/login')"
        >
        <span class="text">登录|注册</span>
      </div>
    </div>
   
    <!-- <van-cell title="消息通知" is-link url="" />
    <van-cell title="实名认证" is-link url="" />
    <van-cell title="用户反馈" is-link url="" />
    <van-cell title="小智同学" is-link url="" />
    <van-cell title="系统设置" is-link url="" /> -->
    <van-grid :column-num="2" class="grid-nav mb-9" clickable>
        <van-grid-item 
        class="grid-item"
        @click="isCollectShow = true"
        >
            <i slot="icon" class="toutiao toutiao-shoucang"></i>
            <span slot="text" class="text">收藏</span>
        </van-grid-item>    
        <van-grid-item
        @click="isHistoryShow = true"  
        class="grid-item"> 
            <i slot="icon" class="toutiao toutiao-lishi"></i>
            <span slot="text" class="text">历史</span>
        </van-grid-item> 
    </van-grid>
     <van-cell title="消息通知" is-link  />
    <van-cell class="mb-9" title="小智同学" is-link  />
    <van-cell 
    v-if="user" 
    class="logout-cell" 
    title="退出登录" 
    is-link
    @click="onLogout"
    clickable  />

    <!-- 收藏列表 -->
    <van-popup
      v-model="isCollectShow"
      style="height: 100%;"
      position="bottom">
      <my-collect
      v-if="isCollectShow"
      @close="isCollectShow = false"
      :mycollect="collects"
      />
    </van-popup>
     <!-- 收藏列表 -->
     <!-- 历史记录 -->
        <van-popup
        v-model="isHistoryShow"
        style="height: 100%;"
        position="bottom">
        <my-history
        v-if="isHistoryShow"
        @close="isHistoryShow = false"
        :myhistory="histories"
        />
        </van-popup>
     <!-- 历史记录 -->
    
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {mapState} from "vuex"
import {getUserInfo,getUserCollects,getUserHistories } from '@/api/user'
import MyCollect from './components/my-collect.vue'
import MyHistory from './components/my-history.vue'
export default {
    name:"MyIndex",
    //import引入的组件需要注入到对象中才能使用
    components: {
        MyCollect,
        MyHistory
    },
    data() {
    //这里存放数据
    return {
        userInfo: {},
        isCollectShow: false,
        isHistoryShow: false,
        collects: [],
        histories: [],
        page_number: 20
    }
    },
    //监听属性 类似于data概念
    computed: {
        ...mapState(['user'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        onLogout(){
            //退出提示
            //确认退出，清楚登陆状态
            this.$dialog.confirm({
            title: '确认退出吗'
            }) .then(() => {
                // console.log('确认执行这里');
                this.$store.commit('setUser',null)
            })
            .catch(() => {
               console.log('取消执行这里');
            });
        },
        async loadUserInfo() {
            try {
                const {data} = await getUserInfo()
                console.log(data);
                this.userInfo = data.data
            } catch (error) {
               this.$toast("获取数据失败")
            }
        },
         async loadUserCollects() {
            try {
                const { data } = await getUserCollects()
                console.log(data);
                this.collects = data.data.results
            } catch (error) {
                this.$toast("收藏获取失败")
            }
         },
         async loadUserHistories() {
            try {
                const { data } = await getUserHistories({
                    per_page: this.page_number
                })
                this.histories = data.data.results
            } catch (error) {
                this.$toast("历史数据获取失败")
            }
         }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        if(this.user){
             this.loadUserInfo()
             this.loadUserCollects(),
             this.loadUserHistories()
        }     
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
.my-container {
   .header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
     .login-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
        }
        .text {
            font-size: 28px;
            color: #fff;
        }
    }
  }
    

    .user-info {
        .base-info {
            height: 231px;
            padding: 76px 32px 23px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
                display: flex;
                align-items: center;
                .avatar {
                    width: 132px;
                    height: 132px;
                    border: 4px solid #fff;
                    margin-right: 23px;
                }
                .name {
                    font-size: 30px;
                    color: #fff;
                }
            }
        }
        .data-stats {
            display: flex;
            .data-item {
                height: 130px;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color:#fff;
                .count{
                    font-size: 36px;
                }
                .text {
                    font-size: 23px;
                }
            }
        }
    }
    
    .grid-nav {
        height: 141px;
        i.toutiao{
            font-size: 45px;           
        }
        .toutiao-shoucang {
            color: #eb5253;
        }
        .toutiao-lishi {
            color: #ff9d1d;
        }
        span.text {
            font-size: 28px;            
        }
    }
    .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
  }

</style>