<template>
  <div class="stat-name">
    <div class="line">{{ statName }}</div>
    <div
      class="home-team-part"
      :style="{
        width: (homeTeam / (homeTeam + awayTeam)) * 100 + '%'
      }"
    >
      {{ homeTeam.toFixed(2) || '' }}
    </div>
    <div
      class="away-team-part"
      :style="{
        width: (awayTeam / (homeTeam + awayTeam)) * 100 + '%'
      }"
    >
      {{ awayTeam.toFixed(2) || '' }}
    </div>
  </div>
</template>

<style scoped>
.home-team-part {
  float: left;
  color: var(--text-color-contrast);
  text-align: left;
  background-color: darkred;
  border-radius: 10px 0 0 10px;
  padding: 0 10px 0;
}
.away-team-part {
  color: var(--text-color-contrast);
  text-align: right;
  background-color: darkgreen;
  float: left;
  border-radius: 0 10px 10px 0;
  padding: 0 10px 0;
}

.stat-name {
  width: 50%;
  margin: auto;
  color: var(--text-color);
}

.line {
  text-align: center;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
export default {
  props: ['statName', 'homeTeam', 'awayTeam'],
  data() {
    return {
      leftBarWidth: 0.5,
      rightBarWidth: 0.5
    }
  }
}
</script>
