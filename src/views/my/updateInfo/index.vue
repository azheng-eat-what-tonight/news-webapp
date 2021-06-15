<template>
  <div class="updateInfo-container">
    <van-nav-bar
      title="编辑资料"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 资料表单 -->
    <van-form class="info-form" @submit="updateInfoSubmit">
      <van-field
        class="head-field"
        label="头像"
        @click="pickPic"
        right-icon="arrow"
        :rules="[{ required: true }]"
      >
        <van-image
          slot="input"
          class="avater"
          fit="cover"
          :src="userInfo.user_picture"
          radius="5px"
          :rules="[{ required: true }]"
        />
      </van-field>
      <van-field
        label="用户名"
        :rules="[{ required: true }]"
        :value="this.userInfo.user_logname"
        disabled
      />
      <van-field
        label="昵称"
        :rules="[{ required: true }]"
        v-model="userInfo.user_username"
      />
      <!-- 提交按钮 -->
      <div style="margin: 16px;" class="submit">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click="updateInfoSubmit"
          >提交</van-button
        >
      </div>
    </van-form>

    <!-- /资料表单 -->
  </div>
</template>

<script>
import { getCurrentUser, modifyUserInfo } from "@/api/user";

export default {
  name: "updateInfoIndex",
  props: {},
  data() {
    return {
      userInfo: {},
      beginName: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadCurrentUser();
  },
  mounted() {},
  methods: {
    // 登录时加载用户信息
    async loadCurrentUser() {
      try {
        const { data } = await getCurrentUser();
        this.userInfo = data.user;
        this.beginName = data.user.user_username;
      } catch (e) {
        this.$toast.fail("获取用户信息失败" + e);
      }
    },
    // 选择一张图片
    pickPic() {
      console.log("选图");
    },
    // 提交修改
    async updateInfoSubmit() {
      try {
        if (this.beginName == this.userInfo.user_username) {
          this.$toast.fail("用户名未修改");
        } else if (this.userInfo.user_username == "") {
          this.$toast.fail("用户名不能为空");
        } else {
          const { data } = modifyUserInfo({
            user_name: this.userInfo.user_username
          });
          this.$toast.success("修改成功");
          console.log(data);
        }
        console.log(this.userInfo);
      } catch (e) {
        console.log(e);
      }
    },
    // 返回之前界面
    onClickLeft() {
      this.$router.back();
    }
  },

  components: {}
};
</script>

<style scoped lang="less">
.updateInfo-container {
  .info-form {
    /deep/.van-cell:first-child {
      height: 70px;
      line-height: 70px;
      .van-cell__title {
        height: 60px;
        line-height: 60px;
        width: 82%;
      }
      .van-cell__value {
        height: 60px;
        line-height: 60px;
        width: 18%;
        .avater {
          margin-bottom: 10px;
        }
      }
    }
  }
  // 提交按钮
  .submit {
    margin-top: 4% !important;
    .van-button {
      width: 266px;
      margin-left: 12%;
      box-shadow: 5px 5px 5px rgb(179, 218, 218);
    }
  }
}
</style>
