<template>
  <div style="width: 100%">
    <div class="config" v-if="true">
      Search: <InputText type="text" v-model="filter" />
      <div class="mode">
        <input type="radio" id="absolute" name="absolute" value="absolute" v-model="mode" />
        <label for="absolute"> Absolute </label>

        <input type="radio" id="relative" name="relative" value="relative" v-model="mode" />
        <label for="relative"> Relative </label>
      </div>
      <Button
        class="download"
        severity="success"
        label="Download"
        @click="download($event)"
        size="small"
        icon="pi pi-download"
        iconPos="right"
      />
      <hr />
    </div>
    <div class="strategies">
      <div v-bind:key="predict.homeTeam" v-for="predict in predicts" class="strategy">
        <!-- method  -->
        <PredictionCard
          v-if="
            predict.homeTeam.toLowerCase().includes(filter.toLowerCase()) ||
            predict.awayTeam.toLowerCase().includes(filter.toLowerCase()) ||
            predict.league.toLowerCase().includes(filter.toLowerCase())
          "
          :homeTeam="predict.homeTeam"
          :awayTeam="predict.awayTeam"
          :odds="predict.odds"
          :mode="mode"
          :league="predict.league"
          :remove="remove.bind(this, predict._id)"
        ></PredictionCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.download {
  margin-left: 20px;
}
.strategy {
  width: 80%;
}
.strategies {
  justify-content: center;
  display: flex;
  flex-flow: wrap;
}
.config {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: var(--text-color-contrast);
}
.mode {
  display: inline-block;
  margin-left: 10px;
}
</style>

<script>
import { getPredicts, deletePredicted } from '@/services/api.service'
import PredictionCard from '../../components/predicted/PredictionCard.vue'
import { getUserId } from '../../services/user.service'
import { downloadFile } from '../../services/file.service'
export default {
  components: { PredictionCard },
  data() {
    return {
      mode: 'absolute',
      predicts: [],
      filter: ''
    }
  },
  methods: {
    setStrategy(predicts) {
      this.predicts = predicts
    },
    download() {
      downloadFile(getUserId())
    },
    async remove(id) {
      if (!window.confirm('Do you want to delete this item?')) return
      this.setStrategy((await deletePredicted(id, getUserId())).data)

      this.done = false
    }
  },
  async beforeRouteEnter(to, from, next) {
    const data = await getPredicts(getUserId())
    next((vm) => vm.setStrategy(data.data))
  }
}
</script>
