<template>
  <div style="width: 100%">
    <div style="text-align: center; padding: 20px; width: 100%">
      <select
        v-model="selectedLeague"
        @change="onLeagueChange($event)"
        style="display: initial; margin: auto"
      >
        <option v-bind:key="x" v-for="x in leagues" :value="x">{{ x }}</option>
      </select>
      <div style="display: inline-block; padding-left: 10px">
        <select v-model="selectedHomeTeam">
          <option v-bind:key="x" v-for="x in teams" :value="x.id">{{ x.name }}</option>
        </select>
      </div>
      <div style="display: inline-block; padding-left: 10px">
        <select v-model="selectedAwayTeam">
          <option v-bind:key="x" v-for="x in teams" :value="x.id">{{ x.name }}</option>
        </select>
      </div>
      <div style="text-align: center">
        Speed <input type="range" min="2" max="5" value="2" v-model="accuracy" />Accuracy
        <input
          style="margin-left: 10px; margin-right: 5px"
          type="radio"
          id="stats"
          value="stats"
          v-model="mode"
        />
        <label for="stats">Stats</label>

        <input
          style="margin-left: 10px; margin-right: 5px"
          type="radio"
          id="bets"
          value="bets"
          v-model="mode"
        />
        <label for="bets">Bets</label>

        <div style="display: inline-block; padding: 10px 10px">
          <Button @click="sendMessage($event)" size="small" rounded>Predict</Button>
        </div>
      </div>
    </div>
    <div class="teams-selector-block" style="padding: 10px"></div>
    <div v-if="mode == 'stats'">
      <div v-bind:key="line" v-for="line in statLines" class="stats-row">
        <StatLine
          :statName="line.statName"
          :homeTeam="+line.homeTeam"
          :awayTeam="+line.awayTeam"
        ></StatLine>
      </div>
    </div>
    <div v-if="mode == 'bets'">
      <div v-bind:key="line" v-for="line in betLines" class="">
        <BetLine :betName="line.betName" :parts="line.relative_odds"></BetLine>
      </div>
    </div>
    <div v-if="loading == true" style="text-align: center">Calculating...</div>
  </div>
</template>

<style scoped>
.teams-selector-block {
  display: flex;
  justify-content: space-between;
}
.stats-row {
  display: flex;
  justify-content: space-around;
}
select {
  width: 150px;
  background-color: var(--text-color-contrast);
  color: var(--text-color);
}
input {
  background-color: var(--text-color-contrast);
  color: var(--text-color);
  border: solid 1px grey;
}
</style>

<script>
import { getLeagues, getTeams } from '../services/api.service'
const socket = new WebSocket('ws://localhost:8357')
export default {
  data() {
    return {
      data: null,
      mode: 'stats',
      leagues: [],
      teams: [],
      selectedLeague: null,
      selectedHomeTeam: null,
      selectedAwayTeam: null,
      loading: false,
      statLines: [],
      accuracy: 6,
      betLines: []
    }
  },
  created() {
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)
      if (data.mode === 'stats') {
        this.setStat(data)
      } else {
        this.setBet(data)
      }
      this.loading = !data.done
    })
  },
  methods: {
    async onLeagueChange(event) {
      const data = await getTeams(event.target.value)
      this.setTeams(data.teams)
    },
    setPost(post) {
      this.data = post
    },
    setTeams(teams) {
      this.teams = [...new Set(teams)]
    },
    setLeagues(leagues) {
      this.leagues = leagues
    },
    sendMessage() {
      if (this.mode === 'bets') this.betLines = []
      socket.send(`${this.selectedHomeTeam}>${this.selectedAwayTeam}>${this.mode}>${this.accuracy}`)
      this.done = false
    },
    setStat(line) {
      this.statLines.push(line)
    },
    setBet(line) {
      this.betLines.push(line)
    }
  },
  async beforeRouteEnter(to, from, next) {
    const data = await getLeagues()
    next((vm) => vm.setLeagues(data.leagues))
  }
}
</script>
