<template>
  <!-- 平台列表 -->
  <div class="pla-container">
    <!-- 顶部 -->
    <van-nav-bar class="pla-top" left-text="平台探索" />
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
import { getAllPla } from "@/api/news";

export default {
  name: "PlaIndex",
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
    this.loadPla();
  },
  mounted() {},
  methods: {
    // 加载平台列表
    async loadPla() {
      try {
        // 1.向后台请求
        const { data } = await getAllPla();
        const results = data.data;
        // 2.放到数据中
        this.plaList.push(...results);
      } catch (e) {
        console.log(e);
      }
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
.pla-container {
  .pla-top {
    /deep/ .van-nav-bar__content {
      height: 55px;
      .van-nav-bar__text {
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
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
}
</style>
