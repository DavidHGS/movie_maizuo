<template>
  <div>
    <mt-index-list>
      <mt-index-section
        :index="list.index"
        v-for="list in dataList"
        :key="list.index"
      >
        <div
          v-for="data in list.list"
          :key="data.cityId"
          @click="changeCity(data.cityId, data.name)"
        >
          <mt-cell :title="data.name"></mt-cell>
        </div>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>
<script>
import { IndexList, IndexSection } from "mint-ui";
import Vue from "vue";
import axios from "axios";
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
export default {
  data() {
    return {
      dataList: []
    };
  },
  mounted() {
    axios({
      url: "https://m.maizuo.com/gateway?k=2192079",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1584104979768799146087"}',
        "X-Host": " mall.film-ticket.city.list"
      }
    }).then(res => {
      this.handelCity(res.data.data.cities);
    });
  },
  methods: {
    changeCity(cityId, city) {
      localStorage.setItem("cityId", cityId);
      localStorage.setItem("city", city);
      this.$router.push("/cinema");
    },
    handelCity(dataList) {
      let letterArr = [];
      for (var i = 65; i <= 90; i++) {
        letterArr.push(String.fromCharCode(i));
      }
      var newList = [];
      for (var j = 0; j < letterArr.length; j++) {
        var arr = dataList.filter(
          item => item.pinyin.substring(0, 1) == letterArr[j].toLowerCase()
        );
        if (arr.length > 0) {
          newList.push({
            index: letterArr[j],
            list: arr
          });
        }
      }
      this.dataList = newList;
    }
  }
};
</script>
