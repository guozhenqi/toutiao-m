<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon 
      slot="left" 
      name="cross"
      @click="$router.back()" />
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
      v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
      v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
            <!-- time：倒计时时间 -->
          <van-count-down 
          v-if="isCountDownShow"
          @finish="isCountDownShow = false"
          :time="1000 * 10" 
          format="ss s"/>
          <van-button 
          v-else
          class="send-sms-btn"
          native-type="button" 
          round size="small" 
          type="default"
          @click="onSendms">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login,sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{ 
          required: true,
          message: '手机号不能为空' 
        },{
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{ 
          required: true, message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      
      // 2.表单验证
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 //持续时间，默认2000
    });
      // 3.提交表单请求记录
      try {
        const { data } = await login(user)
        console.log("登陆成功",data.data);
        this.$store.commit('setUser',data.data)
        this.$toast.success('登陆成功')
        //跳转回去原来页面
        this.$router.back()
      } catch (error) {
        if(error.response.status === 400){
            this.$toast.fail("手机号或验证码错误")
        }else{
            this.$toast.fail("登陆失败，请稍后重试");
        }
      }
      // 4.根据请求响应结果处理响应结果
    },
    async onSendms(){
        // 1.校验手机号
        try {
            await this.$refs.loginForm.validate('mobile')
            console.log("验证成功");
        } catch (error) {
            return console.log("验证失败",error);
        }
        // 2.验证通过。显示倒计时
        this.isCountDownShow = true 
        // 3.请求发送验证码
        try {
            await sendSms(this.user.mobile)
        } catch (error) {
            this.isCountDownShow = false
            if(error.response.status === 429){
                this.$toast("发送太频繁了，请稍后重试");
            }
                this.$toast("发送失败,请稍后重试");
        }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }

}
</style>
