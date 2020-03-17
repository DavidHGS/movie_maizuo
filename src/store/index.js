import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Indicator } from "mint-ui";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showTabbar: true,
    comingList: [],
    isNowplaying: true,
    playingList: [],
    cityId: 510100,
    pageNum: 1
  },
  mutations: {
    showMaizuoTabbar(state, data) {
      state.showTabbar = data;
    },
    hiddenMaizuoTabbar(state, data) {
      state.showTabbar = data;
    },
    isNowplaying(state, data) {
      state.isNowplaying = data;
    },
    comingListMutation(state, data) {
      state.pageNum++;
      state.comingList = [...state.comingList, ...data];
    },
    comingMoreListMutation(state, data) {
      state.pageNum++;
      state.playingList = [...state.playingList, ...data];
    }
  },
  actions: {
    //异步处理的操作
    getComingListAction(store) {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      axios({
        url: `https://m.maizuo.com/gateway?cityId=${store.state.cityId}&pageNum=1&pageSize=10&type=2&k=3199668`,
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1584104979768799146087","bc":"510100"}',
          "X-Host": "mall.film-ticket.film.list"
        }
      }).then(res => {
        console.log(res.data);
        store.commit("comingListMutation", res.data.data.films);
        Indicator.close();
      });
    },
    getMoreComingListAction(store) {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      return new Promise((resolve, reject) => {
        axios({
          url: `https://m.maizuo.com/gateway?cityId=${store.state.cityId}&pageNum=${store.state.pageNum}&pageSize=10&type=2&k=3199668`,
          headers: {
            "X-Client-Info":
              '{"a":"3000","ch":"1002","v":"5.0.4","e":"1584104979768799146087","bc":"510100"}',
            "X-Host": "mall.film-ticket.film.list"
          }
        })
          .then(res => {
            store.commit("comingMoreListMutation", res.data.data.films);
            Indicator.close();
            resolve("ok");
          })
          .catch(() => {
            reject("no ok");
          });
      });
    }
  },
  modules: {}
});
