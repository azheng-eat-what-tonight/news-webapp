<template>
  <div class="cORf-container">
    <!-- 顶部左侧按钮-->
    <van-button class="top-btn" @click="onClickLeft" plain type="primary">
      <van-icon slot="default" size="15px" name="arrow-left" />
    </van-button>
    <!-- /顶部左侧按钮-->
    <!-- 文字 -->
    <div class="font">
      <font>INPUT UserName</font>
      <font> to modify / forget</font>
    </div>

    <van-form @submit="OnPassword">
      <van-field
        v-model="userName"
        name="用户名"
        placeholder="修改 / 忘记的用户名"
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
import { verifyLogName } from "@/api/user";
export default {
  name: "cORfIndex",
  components: {},
  props: {},
  data() {
    return {
      userName: ""
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 验证用户名
    async OnPassword() {
      try {
        const { data } = await verifyLogName({ user_logname: this.userName });
        console.log(data);
        if (data.code == 400) {
          throw data.detail;
        }
        this.$router.push({
          name: "changePassword",
          params: {
            uname: this.userName
          }
        });
      } catch (e) {
        this.$toast.fail(e);
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
.cORf-container {
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
