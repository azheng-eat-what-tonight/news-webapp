<template>
  <div class="login-container">
    <van-nav-bar
      title="已订阅平台"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 平台列表 -->
    <div class="pla-list">
      <van-list class="pla-list">
        <van-cell v-for="item in plaList" :key="item.type" @click="toPla(item)">
          <van-cell is-link>
            <van-image
              slot="icon"
              class="item-img"
              fit="cover"
              round
              :src="item.pla_logo"
            />
            <div slot="title" class="item-name">{{ item.pla_name }}</div>
          </van-cell>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getUserSubscribedPla } from "@/api/user";
export default {
  name: "FavPlaIndex",
  components: {},
  props: {},
  data() {
    return {
      plaList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.begin();
  },
  mounted() {},
  methods: {
    // 初始化订阅平台
    async begin() {
      const { data } = await getUserSubscribedPla();
      this.plaList = data.data;
    },
    // 返回之前界面
    onClickLeft() {
      this.$router.back();
    },
    // 跳转平台
    toPla(item) {
      const info = {
        id: item.pla_id,
        name: item.pla_name
      };
      let jsonInfo = JSON.stringify(info);

      this.$router.push({
        name: "plaItem",
        params: {
          plaInfo: jsonInfo
          // {
          //   id: pla_id,
          //   name: pla_name
          // }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.pla-list {
  /deep/ .van-cell {
    .item-img {
      width: 30px;
    }
    .item-name {
      margin-top: 5px;
      margin-left: 15px;
    }
  }
}
</style>
