<template>
  <div class="reg-container">
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />
    <!-- 注册表单 -->
    <van-form
      :show-erro="false"
      :show-error-message="false"
      @submit="OnRegister"
    >
      <van-field
        v-model="regUser.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="regUser.password1"
        :type="pwdType1"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <!-- 显示密码-->
        <template #button>
          <van-button
            v-if="passwordShowIcon1"
            class="eyes"
            size="mini"
            @click.prevent="showPassword1"
            round
            icon="closed-eye"
          />
          <van-button
            v-else
            class="eyes"
            size="mini"
            @click.prevent="showPassword1"
            round
            icon="eye-o"
          />
        </template>
      </van-field>
      <van-field
        v-model="regUser.password2"
        :type="pwdType2"
        label="确认密码"
        placeholder="确认密码"
        @focus.prevent="OnFocusSure"
        :rules="[{ required: true, message: '请填写确认密码' }]"
      >
        <!-- 显示确认密码-->
        <template #button>
          <van-button
            v-if="passwordShowIcon2"
            class="eyes"
            size="mini"
            @click.prevent="showPassword2"
            round
            icon="closed-eye"
          />
          <van-button
            v-else
            class="eyes"
            size="mini"
            @click.prevent="showPassword2"
            round
            icon="eye-o"
          />
        </template>
      </van-field>
      <!-- 提交注册 -->
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @dbclick="OnRegister"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { register } from "../../api/user";

export default {
  name: "RegisterIndex",
  components: {},
  props: {},
  data() {
    return {
      // 注册表单数据
      regUser: {
        username: "",
        password1: "",
        password2: ""
      },
      // 密码框 切换显示密码变量
      passwordShowIcon1: false,
      pwdType1: "password",
      // 确认密码框
      passwordShowIcon2: false,
      pwdType2: "password"
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 返回
    onBack() {
      this.$router.back();
    },

    // 提交注册
    async OnRegister() {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "注册中..." // 提示消息
      });
      try {
        // 发送注册请求
        const { data } = await login1(this.user);
        this.$toast.success("注册成功");
      } catch (e) {
        this.$toast.fail("登录失败，用户名或密码错误");

        // 注册成功，跳转到登录界面
        this.$router.push("/login");
      }
    },

    // 密码显示
    showPassword1() {
      console.log(this.passwordShowIcon1);
      this.passwordShowIcon1 = !this.passwordShowIcon1;
      this.pwdType1 = this.pwdType1 === "password" ? "text" : "password";
    },

    //确认密码显示
    showPassword2() {
      this.passwordShowIcon2 = !this.passwordShowIcon2;
      this.pwdType2 = this.pwdType2 === "password" ? "text" : "password";
    },

    // 焦点在确认密码上是，检验密码
    OnFocusSure() {
      console.log("密码是否相等");
    }
  }
};
</script>

<style scoped lang="less">
.eyes {
  background: white !important;
  border: none;
}
//清除按钮中不必要格式
.van-button--primary {
  background-color: #fff;
  color: grey;
  border: none;
  size: mini;
}
</style>
