<template>
  <div class="queue-page">
    <div class="queue-header">
      <Select
        v-model="selectedLeague"
        @change="onLeagueChange($event)"
        editable
        :options="leagues"
        placeholder="League"
        class="w-full md:w-56"
      >
        <template #option="league">
          <span :class="[{ unstable: league.option == 'Bundesliga' }]">
            {{ league.option }}
          </span>
        </template></Select
      >
      <div style="display: inline-block; padding-left: 10px">
        <Select
          v-model="selectedHomeTeam"
          editable
          optionLabel="name"
          :options="teams"
          placeholder="Home team"
          class="w-full md:w-56"
        >
          <template #option="team">
            <span :class="[{ unstable: promotedTeams.includes(team.option.id) }]">
              {{ team.option.name }}
            </span>
          </template></Select
        >
      </div>
      <div style="display: inline-block; padding-left: 10px">
        <Select
          v-model="selectedAwayTeam"
          editable
          optionLabel="name"
          :options="teams"
          placeholder="Away team"
          class="w-full md:w-56"
        >
          <template #option="team">
            <span :class="[{ unstable: promotedTeams.includes(team.option.id) }]">
              {{ team.option.name }}
            </span>
          </template></Select
        >
      </div>
      <div style="display: inline-block; padding: 0 10px">
        <Button
          severity="success"
          label="Find"
          @click="sendMessage($event)"
          size="small"
          iconPos="right"
        />
      </div>
    </div>
    <hr />
  </div>
</template>

<style scoped>
.unstable {
  color: red;
}
.group-section {
  text-align: center;
  width: 80%;
  display: inline-block;
}
.queue-header {
  text-align: center;
  padding: 20px 0;
  margin-bottom: 5px;
}
.queue-page {
  text-align: center;
  width: 100%;
}
.queue-group {
  display: inline-block;
  margin: 2px;
  padding: 5px;
  padding-right: 10px;
  background-color: var(--tag-color-2nd);
  color: var(--text-color);
  font-size: 15px;
  border-radius: 5px;
}
.match {
  width: 80%;
}
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
}
</style>

<script>
import { getLeagues, getMatch, getTeams } from '../services/api.service'
export default {
  data() {
    return {
      statistics: [],
      leagues: [],
      teams: [],
      promotedTeams: [],
      selectedLeague: null,
      selectedHomeTeam: null,
      selectedAwayTeam: null
    }
  },
  created() {},
  methods: {
    async onLeagueChange(event) {
      this.selectedAwayTeam = this.selectedHomeTeam = null
      const data = await getTeams(this.selectedLeague)
      this.setTeams(data.teams)
      this.setPromotedTeams(data.promotedTeams)
    },
    setTeams(teams) {
      this.teams = [...new Set(teams)]
    },
    setPromotedTeams(teams) {
      this.promotedTeams = [...new Set(teams.map((team) => team.id))]
    },
    setLeagues(leagues) {
      this.leagues = leagues
    },
    async sendMessage() {
      this.setQueue((await getMatch()).data)

      this.done = false
    },
    setLeagues(leagues) {
      this.leagues = leagues
    }
  },
  async beforeRouteEnter(to, from, next) {
    const data = await getLeagues()
    next((vm) => {
      vm.setLeagues(data.leagues)
    })
  }
}
</script>
