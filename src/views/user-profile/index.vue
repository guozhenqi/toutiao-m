<!--  -->
<template>
  <div class="user-profile">
    <!-- 导航栏 -->
      <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <input 
    type="file" 
    hidden 
    ref="file"
    @change="onFileChange"
    >
    <!-- 个人信息 -->
      <van-cell title="头像" is-link>
        <van-image
          class="avatar"
          fit="cover"
          round
          :src="user.photo"
          @click="$refs.file.click()"
        />
      </van-cell>
      <van-cell 
      title="昵称" 
      :value="user.name" 
      is-link
      @click="isUpdateNameShow = true"
      />
      <van-cell title="性别" 
      :value="user.gender===0 ? '男':'女'" 
      @click="isUpdateGenderShow = true" 
      is-link />
      <van-cell 
      title="生日" 
      :value="user.birthday"
      @click="isUpdateBirthdayShow = true" 
      is-link />
      <!-- 个人信息 -->
    <!-- 编辑昵称 -->
      <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%;"
      position="bottom">
      <update-name 
      v-if="isUpdateNameShow"
      @close="isUpdateNameShow = false "
      v-model="user.name"
      />
    </van-popup>
    <!-- 编辑昵称 -->
    <!-- 编辑性别 -->
      <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
      >
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      />
      </van-popup>
    <!-- 编辑性别 -->
    <!-- 编辑生日 -->
      <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
      >
      <update-birthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      />
    </van-popup>
    <!-- 编辑生日 -->
    <!-- 编辑头像 -->
      <van-popup
      v-model="isUpdatePhotoShow"
      style="height: 100%;"
      position="bottom"
      >
      <update-photo
      v-if="isUpdatePhotoShow"
      :img="img"
       @close="isUpdatePhotoShow = false"
       @update-photo="user.photo = $event"
      />
      </van-popup>
    <!-- 编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from "./components/update-name.vue"
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'

export default {
//import引入的组件需要注入到对象中才能使用
name: "UserProfile",
components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto,
    
},
data() {
//这里存放数据
return {
    user: {},
    isUpdateNameShow: false,
    isUpdateGenderShow: false,
    isUpdateBirthdayShow: false,
    isUpdatePhotoShow: false,
    img: null
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    async loadUserProfiel() {
        try {
            const { data } = await getUserProfile()
            this.user = data.data
        } catch (error) {
            this.$toast("数据获取失败")
        }
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于本章对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      // 如果选了同一张照片不会触发change事件
      // 解决办法：使用完毕，清空value
      this.$refs.file.value = ''
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.loadUserProfiel()
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
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
.van-popup {
    background: #f5f7f9;
}
</style>