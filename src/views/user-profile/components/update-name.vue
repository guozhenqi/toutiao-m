<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
    title="设置昵称"
    left-text="取消"
    right-text="确定"
    @click-left="$emit('close')"
    @click-right="onConfirm"
     />
    <!-- /导航栏 -->
    <div class="field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import { Empty } from 'vant'
export default {
  // 组件名称
  name: 'UpdateName',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    value: {
        type: String,
        required: true
    }
  },
  // 组件状态值
  data () {
    return {
        localName: this.value,
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created () { },
  mounted () { },
  // 组件方法
  methods: {
    async onConfirm() {
      this.$toast.loading({
            message: "保存中",
            forbidClick: true,
            duration: 0
        })
        try {
            const localName = this.localName
            if(!localName.length){
                this.$toast("昵称不能为空")
                return
            }
            await updateUserProfile({
                name: localName
            })
            // 更新视图
            this.$emit('input',localName)
            //关闭弹层
            this.$emit('close')
            // 提示成功
            this.$toast('更新成功')
        } catch (error) {
            this.$toast("更新失败")
        }
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .field-wrap {
  padding: 20px;
}
</style>