<template>
  <div class="reg-container">
    <!-- 顶部左侧按钮-->
    <van-button class="top-btn" @click="onClickLeft" plain type="primary">
      <van-icon slot="default" size="15px" name="arrow-left" />
    </van-button>
    <!-- /顶部左侧按钮-->
    <!-- 文字 -->
    <div class="font">
      <font>CREATE NEW</font>
      <font>ACCOUNT</font>
    </div>

    <!-- 注册表单 -->
    <van-form @submit="OnRegister">
      <!-- 用户名 -->
      <van-field
        v-model="registerParam.user_logname"
        name="用户名"
        placeholder="用户名"
        :rules="[{ required: true }]"
      />
      <!-- 密码 -->
      <van-field
        v-model="regUser.password"
        :type="pwdType1"
        name="密码"
        placeholder="密码"
        @focus.prevent="OnFocusSure"
        :rules="[
          {
            required: true
          }
        ]"
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

      <!-- 确认密码 -->
      <van-field
        v-model="regUser.password2"
        :type="pwdType2"
        placeholder="确认密码"
        @blur="OnFocusSure"
        :rules="[
          {
            required: true,
            validator: twoPasswordIsEqual,
            message: '密码不一致'
          }
        ]"
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

      <!-- 选择密保问题 -->
      <van-field
        readonly
        clickable
        :value="value"
        placeholder="*选择您的密保问题"
        @click.prevent="showQuestionPicker = true"
        :rules="[{ required: false }]"
      >
        <van-icon slot="right-icon" name="arrow-down"></van-icon>
      </van-field>
      <!-- 密保问题弹出 -->
      <van-popup v-model="showQuestionPicker" round position="bottom">
        <van-picker
          show-toolbar
          value-key="questionContent"
          :columns="questionColumns"
          @cancel="showQuestionPicker = false"
          @confirm="onConfirm"
          :rules="[{ required: true }]"
        />
      </van-popup>
      <!-- 密保答案输入 -->
      <van-field
        v-model="registerParam.answer"
        name="密保答案"
        placeholder="密保答案"
        :rules="[{ required: true, message: '请填写密保答案' }]"
      />
      <!-- 提交注册 -->
      <div style="margin: 16px;" class="reg-submit">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @dbclick="OnRegister"
          :disabled="isAble"
          :rules="[{ required: true }]"
        >
          注 册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { register, getAllQuestion } from "../../api/user";

export default {
  name: "RegisterIndex",
  components: {},
  props: {},
  data() {
    return {
      // 注册表单数据
      regUser: {
        password: "",
        password2: ""
      },
      registerParam: {
        user_logname: "",
        password: "",
        question_id: "",
        answer: ""
      },
      // 密码框 切换显示密码变量
      passwordShowIcon1: true,
      pwdType1: "password",
      // 确认密码框
      passwordShowIcon2: true,
      pwdType2: "password",

      // 下拉菜单数据
      value: "",
      showQuestionPicker: false,
      questionColumns: [],
      // 密码不相等 无法点击按钮
      isAble: true
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getAllQ();
  },
  mounted() {},
  methods: {
    // 返回
    onClickLeft() {
      this.$router.back();
    },
    // 获取全部密保问题
    async getAllQ() {
      const { data } = await getAllQuestion();
      this.questionColumns = data.data;
      // console.log(data.data);
    },

    // 提交注册
    //  参数：user_logmane,password,question_id,answer
    async OnRegister() {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "注册中..." // 提示消息
      });
      try {
        this.registerParam.password = this.regUser.password;
        // 发送注册请求
        const { data } = await register(this.registerParam);
        if (data.code == 400) {
          throw data.detail;
        }
        console.log(data.cede);
        this.$toast.success({ message: "注册成功", duration: 2000 });
        // 注册成功，跳转到兴趣选择
        this.$router.push({
          name: "userLike",
          params: { uname: this.registerParam.user_logname }
        });
      } catch (e) {
        this.$toast.fail({ message: e, duration: 1800 });
      }
    },
    // 选择密保问题
    onConfirm(value) {
      this.registerParam.question_id = value.questionId;
      this.value = value.questionContent;
      this.showQuestionPicker = false;
    },
    // 密码显示
    showPassword1() {
      // console.log(this.passwordShowIcon1);
      this.passwordShowIcon1 = !this.passwordShowIcon1;
      this.pwdType1 = this.pwdType1 === "password" ? "text" : "password";
    },

    //确认密码显示
    showPassword2() {
      this.passwordShowIcon2 = !this.passwordShowIcon2;
      this.pwdType2 = this.pwdType2 === "password" ? "text" : "password";
    },

    // 检验两次密码是否相等
    twoPasswordIsEqual(val) {
      return new Promise(resolve => {
        resolve(this.regUser.password2 === this.regUser.password);
      });
    },

    // 焦点在确认密码上是，检验密码
    OnFocusSure() {
      if (
        this.regUser.password2 === this.regUser.password &&
        this.regUser.password != "" &&
        this.regUser.password2 != ""
      ) {
        this.isAble = false;
      } else {
        this.isAble = true;
      }
    }
  }
};
</script>

<style scoped lang="less">
.reg-container {
  // 返回按钮
  .top-btn {
    margin: 2% 2%;
  }
  // 文字
  .font {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 70px;
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
    .reg-submit {
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
