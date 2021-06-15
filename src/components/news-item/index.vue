<template>
  <!-- 每一个新闻格子 -->
  <div class="news-item-container">
    <van-cell @click.prevent="clickNews" class="item-cell" :url="news.news_url">
      <!-- 新闻标题 -->
      <div slot="title">
        <span
          v-if="isS"
          class="name"
          v-html="highlight(news.news_title, isH)"
        ></span>

        <span v-else class="name">{{ news.news_title }}</span>
      </div>
      <!-- 新闻其他信息 -->
      <div class="label-wrap" slot="label">
        <span>{{ news.news_createTime | relativeTime }}</span>
        <span>{{ news.news_hot }}</span>
        <span>{{ news.news_pla }}</span>
      </div>

      <!-- 收藏按钮 -->
      <van-button
        size="mini"
        class="fav-btn"
        @click.stop="chooseModl"
        slot="right-icon"
        round
      >
        <van-icon
          v-if="userFav"
          class="fav-btn-icon"
          slot="default"
          name="star-o"
          size="14px"
        />
        <!-- 已收藏 -->
        <van-icon
          v-else
          size="14px"
          class="fav-btn-down-icon"
          slot="default"
          name="star"
        />
      </van-button>
    </van-cell>
  </div>
</template>

<script>
import {
  recordHistory,
  collectNews,
  cancelCollectNews,
  isCollectionNews
} from "@/api/user";

import store from "@/store/";

export default {
  name: "NewsItem",
  components: {},
  props: {
    news: {
      type: Object,
      required: true
    },
    isH: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      userFav: true,
      isS: false
    };
  },
  computed: {},
  watch: {},
  created() {
    this.checkIsCollectionNews();
  },
  mounted() {},
  methods: {
    // 记录历史
    async clickNews() {
      const { user } = store.state;
      if (user != null) {
        await recordHistory({ news_id: this.news.news_id });
      }
    },
    // 根据 userFav 选择取消/收藏
    async chooseModl() {
      // console.log(this.userFav);
      if (this.userFav == true) {
        await this.favotite();
      } else {
        await this.unFfavotite();
      }
    },

    // 点击收藏 新闻
    async favotite() {
      const { user } = store.state;
      if (user != null) {
        try {
          await collectNews({ news_id: this.news.news_id });
          this.$toast.success({
            message: "收藏成功",
            duration: 1500
          });
        } catch (e) {
          console.log(e);
        }
        this.userFav = !this.userFav;
        // console.log(this.userFav);
      } else {
        this.$toast.fail({
          message: "未登录\n不可收藏",
          duration: 1500
        });
      }
    },

    //点击取消收藏
    async unFfavotite() {
      const { user } = store.state;
      if (user != null) {
        try {
          await cancelCollectNews({ news_id: this.news.news_id });
          this.$toast.success({
            message: "取消收藏成功",
            duration: 1500
          });
        } catch (e) {
          console.log(e);
        }
        this.userFav = !this.userFav;
      } else {
        this.$toast.fail({
          message: "未登录\n操作失败",
          duration: 1500
        });
      }
    },

    // 判断新闻是否被收藏
    async checkIsCollectionNews() {
      if (this.isH != null) {
        this.isS = true;
      } else {
        this.isS = false;
      }
      try {
        // console.log(this.news.news_id);
        const { data } = await isCollectionNews({
          news_id: this.news.news_id
        });
        if (data.data) {
          this.userFav = false;
        }
        // console.log(data);
        // isCollected = data.data;
      } catch (e) {
        console.log(e);
      }
    },
    // 参数 source: 原始字符串
    // 参数 keyword: 需要高亮的关键词
    // 返回值：替换之后的高亮字符串
    highlight(source, keyword) {
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(keyword, "gi");
      return source.replace(
        reg,
        `<span style="color: #3296fa">${keyword}</span>`
      );
    }
  }
};
</script>

<style scoped lang="less">
.item-cell {
  position: relative;
  z-index: 1;
  .name {
    font-size: 16px;
    font-weight: 530;
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
    margin-top: 6px;
    span {
      margin-left: 8px;
    }
  }
  .fav-btn {
    z-index: 99;
    position: absolute;
    right: 5%;
    bottom: 4%;
  }
  .fav-btn {
    background-color: white;
    border: none;
    .fav-btn-icon {
      color: gray;
    }
    .fav-btn-down-icon {
      color: gold;
    }
  }
}
</style>
