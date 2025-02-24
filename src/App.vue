<script setup></script>

<template>
  <div class="app-header">
    {{ $route.name }}
    <hr />
  </div>
  <div class="app-view">
    <div class="navigation"><Navigation /></div>
    <div class="page">
      <RouterView />
      <!--<div class="scroll top" @click="scroll(false)">&#8595; To bottom</div>
      <div class="scroll bottom" @click="scroll(true)">&#8593; To top</div>-->
    </div>
  </div>
</template>

<style>
.scroll {
  float: right;
  cursor: pointer;
  margin-left: 20px;
  font-size: 20px;
  color: lightgoldenrodyellow;
}

.bottom {
  bottom: 10px;
  right: 10px;
  position: absolute;
  z-index: 10;
}

.top {
  top: 10px;
  right: 10px;
  position: absolute;
  z-index: 10;
}

.scroll:hover {
  color: var(--text-color-contrast);
}

.navigation {
  width: 300px;
  padding-left: 20px;
}

.page {
  justify-content: center;
  display: flex;
  width: 100vw;
  overflow-y: scroll;
}

@media (max-width: 1024px) {
  .navigation {
    width: auto;
  }
  .page {
    width: calc(100vw - 160px);
  }
}

.app-header {
  padding: 10px;
  height: 45px;
  text-align: center;
  font-size: 22px;
  background-color: transparent;
  color: var(--text-color-contrast);
  width: 100%;
}

.app-view {
  padding-top: 20px;
  display: flex;
  height: calc(100vh - 50px);
  width: 100vw;
}

nav {
  font-size: 1rem;
  padding: 20px;
  margin-top: 1rem;
  margin: auto;
}
</style>

<script>
export default {
  data() {
    return {
      mode: 'absolute',
      predicts: []
    }
  },
  methods: {
    location() {
      this.router.name
    },
    scroll(top = false) {
      let container = window.document.querySelector('.page')
      if (top) {
        container.scrollTop = 0
      } else {
        container.scrollTop = container.scrollHeight
      }
    }
  }
}
</script>
