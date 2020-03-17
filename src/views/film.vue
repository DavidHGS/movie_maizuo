<template>
  <div>
    <swiper :key="loopList.length" ref="myswiper">
      <div class="swiper-slide" v-for="data in loopList" :key="data.filmId">
        <img :src="data.poster" />
      </div>
    </swiper>
    <filmheader :class="isFixed ? 'fixed' : ''"></filmheader>
    <router-view></router-view>
  </div>
</template>
<script>
import swiper from "@/views/film/swiper";
import axios from "axios";
import filmheader from "@/views/film/filmheader";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      loopList: [],
      isFixed: false
    };
  },
  components: {
    swiper,
    filmheader
  },
  mounted() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    var id = localStorage.getItem("cityId") || 510100;
    axios({
      url: `https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=1&k=7610333`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1584104979768799146087","bc":"510100"}',
        "X-Host": "mall.film-ticket.film.list"
      }
    }).then(res => {
      this.loopList = res.data.data.films;
      Indicator.close();
    }),
      (window.onscroll = this.handelscroll);
  },
  beforeDestroy() {
    window.onscroll = null;
  },
  methods: {
    handelscroll() {
      if (
        document.documentElement.scrollTop >=
        this.$refs.myswiper.$el.offsetHeight
      ) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    }
  }
};
</script>
