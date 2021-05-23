<template>
  <div>
    <div class="login-container"></div>
    <!-- 顶部 -->
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 表单 -->
    <van-form
      :show-erro="false"
      :show-error-message="false"
      @failed="onFailed"
      @submit="onLogin"
    >
      <!-- 用户名框 -->
      <van-field
        v-model="user.username"
        name="用户名"
        label="用户名"
        left-icon="user-circle-o"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <!-- 密码框 -->
      <van-field
        v-model="user.password"
        :type="pwdType"
        name="密码"
        left-icon="points"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <!-- 显示密码-->
        <template #button>
          <van-button
            v-if="passwordShowIcon"
            class="eyes"
            size="mini"
            @click.prevent="showPassword"
            round
            icon="closed-eye"
          />
          <van-button
            v-else
            class="eyes"
            size="mini"
            @click.prevent="showPassword"
            round
            icon="eye-o"
          />
        </template>
      </van-field>
      <!-- 提交按钮 -->
      <div style="margin: 16px;" class="login-submit">
        <van-button
          round
          block
          type="info"
          @dblclick="onLogin"
          native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <!-- 用户其他界面 -->
    <van-row style="margin-top:30px">
      <van-col span="7"></van-col>
      <van-col to="/" span="4">
        <van-button size="mini" type="primary" to="/register">
          注册
        </van-button>
      </van-col>
      <van-col span="2"></van-col>
      <van-col span="4">
        <van-button size="mini" type="primary" to="/register">
          忘记密码
        </van-button>
      </van-col>
      <van-col span="7"></van-col>
    </van-row>
  </div>
</template>

<script>
import { login } from "../../api/user1";
import { getNews } from "../../api/news";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      //用户表单数据
      user: {
        username: "1",
        password: "1"
      },
      //是否显示密码
      passwordShowIcon: true,
      //密码类型
      pwdType: "password"

      // 请求期间禁用按钮点击
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 切换到注册界面
    onToZhuce() {
      this.$toast.loading({
        duration: 10000, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "登录中..." // 提示消息
      });
    },

    // 显示密码
    showPassword() {
      this.passwordShowIcon = !this.passwordShowIcon;
      this.pwdType = this.pwdType === "password" ? "text" : "password";
    },

    // 返回键
    onClickLeft() {
      this.$router.back();
    },

    // 表单中存在错误
    onFailed(error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message, // 提示消息
          position: "top" // 防止手机键盘太高看不见提示消息
        });
      }
    },

    // 提交登录请求
    async onLogin() {
      //1.找到数据接口      //2.封装请求方法      //3.请求调用登录    //4.处理相应结果
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "登录中..." // 提示消息
      });
      try {
        // //getNews
        // const { data } = await (await getNews(this.user)).data;
        // this.$toast.success("获取成功");
        // console.log(data);
        //发送登录请求
        const { data } = await login(this.user);
        this.$toast.success("登录成功");

        // 将后端返回的用户登录状态（ token 等数据）放到 Vuex 容器中
        this.$store.commit("setUser", data.data);

        // 界面跳转 到我的界面
        this.$router.push("/my");
      } catch (err) {
        this.$toast.fail("登录失败，用户名或密码错误");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.eyes {
  background: white !important;
  border: none;
}
.login-submit {
  margin-top: 30px !important;
}
// 文字位置
.van-col--4 {
  font-size: 10px;
  text-align: center;
}
//清除按钮中不必要格式
.van-button--primary {
  background-color: #fff;
  color: grey;
  border: none;
  size: mini;
}
</style>
