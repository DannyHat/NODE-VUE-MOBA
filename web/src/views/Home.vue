<template>
  <div class="home">
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img src="../assets/swiper1.png" alt="" style="width: 100%">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/swiper2.jpeg" alt="" style="width: 100%">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/swiper3.jpeg" alt="" style="width: 100%">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>  
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 pt-3 text-dark d-flex flex-wrap text-center">
      <div class="nav-item mb-3" v-for="n in 10" :key="n">
        <i class="sprite sprite-news"></i>
        <div>爆料站</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
          // Some Swiper option/callback...
        }
    }
  }
}
</script>
<style lang="scss">
.swiper-pagination {
  text-align: right !important;
  padding-right: 10px;
}
.swiper-pagination-bullet {
  background-color: #fff !important;
  opacity: 1 !important;
  border-radius: 2px !important;
}
.swiper-pagination-bullet-active {
  background-color: #4b67af !important;
}
.nav-icons {
  .nav-item {
    width: 25%;
  }
}
</style>
