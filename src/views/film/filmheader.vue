<template>
  <div class="first">
    <ul>
      <router-link tag="li" to="/film/nowplaying" activeClass="myactive">
        <span>正在热映</span>
      </router-link>
      <router-link tag="li" to="/film/comingsoon" activeClass="myactive">
        <span>即将上映</span>
      </router-link>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
ul {
  display: flex;
  li {
    flex: 1;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: white;
    font-size: 14px;
  }
}
.first {
  z-index: 1;
}
.myactive {
  color: red;
  span {
    text-align: center;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    cursor: pointer;
    border-bottom: 2px solid red;
  }
}
.fixed {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
}
</style>
