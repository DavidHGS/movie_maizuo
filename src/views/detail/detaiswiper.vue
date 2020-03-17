<template>
  <div class="swiper-container filmswiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  props: ["preview", "myclass"],
  mounted() {
    new Swiper(`.${this.myclass}`, {
      slidesPerView: this.preview,
      spaceBetween: this.myclass === "actorswiper" ? 20 : 10
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
</style>
