<template>
  <div class="bet-name">
    {{ betName }}
  </div>
  <div class="line">
    <div
      class="part"
      v-bind:key="part + '' + index"
      v-for="(part, index) in parts"
      :value="part"
      :style="{
        width: part * 100 + '%',
        'background-color': colors[index]
      }"
    >
      {{ part ? (1 / +part).toFixed(2) : '' }}
    </div>
  </div>
</template>

<style scoped>
.bet-name {
  text-align: center;
  width: 100%;
  margin: auto;
}

.line {
  width: 50%;
  margin: auto;
  color: var(--text-color);
  text-align: center;
}

.part {
  color: var(--text-color-contrast);
  display: inline-block;
  margin: auto;
  text-align: center;
}

.part:first-child {
  border-radius: 10px 0 0 10px;
}

.part:last-child {
  border-radius: 0 10px 10px 0;
}
</style>

<script>
export default {
  props: ['parts', 'betName'],
  data() {
    return {
      colors: ['darkgreen', 'darkorange', 'darkred']
    }
  }
}
</script>
