<template>
  <div class="my-container">
    <!-- 基础信息 -->
    <div class="base-info">
      <!-- 用户已登录 -->
      <van-cell-group v-if="user" class="my-info ">
        <van-cell class="my-topbar">
          <van-image
            slot="icon"
            class="avater"
            round
            fit="cover"
            :src="this.userInfo.user_picture"
          />
          <div class="name" slot="title">{{ this.userInfo.user_username }}</div>
          <van-button class="update-btn" size="small" round slot="right-icon"
            >编辑资料</van-button
          >
        </van-cell>
      </van-cell-group>

      <!-- 没有登录 -->
      <div v-else class="not-login">
        <div @click="tologin">
          <van-button
            class="unlog-image"
            type="default"
            round
            icon="user-circle-o"
          >
          </van-button>
          <div class="unlog-name">登录 / 注册</div>
        </div>
      </div>
    </div>

    <!-- 数据信息 -->
    <div class="data-info">
      <van-grid class="nav-grid mb5" :column-num="3">
        <van-grid-item
          class="nav-grid-item"
          icon="star-o"
          text="收藏新闻"
          :to="{ name: 'favNew' }"
        />
        <van-grid-item
          class="nav-grid-item"
          icon="underway-o"
          text="浏览记录"
          :to="{ name: 'his' }"
        />

        <van-grid-item
          class="nav-grid-item"
          icon="coupon-o"
          text="订阅平台"
          :to="{ name: 'favPla' }"
        />
      </van-grid>
      <van-cell center title="用户偏好">
        <div slot="label" class="user-like">
          <span>娱乐(98)</span>
          <span>科技(70)</span>
          <span>民生(62)</span>
        </div>
      </van-cell>
      <van-cell class="mb5" title="问题反馈" is-link to="/" />
      <!-- 退出登录 -->
      <van-cell
        v-if="user"
        class="logout-cell"
        @click="onLogout"
        title="退出登录"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getCurrentUser } from "@/api/user";

export default {
  name: "MyIndex",
  components: {},
  props: {},
  data() {
    return {
      userInfo: {}
    };
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {},
  created() {
    this.loadCurrentUser();
  },
  mounted() {},
  methods: {
    // 登录时加载用户信息
    async loadCurrentUser() {
      console.log("加载");
      try {
        const { data } = await getCurrentUser();
        this.userInfo = data.user;
        console.log(data.user);
      } catch (e) {
        console.log(e);
      }
    },
    // 去登录界面
    tologin() {
      this.$router.push("/login");
    },
    // 退出登陆
    onLogout() {
      this.$dialog
        .confirm({
          title: "退出提示",
          meassage: "确定退出吗？",
          confirmButtonColor: "white",
          cancelButtonColor: "white",
          theme: "round"
        })
        .then(() => {
          // 确认退出 清除用户登录装填
          this.$store.commit("setUser", null);
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped lang="less">
.my-container {
  background: rgb(252, 252, 252);
  // 基础信息 / 未登录
  .base-info {
    // 顶端信息
    .my-info {
      background: url("./banner.jpg") no-repeat;
      background-size: cover;
      .my-topbar {
        box-sizing: border-box;
        height: 210px;
        padding-top: 150px;
        padding-bottom: 20px;
        background-color: unset;
        // 用户照片
        .avater {
          box-sizing: border-box;
          width: 45px;
          height: 45px;
          border: 1px solid rgb(214, 157, 157);
          margin-right: 15px;
        }
        // 用户昵称
        .name {
          line-height: 45px;
          font-size: 15px;
          color: #666;
        }
        // 编辑资料按钮
        .update-btn {
          height: 30px;
          color: white;
        }
      }
    }

    // 未登录
    .not-login {
      height: 210px;
      background: url("./banner.jpg") no-repeat;
      background-size: cover;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .unlog-image {
        margin-top: 100px;
        opacity: 0.8;
        width: 60px;
        height: 60px;
        font-size: 60px;
        color: rgba(255, 255, 255, 0.5);
      }
      .unlog-name {
        margin-top: 10px;
        font-size: 14px;
        color: #6495ed;
      }
    }
  }
  // 数据信息
  .data-info {
    // 交互信息
    .nav-grid {
      /deep/.nav-grid-item {
        height: 90px;
        .van-icon {
          font-size: 23px;
        }
        .van-grid-item__text {
          margin-top: 11px;
        }
        // 收藏图标
        .van-icon-star-o {
          color: rgb(148, 52, 52);
        }
        // 浏览记录图标
        .van-icon-browsing-history-o {
          color: rgb(208, 110, 44);
        }
        // 订阅平台图标
        .van-icon-coupon-o {
          color: rgb(18, 52, 187);
        }
      }
    }
    // 用户偏好
    .user-like {
      margin-top: 5px;
      span {
        margin-left: 25px;
      }
    }
    // 登出
    .logout-cell {
      text-align: center;
      color: rgb(250, 56, 56);
    }
    // 下边距
    .mb5 {
      margin-bottom: 4px;
    }
  }

  //van-button van-button--default van-button--large van-dialog__confirm van-hairline--left
  //van-button van-button--default van-button--large van-dialog__cancel
}
</style>
