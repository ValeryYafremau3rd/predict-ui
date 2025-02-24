<template>
  <nav>
    <RouterLink to="/events"
      ><span class="pi pi-flag"> </span><span class="menu-text"> Events</span></RouterLink
    >
    <RouterLink to="/groups"
      ><span class="pi pi-objects-column"> </span><span class="menu-text"> Groups</span></RouterLink
    >
    <RouterLink to="/queue"
      ><span class="pi pi-list"> </span><span class="menu-text"> Queue</span></RouterLink
    >
    <RouterLink to="/predicted"
      ><span class="pi pi-chart-bar"> </span><span class="menu-text"> Predicted</span></RouterLink
    >
    <hr />
    <RouterLink to="/account"
      ><span class="pi pi-user"> </span><span class="menu-text"> Account</span></RouterLink
    >
    <RouterLink to="/info"
      ><span class="pi pi-exclamation-triangle"> </span
      ><span class="menu-text"> Info</span></RouterLink
    >
    <hr />
    <RouterLink name="Playground" to="/playground"
      ><span class="pi pi-sliders-h"> </span> <span class="menu-text"> Playground</span></RouterLink
    >
    <RouterLink name="RecentMatch" to="/recent"
      ><span class="pi pi-sliders-h"> </span>
      <span class="menu-text"> Recent match</span></RouterLink
    >
  </nav>
</template>

<style scoped>
@media (max-width: 1024px) {
  .menu-text {
    display: none;
  }
}
.category {
  cursor: pointer;
  font-size: 20px;
  border-radius: 0;
}
a {
  display: block !important;
  font-size: 20px;
  padding: 0 20px;
  cursor: pointer;
}
ul {
  list-style-type: none;
}
li {
  display: inline-block;
}

nav {
  display: flex;
  width: 100%;
  font-size: 15px;
  padding: 0 0 20px;
  flex-flow: column;
}

nav a.router-link-exact-active {
  color: yellowgreen;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  padding: 10px;
}

nav a:first-of-type {
  border: 0;
}
</style>

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
