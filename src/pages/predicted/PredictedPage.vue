<template>
  <div class="w-full">
    <div class="text-center py-5 text-base text-[var(--text-color-contrast)]" v-if="true">
      Search: <InputText type="text" v-model="filter" />
      <div class="inline-block ml-2">
        <input type="radio" id="absolute" name="absolute" value="absolute" v-model="mode" />
        <label for="absolute"> Absolute </label>

        <input type="radio" id="relative" name="relative" value="relative" v-model="mode" />
        <label for="relative"> Relative </label>
      </div>
      <Button
        class="ml-5"
        severity="success"
        label="Download"
        @click="openDownloadModal($event)"
        size="small"
        icon="pi pi-download"
        iconPos="right"
      />
      <hr />
      <Button
        v-if="predicts.length"
        class="queue_Button mt-10"
        @click="remove_all($event)"
        severity="danger"
        label="Clear all"
        icon="pi pi-trash"
        size="small"
        iconPos="right"
      ></Button>
    </div>
    <div class="flex flex-wrap justify-center">
      <div v-bind:key="predict.homeTeam" v-for="predict in predicts" class="w-4/5">
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

    <DownloadConfirmModal v-model="isDownloadModalOpen" @confirm="onConfirmDownload" />
  </div>
</template>

<script>
import { getPredicts, deletePredicted, deleteAllPredicted } from '@/services/api.service'
import PredictionCard from '../../components/predicted/PredictionCard.vue'
import { getUserId } from '../../services/user.service'
import { downloadFile } from '../../services/file.service'
import DownloadConfirmModal from '../../components/modals/DownloadConfirmModal.vue'
export default {
  components: { PredictionCard, DownloadConfirmModal },
  data() {
    return {
      mode: 'relative',
      predicts: [],
      filter: '',
      isDownloadModalOpen: false
    }
  },
  methods: {
    setStrategy(predicts) {
      this.predicts = predicts
    },
    openDownloadModal() {
      this.isDownloadModalOpen = true
    },
    onConfirmDownload(payload) {
      this.download(payload)
      this.isDownloadModalOpen = false
    },
    download(payload) {
      downloadFile(getUserId(), payload)
    },
    async remove(id) {
      if (!window.confirm('Do you want to delete this item?')) return
      this.setStrategy((await deletePredicted(id, getUserId())).data)

      this.done = false
    },
    async remove_all() {
      if (!window.confirm('Do you want to delete all predictions?')) return
      this.setStrategy((await deleteAllPredicted(getUserId())).data)

      this.done = false
    }
  },
  async beforeRouteEnter(to, from, next) {
    const data = await getPredicts(getUserId())
    next((vm) => vm.setStrategy(data.data))
  }
}
</script>
