<template>
  <div class="user-like-container">
    <!-- 顶部左侧按钮-->
    <van-button class="top-btn" @click="onClickLeft" plain type="primary">
      <van-icon slot="default" size="15px" name="arrow-left" />
    </van-button>
    <!-- /顶部左侧按钮-->

    <!-- 文字 -->
    <div class="font">
      <font>*完善个人信息</font>
      <font
        >选择你喜爱的新闻类别
        <span>3-6个类别</span>
      </font>
      <font>选择： {{ checkedLength }} / 6</font>
    </div>
    <!-- /文字 -->

    <!-- 选择表单 -->
    <van-form @submit="onPickLike">
      <van-grid :column-num="3" :gutter="10" :border="false" class="grid">
        <van-checkbox-group
          v-model="checkResult"
          :max="6"
          direction="horizontal"
        >
          <van-grid-item v-for="(item, index) in typeList" :key="item.typeId">
            <van-checkbox
              :name="item.typeId"
              class="check-btn"
              v-model="checked[index]"
              checked-color="rgb(179, 218, 218)"
            >
              {{ item.typeName }}
            </van-checkbox>
          </van-grid-item>
        </van-checkbox-group>
      </van-grid>

      <div style="margin: 16px;" class="pick-submit">
        <van-button round block type="info" native-type="submit"
          >提 交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getAllType } from "@/api/news";
import { chooseUserLikeType } from "@/api/user";

export default {
  name: "pickUserLikeIndex",
  components: {},
  props: {
    uname: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      typeList: [],
      checked: [],
      checkedNum: [],
      checkResult: [],
      checkedLength: 0
    };
  },
  computed: {},
  watch: {
    // 监听数据变化
    checkResult: {
      handler(val, oldVal) {
        this.checkedLength = this.checkResult.length;
      }
    }
  },
  created() {
    this.begin();
  },
  mounted() {},
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.back();
    },

    // 提交用户喜欢的typeid
    async onPickLike() {
      if (this.checkedLength < 3) {
        this.$toast.fail("失败，选择类别小于3个");
      } else {
        try {
          console.log(this.checkResult);
          console.log(typeof this.checkResult);
          const data = await chooseUserLikeType({
            type_id: this.checkResult,
            user_logname: this.uname
          });
          // console.log(data);
          if (data.status == 200) {
            this.$toast.success({ message: "完善资料成功", duration: 2000 });
            this.$router.push("/login");
          } else {
            this.$toast.fail("完善资料失败");
          }
        } catch (e) {
          this.$toast.fail("资料已完善");
        }
      }
    },
    // begin
    async begin() {
      try {
        console.log("username：" + this.uname);
        const { data } = await getAllType();
        this.typeList = data.data;
        // console.log(this.typeList);
        const lenght = this.typeList.length;
        this.checked = new Array(lenght).fill(0);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="less" scope>
.user-like-container {
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
    margin-bottom: 10px;

    font {
      display: block;
      // font-family: "Times New Roman", Georgia, Serif;
      font-size: 20px;
      font-weight: 300;
      color: rgb(176, 176, 177);
      margin-top: 10px;
      span {
        font-size: 10px;
      }
    }
    font:nth-child(2) {
      margin-left: 30px;
    }
    font:nth-child(3) {
      margin-top: 20px;
      color: rgb(251, 180, 171);
    }
  }

  // 表单
  .van-form {
    // 按钮
    .pick-submit {
      .van-button {
        margin-top: 30px;
        width: 266px;
        margin-left: 12%;
        box-shadow: 5px 5px 5px rgb(179, 218, 218);
      }
    }
    .grid {
      box-sizing: border-box;
      margin: 26px;
      .check-btn {
        font-size: 15px;
      }
    }

    .img-icon {
      height: 20px;
    }
  }
}
</style>
