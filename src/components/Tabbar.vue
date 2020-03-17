<template>
  <nav>
    <ul>
      <router-link to="/film" tag="li" activeClass="myactive">
        <i class="iconfont iconatm-away"></i>
        film</router-link
      >
      <router-link to="/cinema" tag="li" activeClass="myactive">
        <i class="iconfont iconall"></i>
        cinema</router-link
      >
      <router-link to="/center" tag="li" activeClass="myactive">
        <i class="iconfont iconadd-cart"></i>
        center</router-link
      >
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.myactive {
  color: red;
}
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: white;

  ul {
    display: flex;
    justify-content: space-around;
    li {
      flex: 1;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
