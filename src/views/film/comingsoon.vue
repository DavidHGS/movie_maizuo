<template>
  <div class="comingSoon-wrap">
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="0"
      infinite-scroll-immediate-check="false"
    >
      <li
        class="comingSoonFilm-item"
        v-for="data in $store.state.comingList"
        :key="data.filmId"
        @click="handleClick(data.isPresale, data.filmId)"
      >
        <div class="comingSoonFilm-wrap">
          <div
            data-v-21c202bd=""
            class="lazy-img comingSoonFilm-img"
            alt="film"
            style="width: 66px; height: 94px; background: rgb(249, 249, 249); float: left;"
          >
            <div
              data-v-21c202bd=""
              class="padding"
              style="width: 66px; height: 94px; background: rgb(249, 249, 249);"
            >
              <img
                data-v-21c202bd=""
                src="data:image/png;base64,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"
                width="64px"
                alt="img"
              />
            </div>
            <div
              data-v-21c202bd=""
              class="lazy-img-wrap"
              style="width: 66px; height: 94px; background: rgb(249, 249, 249); opacity: 1; display: block;"
            >
              <img data-v-21c202bd="" :src="data.poster" class="target-img" />
            </div>
          </div>
          <div class="comingSoonFilm-info" style="float: left;">
            <div class="comingSoonFilm-name info-col">
              <span class="name">{{ data.name }}</span
              ><span class="item">{{ data.filmType.name }}</span>
            </div>
            <div class="comingSoonFilm-grade info-col">
              &nbsp;
            </div>
            <div class="comingSoonFilm-actors info-col">
              <span class="label">主演：{{ data.actors | actorfilter }}</span>
            </div>
            <div class="comingSoonFilm-detail info-col">
              <span class="label"
                >上映日期：{{ data.premiereAt | timefilter }}</span
              >
            </div>
          </div>
        </div>
      </li>
      <!-- <li
        v-for="data in $store.state.comingList"
        :key="data.filmId"
        @click="handleClick(data.isPresale, data.filmId)"
      >
        <img :src="data.poster" />
        <h3>{{ data.name }}</h3>
        <p>观众评分{{ data.grade }}</p>
        <p>主演：{{ data.actors | actorfilter }}</p>
      </li> -->
    </ul>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import { InfiniteScroll } from "mint-ui";
import Vue from "vue";
Vue.use(InfiniteScroll);
Vue.filter("actorfilter", data => {
  var newlist = data.map(item => item.name);
  return newlist.join(" ");
});
//unix时间转换为标准时间
Vue.filter("timefilter", unixtime => {
  var unixTimestamp = new Date(unixtime * 1000);
  var time = unixTimestamp
    .toLocaleString()
    .split(" ")[0]
    .split("/");
  return time[1] + "月" + time[2] + "日";
});
export default {
  data() {
    return {
      loading: false,
      ishow: true
    };
  },
  mounted() {
    this.$store.commit("isNowplaying", false);
    if (this.$store.state.comingList.length === 0) {
      this.$store.dispatch("getComingListAction");
    } else {
      console.log("取出缓存");
    }
  },
  methods: {
    handleClick(data, id) {
      if (!data) {
        MessageBox({
          title: "提示",
          message: "没有排片，看看其他电影吧",
          showCancelButton: true
        }).then(res => {
          if (res == "confirm") {
            this.$router.push("/film/nowplaying");
          }
        });
      }
      //编程式导航--路径跳转
      // this.$router.push(`/detail/${id}`)
      //编程式导航--名字跳转
      this.$router.push({ name: "detail", params: { id } });
    },
    loadMore() {
      this.loading = true; //禁用loading
      if (this.$store.state.comingList.length === this.total) {
        this.isShow = false;
        return;
      }
      this.$store.dispatch("getMoreComingListAction").then(() => {
        this.loading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.comingSoon-wrap ul {
  list-style: none;
  padding: 0;
  margin-left: 15px;
  margin-bottom: 0;
  margin-top: 0;
  li {
    padding: 15px 15px 15px 0;
    height: 94px;
    position: relative;
    .comingSoonFilm-wrap {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: flex-start;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      .lazy-img {
        position: relative;
        .lazy-img-wrap {
          width: 100%;
          background: #fff;
          position: absolute;
          overflow: hidden;
          top: 0;
          opacity: 0;
          .target-img[data-v-21c202bd] {
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -o-transform: translateY(-50%);
          }
        }
      }
    }
    .comingSoonFilm-info {
      width: calc(100% - 116px);
      padding: 0 10px;
      .info-col {
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        .name {
          max-width: calc(100% - 25px);
          color: #191a1b;
          font-size: 16px;
          height: 22px;
          line-height: 22px;
          margin-right: 5px;
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .item {
          font-size: 9px;
          color: #fff;
          background-color: #d2d6dc;
          height: 14px;
          line-height: 14px;
          padding: 0 2px;
          border-radius: 2px;
        }
      }
      .label {
        font-size: 13px;
        margin-top: 4px;
        color: #797d82;
      }
    }
  }
}
</style>
