<template>
  <h1>Match: {{ $route.params.id }}</h1>
  <br />
  <ul>
    <span>{{ data.team1.team.name }}</span>
    <li v-for="stat in data.team1.statistics" :key="stat.type">
      {{ stat.type }} : {{ stat.value }}
    </li>
  </ul>
  <ul>
    <span>{{ data.team2.team.name }}</span>
    <li v-for="stat in data.team2.statistics" :key="stat.type">
      {{ stat.type }} : {{ stat.value }}
    </li>
  </ul>
</template>

<style></style>

<script>
import { getMatches } from '../services/api.service'
export default {
  data() {
    return {
      data: null
    }
  },
  methods: {
    setPost(post) {
      this.data = post
    }
  },
  async beforeRouteEnter(to, from, next) {
    const data = await getMatches(to.params.id)
    next((vm) => vm.setPost(data))
  }
}
</script>
