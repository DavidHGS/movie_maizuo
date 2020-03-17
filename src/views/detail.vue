<template>
  <div class="movie" :style="mystyle">
    <div v-if="movieinfo" class="film">
      <div class="film-header">
        <div class="goBack" @click="goback($store.state.isNowplaying)">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
            alt=""
          />
        </div>
        <div class="title">{{ movieinfo.name }}</div>
        <!---->
      </div>
      <img :src="movieinfo.poster" class="poster" />
      <div class="film-detail">
        <div class="col">
          <div class="film-name">
            <span class="name">{{ movieinfo.name }}</span
            ><span class="item">{{ movieinfo.filmType.name }}</span>
          </div>
          <div class="film-grade" v-if="movieinfo.grade">
            <span class="grade">{{ movieinfo.grade }}</span>
            <span class="grade-text">分</span>
          </div>
        </div>
        <div class="film-category grey-text">
          {{ movieinfo.category }}
        </div>
        <div class="film-premiere-time grey-text">
          {{ movieinfo.premiereAt | timefilter }}上映
        </div>
        <div class="film-nation-runtime grey-text">
          {{ movieinfo.nation }} | {{ movieinfo.runtime }}分钟
        </div>
        <div class="test grey-text">{{ movieinfo.synopsis }}</div>
        <div
          class="film-synopsis grey-text"
          :class="ishidden ? 'hidde' : ''"
          style="height: 173px;"
        >
          {{ movieinfo.synopsis }}
        </div>
        <div class="toggle" @click="handelhidden()">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAMAAADHqI+lAAAAOVBMVEVHcEy9xcW9wMW9wcW////Bwca9wcW9wMW9wMW+wMW+wcW9wcXMzMy+wMa+wce9wMe9wca9wMW9wMWKU/2FAAAAEnRSTlMAH+jGBDa6/vaatcIPdlNSdckJHB8JAAAASUlEQVQIHQXBhwGDMAADMCVksQr4/2MrObYCQNkOZ2oH6DWna2Q9wG9lXLQ984V3Zm/gntlb2zNvgN/KGFkPAL0mtQNA+b4C/AGl4gJfgEWzrAAAAABJRU5ErkJggg=="
            alt=""
            class="upper"
          />
        </div>
      </div>
      <!-- 演职人员轮播 -->
      <div class="actors-title-bar" style="padding:0 15px 15px 15px;">
        <span class="actors-title-text">演职人员</span>
      </div>
      <swiper preview="4" class="actorswiper" myclass="actorswiper">
        <div
          class="swiper-slide actor-swiper-slide"
          v-for="data in movieinfo.actors"
          :key="data.name"
        >
          <img :src="data.avatarAddress" />
          <span class="actor-name">{{ data.name }}</span>
          <span class="actor-role">{{ data.role }}</span>
        </div>
      </swiper>
      <div class="photos">
        <div class="photos-title-bar">
          <span class="photos-title-text">剧照</span>
          <span class="photos-to-all"
            >全部({{ movieinfo.photos.length }})<i
              class="iconfont iconarrow-right"
              style="font-size: 13px;"
            ></i
          ></span>
        </div>

        <!-- 剧照轮播 -->
        <swiper preview="3" class="photoswiper" myclass="photoswiper">
          <div
            class="swiper-slide"
            v-for="(data, index) in movieinfo.photos"
            :key="index"
          >
            <img :src="data" />
          </div>
        </swiper>
        <a
          href="#/film/5029/cinemas"
          class=""
          style="height: 49px; position: fixed; bottom: 0px; width: 100%;"
          ><div class="goSchedule">
            选座购票
          </div></a
        >
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import swiper from "@/views/detail/detaiswiper";
//unix时间转换为标准时间
Vue.filter("timefilter", unixtime => {
  var unixTimestamp = new Date(unixtime * 1000);
  return unixTimestamp
    .toLocaleString()
    .split(" ")[0]
    .split("/")
    .join("-");
});

