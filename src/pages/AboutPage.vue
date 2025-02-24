<template>
  <div class="about">
    <ol>
      <li>
        <h2>
          <RouterLink class="step-link" to="/oddList"
            ><span class="pi pi-flag"> </span> Events</RouterLink
          >
          Create one or more match event conditions.
        </h2>
      </li>

      <li>
        <h2>
          <RouterLink class="step-link" to="/gorupList"
            ><span class="pi pi-objects-column"> </span> Groups</RouterLink
          >Create a group and add match event conditions to it.
        </h2>
      </li>

      <li>
        <h2>
          <RouterLink class="step-link" to="/queue"
            ><span class="pi pi-list"> </span> Queue</RouterLink
          >Select home and away teams and attach groups to a match.
        </h2>
      </li>

      <li>
        <h2>
          <RouterLink class="step-link" to="/strategy"
            ><span class="pi pi-chart-bar"> </span> Predicted</RouterLink
          >Wait for calculated odds.
        </h2>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.step-link:hover {
  background: initial;
}
.step-link {
  color: deepskyblue;
  display: inline-block !important;
}
.about {
  display: block;
  width: 100%;
  padding: 20px;
  color: var(--text-color-contrast);
  text-align: left;
}
</style>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>
