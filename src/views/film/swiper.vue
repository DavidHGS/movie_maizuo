<template>
  <div class="swiper-container filmswiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination film-swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  mounted() {
    new Swiper(".filmswiper", {
      loop: true, // 循环模式选项
      autoplay: {
        delay: 2000
      },
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.swiper-wrapper {
  img {
    width: 100%;
  }
}
.film-swiper-pagination {
  text-align: right;
}
</style>
