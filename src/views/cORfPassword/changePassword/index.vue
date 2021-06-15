<template>
  <div class="changePasssword-container">
    <!-- 顶部左侧按钮-->
    <van-button class="top-btn" @click="onClickLeft" plain type="primary">
      <van-icon slot="default" size="15px" name="arrow-left" />
    </van-button>

    <!-- 文字 -->
    <div class="font">
      <font>用户：{{ this.uname }}</font>
      <font>Change Password</font>
    </div>

    <van-form @submit="ChangePassword">
      <van-field
        class="q"
        v-model="q"
        name="用户名"
        readonly
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="input.answer"
        name="答案"
        placeholder="填写密保问题的答案"
        :rules="[{ required: true }]"
      />

      <van-field
        v-model="password1"
        name="密码"
        placeholder="新的密码"
        :rules="[{ required: true }]"
      /><van-field
        v-model="password2"
        name="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true }]"
      />
      <!-- 提交注册 -->
      <div style="margin: 16px;" class="submit">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :rules="[{ required: true }]"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getUserQuestion, forgetPassword } from "@/api/user";
export default {
  name: "changePassswordIndex",
  components: {},
  props: {
    uname: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      input: {
        user_logname: "",
        password: "",
        question_id: "",
        answer: ""
      },
      password1: "",
      password2: "",
      ans1: "",
      q: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.takeQues();
  },
  mounted() {},
  methods: {
    // 修改密码
    // 提交问题
    async ChangePassword() {
      try {
        if (this.password1 == this.password2 && this.password1 != "") {
          this.input.password = this.password1;
        } else {
          throw "两次密码不一致";
        }
        const { data } = await forgetPassword(this.input);
        if (data.code == 400) {
          throw data.detail;
        }
        console.log(data);
        this.$toast.success("修改成功");
        this.$router.push({ name: "login" });
      } catch (e) {
        this.$toast.fail(e);
      }
    },
    // 获取用户的密保问题
    async takeQues() {
      try {
        const { data } = await getUserQuestion({
          user_logname: this.uname
        });
        this.q = data.data.questionContent;
        this.input.question_id = data.data.questionId;
        this.input.user_logname = this.uname;
      } catch (e) {
        console.log("获取问题异常");
      }
    },
    // 返回之前的界面
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="less">
.changePasssword-container {
  // 返回按钮
  .top-btn {
    margin: 2% 2%;
    color: grey;
    background-color: #fff;
    border: none;
  }

  // 文字
  .font {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 70px;
    font:first-child {
      color: rgb(253, 152, 39);
      font-size: 22px;
    }
    font {
      display: block;
      // font-family: "Times New Roman", Georgia, Serif;
      font-size: 24px;
      font-weight: 300;
      color: rgb(176, 176, 177);
      margin-top: 10px;
    }
  }
  // 表单
  .van-form {
    /deep/ .q {
      .van-field__control {
        color: rgb(253, 152, 39);
      }
    }
    // 输入框
    /deep/.van-cell {
      display: block;
      box-sizing: border-box;
      width: 286px;
      margin-left: 12%;
      border: 1px solid rgb(236, 236, 236);
      border-radius: 6%;
      margin-bottom: 10px;
    }

    // 按钮
    .submit {
      margin-top: 3% !important;
      .van-button {
        margin-top: 30px;
        width: 266px;
        margin-left: 12%;
        box-shadow: 5px 5px 5px rgb(179, 218, 218);
      }
    }
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
