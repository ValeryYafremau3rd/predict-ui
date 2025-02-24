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
      <div class="search-field">
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
      <div class="search-field">
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
      <div class="search-field">
        <Button
          severity="success"
          label="Add to queue"
          @click="sendMessage($event)"
          size="small"
          iconPos="right"
        />
      </div>
      <div></div>
    </div>
    <div class="group-section">
      <div class="queue-group" v-bind:key="group._id" v-for="group in groups">
        <input
          type="checkbox"
          :id="group._id"
          name="group._id"
          @change="check($event, group._id)"
        />
        <label :for="group._id">{{ group.name }}</label>
      </div>
    </div>
    <hr />
    <div class="container">
      <div v-bind:key="line" v-for="line in queue">
        <QueueCard
          :status="line.status"
          :homeTeam="line.homeTeam.name"
          :awayTeam="line.awayTeam.name"
          :deleteMatch="deleteMatch"
          :id="line._id"
          :selectedGroups="line.groups"
          class="match"
        ></QueueCard>
      </div>
    </div>
  </div>
</template>

<style>
.search-field {
  display: inline-block;
  padding-left: 10px;
}
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

input[type='checkbox'] {
  margin: 5px;
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
import { getUserId } from '../../services/user.service'
import QueueCard from '../../components/queue/QueueCard.vue'
import {
  deleteFromQueue,
  getGroups,
  getLeagues,
  getQueue,
  getTeams,
  addToQueue
} from '@/services/api.service'
export default {
  components: { QueueCard },
  data() {
    return {
      leagues: [],
      teams: [],
      promotedTeams: [],
      selectedLeague: null,
      selectedHomeTeam: null,
      selectedAwayTeam: null,
      loading: false,
      queue: [],
      groups: [],
      selectedGroups: []
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
    setPost(post) {
      this.data = post
    },
    check($event, id) {
      if ($event.target.checked) {
        this.selectedGroups.push(this.groups.find((group) => group._id === id))
      } else {
        this.selectedGroups.splice(
          this.selectedGroups.findIndex((group) => group._id === id),
          1
        )
      }
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
    async deleteMatch(ev, id) {
      if (!window.confirm('Do you want to delete this item?')) return
      this.setQueue((await deleteFromQueue(id, getUserId())).data)

      this.done = false
    },
    async sendMessage() {
      this.setQueue(
        (
          await addToQueue(
            this.selectedHomeTeam,
            this.selectedAwayTeam,
            this.selectedGroups,
            getUserId()
          )
        ).data
      )

      this.done = false
    },
    setStat(line) {
      this.statLines.push(line)
    },
    setBet(line) {
      this.betLines.push(line)
    },
    setQueue(queue) {
      this.queue = queue
    },
    setGroups(groups) {
      this.groups = groups
    }
  },
  async beforeRouteEnter(to, from, next) {
    const [groups, data] = await Promise.all([getGroups(getUserId()), getLeagues()])
    const queue = (await getQueue(getUserId()))['data']
    next((vm) => {
      vm.setLeagues(data.leagues)
      vm.setGroups(groups.data)
      vm.setQueue(queue)
    })
  }
}
</script>
