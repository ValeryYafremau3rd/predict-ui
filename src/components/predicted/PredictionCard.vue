<template>
  <div class="PredictionCard">
    <div class="header">
      <div class="league">{{ league }}</div>
      <div class="teams">{{ homeTeam }} - {{ awayTeam }}</div>
      <div class="button-block">
        <Button
          class="expand-Button"
          @click="remove()"
          size="small"
          severity="danger"
          label="Remove"
          iconPos="right"
          icon="pi pi-trash"
        ></Button>
        <Button
          v-if="expanded"
          @click="togglePrediction($event)"
          class="expand-Button"
          size="small"
          iconPos="right"
          severity="secondary"
          icon="pi pi-chevron-up"
          label="Fold"
        >
        </Button>
        <Button
          v-if="!expanded"
          @click="togglePrediction($event)"
          class="expand-Button"
          size="small"
          iconPos="right"
          severity="secondary"
          icon="pi pi-chevron-down"
          label="Unfold"
        >
        </Button>
      </div>
      <hr />
    </div>
    <div v-if="expanded" class="expanded">
      <div v-bind:key="odd.rates[0]" v-for="[bet, odd] in Object.entries(odds)" class="bet-line">
        <div class="bet-container">
          <div>
            <div class="bet-name">{{ bet }}</div>
            <div class="odds-container" v-if="mode == 'relative'">
              <div
                v-bind:key="part"
                v-tooltip.top="odd.hints[i]"
                v-for="[i, part] in odd.relative.entries()"
                class="part-container"
              >
                <div
                  class="odd-cell"
                  :class="[
                    { 'high-rate': odd.relative_rates[i] >= 0.8 },
                    { 'low-rate': odd.relative_rates[i] <0.3 }
                  ]"
                >
                  {{ part }}
                </div>
                <div
                  class="rate-cell"
                  :class="[
                    { 'high-rate': odd.relative_rates[i] >= 0.8 },
                    { 'low-rate': odd.relative_rates[i] <0.3 }
                  ]"
                >
                  {{ odd.relative_rates[i].toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
          <div class="odds-container" v-if="mode == 'absolute'">
            <div
              v-bind:key="part"
              v-tooltip.top="odd.hints[i]"
              v-for="[i, part] in odd.absolute.entries()"
              class="part-container"
            >
              <div
                class="odd-cell"
                :class="[{ 'high-rate': odd.rates[i] >= 0.8 }, { 'low-rate': odd.rates[i] <0.3 }]"
              >
                {{ part }}
              </div>
              <div
                class="rate-cell"
                :class="[{ 'high-rate': odd.rates[i] >= 0.8 }, { 'low-rate': odd.rates[i] <0.3 }]"
              >
                {{ odd.rates[i].toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="false"
          class="avg-rate"
          :class="[
            {
              'high-rate': odd.rates.reduce((acc, rate) => acc + rate, 0) / odd.rates.length >= 0.8
            },
            { 'low-rate': odd.rates.reduce((acc, rate) => acc + rate, 0) / odd.rates.length <0.3 }
          ]"
        >
          {{ (odd.rates.reduce((acc, rate) => acc + rate, 0) / odd.rates.length).toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['homeTeam', 'awayTeam', 'odds', 'mode', 'league', 'remove'],
  data() {
    return {
      expanded: true,
      riskColors: ['crimson', 'lightgrey', 'limegreen']
    }
  },
  methods: {
    togglePrediction() {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style scoped>
.button-block {
  float: right;
}
.league {
  display: inline-block;
  padding: 5px 20px;
  color: var(--text-color-contrast);
  background-color: teal;
  margin-right: 20px;
  border-radius: 5px;
}
.high-rate {
  background-color: limegreen !important;
  color: var(--text-color-contrast) !important;
}
.low-rate {
  background-color: crimson !important;
  color: var(--text-color-contrast) !important;
}
.avg-rate {
  align-self: center;
  background-color: lightyellow;
}
input {
  margin-left: 5px;
}
.header {
  background-color: var(--card-background-color);
  padding: 20px;
  color: var(--text-color);
}
.bet-line {
  display: flex;
  order: solid 1px;
  padding: 5px;
  margin: 5px;
}
.odds-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.part-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
}
.expanded {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 10px;
  background-color: var(--card-background-color);
}
.bet-name {
  background-color: burlywood;
  text-align: center;
  font-size: 13px;
  padding: 0 5px;
}
.teams {
  font-size: 18px;
  display: inline-block;
}
.expand-Button {
  float: right;
  cursor: pointer;
}
.PredictionCard {
  display: flex;
  flex-direction: column;
  margin: 5px auto;
  background-color: var(--card-background-color);
  color: var(--text-color);
  font-size: 15;
  float: left;
  margin: 10px;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
}
.odd-cell {
  display: inline-block;
  color: var(--text-color);
  font-size: 15px;
  padding: 10px;
  background-color: lightgray;
  border: solid 1px lightyellow;
}
.rate-cell {
  background-color: lightyellow;
  color: var(--text-color);
  font-size: 12px;
  width: 80%;
  text-align: center;
  margin: auto;
}
</style>