export default {
  data() {
    return {
      movieinfo: null,
      ishidden: true,
      mystyle: {
        height: "0px"
      }
    };
  },
  components: {
    swiper
  },
  methods: {
    handelhidden() {
      this.ishidden = !this.ishidden;
    },
    goback(data) {
      data
        ? this.$router.push("/film/nowplaying")
        : this.$router.push("/film/comingsoon");
    }
  },
  beforeMount() {
    this.$store.commit("hiddenMaizuoTabbar", false);
  },
  mounted() {
    this.mystyle.height = document.documentElement.clientHeight - 50 + "px";
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.id}&k=4954135`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1584104979768799146087","bc":"510100"}',
        "X-Host": " mall.film-ticket.film.info"
      }
    }).then(res => {
      this.movieinfo = res.data.data.film;
    });
  },
  beforeDestroy() {
    this.$store.commit("showMaizuoTabbar", true);
  }
};
</script>
<style lang="scss" scoped>
.film .film-header {
  position: fixed;
  background-color: hsla(0, 0%, 100%, 0);
  color: transparent;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  width: 100vw;
  height: 44px;
  z-index: 1;
  .goBack {
    height: 30px;
    position: absolute;
    top: 5px;
    left: 5px;
    img {
      width: 30px;
    }
  }
  .title {
    font-size: 17px;
    line-height: 44px;
    width: 100vw;
    text-align: center;
  }
}

.poster {
  width: 100%;
}
.photoswiper {
  img {
    height: 70px;
  }
}
.movie {
  overflow-y: auto;
}
.film {
  .film-detail {
    padding: 15px;
    padding-top: 12px;
    background-color: #fff;
    .film-synopsis {
      transition: height 0.5s ease;
      margin-top: 12px;
    }
    .col {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .film-name {
        width: 100%;
        .name {
          color: #191a1b;
          font-size: 18px;
          height: 24px;
          line-height: 24px;
          margin-right: 7px;
        }
        .item {
          font-size: 9px;
          color: #fff;
          background-color: #d2d6dc;
          height: 14px;
          line-height: 14px;
          padding: 0 2px;
          border-radius: 2px;
          display: inline-block;
        }
      }
      .film-grade {
        width: calc(100% - 250px);
        text-align: right;
        color: #ffb232;
        .grade {
          font-size: 18px;
          font-style: italic;
        }
        .grade-text {
          font-size: 10px;
        }
      }
    }
    .grey-text {
      font-size: 13px;
      color: #797d82;
      margin-top: 4px;
    }
    .hidde {
      height: 36px !important;
      overflow: hidden;
      transition: height 0.5s ease;
    }
    .toggle {
      text-align: center;
      display: block;
      height: auto;
      width: 20px;
      margin: auto;
      line-height: normal;
      img {
        width: 8px;
        margin: auto;
      }
    }
  }
  .test {
    width: calc(100vw - 30px);
    opacity: 0;
    position: absolute;
    top: 1px;
    margin-left: -10000px;
    font-size: 13px;
  }
}
.actor-swiper-slide {
  width: 85px !important;
}
.actorswiper {
  span {
    display: block;
    text-align: center;
  }
  .actor-name {
    padding-top: 10px;
    font-size: 12px;
    color: #191a1b;
    width: 85px;
    height: 18px;
    display: block;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .actor-role {
    font-size: 10px;
    color: #797d82;
  }
}
.film .photos {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  .photos-title-bar {
    height: 32px;
    padding: 15px;
    .photos-title-text {
      font-size: 16px;
      text-align: left;
      color: #191a1b;
    }
    .photos-to-all {
      font-size: 13px;
      color: #797d82;
      float: right;
    }
  }
}
.goSchedule {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 49px;
  width: 100%;
  text-align: center;
  background-color: #ff5f16;
  color: #fff;
  font-size: 16px;
  line-height: 49px;
}
</style>
