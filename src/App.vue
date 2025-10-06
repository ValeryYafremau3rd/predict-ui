<script setup></script>

<template>
  <div class="app-header text-center text-2xl py-2 h-[45px] w-full text-[color:var(--text-color-contrast)]">
    {{ $route.name }}
    <hr />
  </div>
  <div class="app-view flex pt-5 h-[calc(100vh-50px)] w-screen">
    <div class="navigation w-[300px] pl-25 max-w-full md:w-auto">
      <Navigation />
    </div>
    <div class="page flex justify-center w-screen overflow-y-scroll md:w-[calc(100vw-160px)] bg-[dark-orange]">
      <RouterView />
      <!--
      <div class="scroll top absolute top-2 right-2 z-10 float-right cursor-pointer ml-5 text-xl text-yellow-100 hover:text-[color:var(--text-color-contrast)]">&#8595; To bottom</div>
      <div class="scroll bottom absolute bottom-2 right-2 z-10 float-right cursor-pointer ml-5 text-xl text-yellow-100 hover:text-[color:var(--text-color-contrast)]">&#8593; To top</div>
      -->
    </div>
  </div>
  <ModalsContainer />
</template>

<!-- Removed <style> block, all styles are now Tailwind utility classes in the template. -->

<script>
import { ModalsContainer } from 'vue-final-modal'
export default {
  components: { ModalsContainer },
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
