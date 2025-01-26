<template>
  <div class="app-container">
    <video autoplay loop muted playsinline>
      <source src="./assets/video/m2-res_720p.mp4" type="video/mp4" />
    </video>
    <div class="content-container">
      <h1>Walk in Azeroth</h1>
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
};
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
  perspective: 1px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background: #000;
    background: linear-gradient(180deg, #000000 0%, #00000000 30%);
  }
  .content-container {
    padding-top: $spacing-regular;
    position: relative;
    z-index: 1;
    overflow: auto;
    height: 100%;
  }
  h1 {
    margin: $spacing-regular 0px;
  }
  @media (min-width: 768px) {
    .content-container {
      padding-top: $spacing-xl;
    }
    h1 {
      margin: $spacing-xl 0px;
    }
  }
}
video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: -1;
}
</style>
