<template>
  <div class="home-container">
    <!-- 导航栏 -->

    <van-nav-bar class="home-top">
      <van-icon slot="left" class-prefix="hnm" name="zu2557" size="30px" />
      <van-button
        slot="title"
        icon="search"
        round
        size="small"
        class="search-btn"
        to="search"
        >搜索
      </van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 新闻类别 -->
    <van-tabs v-model="activeName" swipeable>
      <van-tab
        v-for="channel in channels"
        :key="channel.typeId"
        :title="channel.typeName"
      >
        <!-- 新闻列表 -->
        <news-list :channel="channel"></news-list>
        <!-- /新闻列表 -->
      </van-tab>
    </van-tabs>
    <!-- /新闻类别 -->
  </div>
</template>

<script>
import { getUserChannels } from "../../api/user";
import { getAllType } from "@/api/news";
import NewsList from "./component/news-list";

export default {
  name: "HomeIndex",
  components: {
    NewsList
  },
  props: {},
  data() {
    return {
      // 控制被激活的标签
      activeName: 0,
      // 频道列表
      channels: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels();
  },
  mounted() {},
  methods: {
    // 请求各频道数据
    async loadChannels() {
      //请求频道数据
      const { data } = await getAllType();
      // console.log(data.data);
      this.channels = data.data;
      // this.channels.unshift({ typeId: 0, typeName: "推荐" });
      this.channels.unshift({ typeId: 0, typeName: "推荐" });
    }
  }
};
</script>

<style scoped lang="less">
.home-container {
  .home-top {
    box-sizing: content-box;

    // 顶端栏
    /deep/ .van-nav-bar__content {
      height: 55px;
      padding-left: 60px;

      // 搜索按钮
      .search-btn {
        color: white;
        width: 250px;
        height: 30px;
        background: #5babfb;
      }

      // 左上角图标
      .van-icon-hot {
        padding-left: 10px;
      }
    }

    // 滑动标签栏样式
    /deep/ .van-tab {
      color: blue;
      box-sizing: border-box;
      padding: 0 50px;
      height: 35px;
      .van-tabs__line {
        padding: 0 50px;
        width: 100px;
        text-align: center;
      }
    }
  }
  // 消除顶端栏最大宽度
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
}
</style>
