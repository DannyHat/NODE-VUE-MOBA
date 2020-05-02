<template>
  <div>
    <div class="top_bar bg-black py-2 px-3 d-flex ai-center jc-space">
      <img src="../assets/logo.png" height="30">
      <div class="px-2 flex-1 text-left">
        <div class="text-white">王者荣耀</div>
        <div class="text-gray fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pb-2 pt-3">
      <div class="nav d-flex text-white jc-around">
        <div class="nav-item active">
          <router-link to="/" tag="div" class="nav-link">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/" tag="div" class="nav-link">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/" tag="div" class="nav-link">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
