<template>
  <div class="login-container">
    <!-- 顶部左侧按钮-->
    <van-button class="top-btn" @click="onClickLeft" plain type="primary">
      <van-icon slot="default" size="15px" name="arrow-left" />
    </van-button>
    <!-- /顶部左侧按钮-->

    <van-image
      class="logo"
      width="80%"
      :src="require('@/assets/img/logo-img+font.2.png')"
    />
    <div class="font">
      <font>W E L C O M E</font>
    </div>

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
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
        @focus="addBorderColor"
        @blur="deleteBorderColor"
        :class="{ 'van-cell-add': addColor }"
        clearable
      />
      <!-- 密码框 -->
      <van-field
        v-model="user.password"
        :type="pwdType"
        name="密码"
        placeholder="密码"
        :class="{ 'van-cell-add': addColor1 }"
        @focus="addBorderColor1"
        @blur="deleteBorderColor1"
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
      <!-- 忘记密码-->
      <van-button size="mini" type="primary" to="/cORfPassword">
        忘记 / 修改密码?
      </van-button>
      <!-- 提交按钮 -->
      <div style="margin: 16px;" class="login-submit">
        <van-button
          round
          block
          type="info"
          @dblclick="onLogin"
          native-type="submit"
          >登 录</van-button
        >
      </div>
    </van-form>
    <!-- /表单 -->

    <div class="reg-all">
      <span class="reg-font">
        没有账户？
      </span>
      <van-button
        text="注册"
        size="small"
        class="reg-btn"
        type="primary"
        to="/register"
      >
      </van-button>
    </div>
  </div>
</template>

<script>
import { login, isInit } from "../../api/user";

export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      //用户表单数据
      user: {
        username: "",
        password: ""
      },
      //是否显示密码
      passwordShowIcon: true,
      //密码类型
      pwdType: "password", // 添加样色

      // 请求期间禁用按钮点击
      addColor: false,
      addColor1: false
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
      if (this.user.username != "" && this.user.password != "") {
        try {
          //发送登录请求
          var data = await login(this.user);
          if (data.data.code == "200") {
            console.log(data);
            const data1 = await isInit({
              user_logname: this.user.username
            });

            if (data1.data.code == 11) {
              // 将后端返回的用户登录状态（ token 等数据）放到 Vuex 容器中
              this.$store.commit("setUser", data.data);
              this.$toast.success("登录成功");
              // 界面跳转 到我的界面
              this.$router.push("/my");
            } else {
              this.$toast.fail("需要进行初始化");
              this.$router.push({
                name: "userLike",
                params: { uname: this.user.username }
              });
            }
          } else {
            throw "warning";
          }
        } catch (err) {
          this.$toast.fail("登录失败，用户名或密码错误");
        }
      } else {
        this.$toast.fail("用户名/密码为空");
      }
    },

    // 给输入框加样式
    addBorderColor() {
      this.addColor = true;
    },
    // 给输入框减样式
    deleteBorderColor() {
      this.addColor = false;
    },
    // 给输入框加样式
    addBorderColor1() {
      this.addColor1 = true;
    },
    // 给输入框减样式
    deleteBorderColor1() {
      this.addColor1 = false;
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  width: 100%;
  position: fixed;
}
// 返回按钮
.top-btn {
  margin: 2% 2%;
}

// logo
.logo {
  margin-left: 41px;
  margin-top: -35px;
}

// logo下的文字
.font {
  text-align: center;
  margin-bottom: 35px;
  font {
    // font-family: "Times New Roman", Georgia, Serif;
    font-size: 24px;
    font-weight: 300;
    color: rgb(176, 176, 177);
  }
}

// 表单
.van-form {
  // 用户名框
  .van-cell:first-child {
    margin-bottom: 10px;
  }
  // 输入框
  /deep/.van-cell {
    display: block;
    box-sizing: border-box;
    width: 286px;
    margin-left: 12%;
    border: 1px solid rgb(236, 236, 236);
    border-radius: 6%;
  }
  .van-cell-add {
    border: 2px solid rgb(100, 149, 237);
  }
  // 忘记密码
  .van-button--mini:nth-child(3) {
    width: 125px;
    text-align: right;
    margin-left: 225px;
  }
  // 提交按钮
  .login-submit {
    margin-top: 3% !important;
    .van-button {
      width: 266px;
      margin-left: 12%;
      box-shadow: 5px 5px 5px rgb(179, 218, 218);
    }
  }
}
// 显示密码
.eyes {
  background: white !important;
  border: none;
}

// 注册文字
.reg-all {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  color: rgb(128, 128, 128);
  .reg-font {
    display: block;
  }
  .reg-btn {
    color: rgb(251, 180, 171);
  }
}
//清除按钮中不必要格式
.van-button--primary {
  background-color: #fff;
  color: grey;
  border: none;
  size: mini;
}
</style>
