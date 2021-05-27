<template>
  <!-- 每一个新闻格子 -->
  <div class="news-item-container">
    <van-cell @click.prevent="clickNews" class="item-cell" :url="news.news_url">
      <!-- 新闻标题 -->
      <div slot="title">
        <span class="name">{{ news.news_title }}</span>
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
        @click.stop="favotite"
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
import { recordHistory } from "@/api/user";
export default {
  name: "NewsItem",
  components: {},
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      userFav: true
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async clickNews() {
      await recordHistory({ news_id: this.news.news_id });
    },
    favotite() {
      this.userFav = !this.userFav;
      console.log(this.userFav);
    }
  }
};
</script>

<style scoped lang="less">
// .item-cell {
//   box-sizing: border-box;
//   .fav-btn {
//     margin-top: 20px;
//   }
// }
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
