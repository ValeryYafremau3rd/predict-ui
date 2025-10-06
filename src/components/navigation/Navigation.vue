<template>
  <nav class="flex flex-col w-full text-[15px] pb-5">
    <RouterLink to="/events" class="flex items-center text-[20px] px-5 py-4 my-1 hover:bg-gray-100 rounded transition-colors duration-150" active-class="nav-active">
      <span class="pi pi-flag mr-2"></span><span class="menu-text">Events</span>
    </RouterLink>
    <RouterLink to="/groups" class="flex items-center text-[20px] px-5 py-4 my-1 hover:bg-gray-100 rounded transition-colors duration-150" active-class="nav-active">
      <span class="pi pi-objects-column mr-2"></span><span class="menu-text">Groups</span>
    </RouterLink>
    <RouterLink to="/queue" class="flex items-center text-[20px] px-5 py-4 my-1 hover:bg-gray-100 rounded transition-colors duration-150" active-class="nav-active">
      <span class="pi pi-list mr-2"></span><span class="menu-text">Queue</span>
    </RouterLink>
    <RouterLink to="/predicted" class="flex items-center text-[20px] px-5 py-4 my-1 hover:bg-gray-100 rounded transition-colors duration-150" active-class="nav-active">
      <span class="pi pi-chart-bar mr-2"></span><span class="menu-text">Predicted</span>
    </RouterLink>
    <hr class="my-2 border-gray-300" />
    <RouterLink to="/account" class="flex items-center text-[20px] px-5 py-4 my-1 hover:bg-gray-100 rounded transition-colors duration-150" active-class="nav-active">
      <span class="pi pi-user mr-2"></span><span class="menu-text">Account</span>
    </RouterLink>
    <RouterLink to="/info" class="flex items-center text-[20px] px-5 py-4 my-1 hover:bg-gray-100 rounded transition-colors duration-150" active-class="nav-active">
      <span class="pi pi-exclamation-triangle mr-2"></span><span class="menu-text">Info</span>
    </RouterLink>
    <hr class="my-2 border-gray-300" />
    <RouterLink name="Playground" to="/playground" class="flex items-center text-[20px] px-5 py-4 my-1 hover:bg-gray-100 rounded transition-colors duration-150" active-class="nav-active">
      <span class="pi pi-sliders-h mr-2"></span> <span class="menu-text">Playground</span>
    </RouterLink>
    <!--
    <RouterLink name="RecentMatch" to="/recent" class="flex items-center text-[20px] px-5 py-4 my-1 hover:bg-gray-100 rounded transition-colors duration-150" active-class="nav-active">
      <span class="pi pi-sliders-h mr-2"></span>
      <span class="menu-text">Recent match</span>
    </RouterLink>
    -->
  </nav>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: null
    }
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab
    }
  }
}
</script>
