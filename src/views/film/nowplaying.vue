<template>
  <div class="nowPlayingList-wrap">
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="0"
      infinite-scroll-immediate-check="false"
    >
      <li
        class="nowPlayingFilm-item"
        v-for="data in dataList"
        :key="data.filmId"
        @click="handleChangePage(data.filmId)"
      >
        <div class="nowPlayingFilm-wrap">
          <div
            class="lazy-img nowPlayingFilm-img"
            alt="film"
            style="width: 66px; height: 94px; background: rgb(249, 249, 249); float: left;"
          >
            <div
              class="lazy-img-wrap"
              style="width: 66px; height: 94px; background: rgb(249, 249, 249); opacity: 1; display: block;"
            >
              <img :src="data.poster" class="target-img" />
            </div>
          </div>
          <div class="nowPlayingFilm-info" style="float: left;">
            <div class="nowPlayingFilm-name info-col">
              <span class="name">{{ data.name }}</span
              ><span class="item">{{ data.filmType.name }}</span>
            </div>
            <div
              class="nowPlayingFilm-grade info-col"
              style="visibility: visible;"
            >
              <span class="label">观众评分 </span
              ><span class="grade">{{ data.grade }}</span>
            </div>
            <div class="nowPlayingFilm-actors info-col">
              <span class="label">主演：{{ data.actors | actorfilter }}</span>
            </div>
            <div class="nowPlayingFilm-detail info-col">
              <span class="label"
                >{{ data.nation }} | {{ data.runtime }}分钟</span
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="isShow">正在加载中...</div>
    <div v-else>我是有底线的...</div>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import { Indicator } from "mint-ui";
import { InfiniteScroll } from "mint-ui";

Vue.use(InfiniteScroll);

Vue.filter("actorfilter", data => {
  var newlist = data.map(item => item.name);
  return newlist.join(" ");
});
export default {
  data() {
    return {
      dataList: [],
      loading: false,
      current: 1,
      total: 0,
      isShow: true,
      cityId: ""
    };
  },
  mounted() {
    this.$store.commit("isNowplaying", true);
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    this.cityId = localStorage.getItem("cityId") || 510100;
    axios({
      url:
        //https://m.maizuo.com/gateway?type=2&cityId=110100&k=5553387
        `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=4945944`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1584104979768799146087","bc":"429004"}',
        "X-Host": "mall.film-ticket.film.list"
      }
    }).then(res => {
      this.dataList = res.data.data.films;
      this.total = res.data.data.total;
      Indicator.close();
    });
  },
  methods: {
    handleChangePage(id) {
      //编程式导航--路径跳转
      // this.$router.push(`/detail/${id}`)
      //编程式导航--名字跳转
      this.$router.push({ name: "detail", params: { id } });
    },
    loadMore() {
      this.loading = true; //禁用loading
      this.current++;
      if (this.dataList.length === this.total) {
        this.isShow = false;
        return;
      }
      axios({
        url:
          //https://m.maizuo.com/gateway?type=2&cityId=110100&k=5553387
          `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=4945944`,
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1584104979768799146087","bc":"429004"}',
          "X-Host": "mall.film-ticket.film.list"
        }
      }).then(res => {
        this.dataList = [...this.dataList, ...res.data.data.films];
        Indicator.close();
        this.loading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.nowPlayingList-wrap li {
  padding: 15px;
  height: 94px;
  position: relative;
  .nowPlayingFilm-wrap {
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
      .padding {
        height: 56vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
      .target-img {
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
  .nowPlayingFilm-info {
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
    .grade {
      color: #ffb232;
      font-size: 14px;
    }
  }
}
</style>
