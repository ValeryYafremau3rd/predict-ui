<template>
  <VueFinalModal
    :model-value="modelValue"
    @update:modelValue="(v) => $emit('update:modelValue', v)"
    class="flex justify-center items-center"
    content-class="flex flex-col w-1/2 mx-auto p-[20px] bg-white border border-[var(--border-color)] rounded-[7px]"
    :content-style="{ backgroundColor: '#ffffff' }"
    :esc-to-close="true"
    :click-to-close="true"
  >
    <h3 class="font-bold text-[#000] text-[1.35rem]">Choose results to download</h3>

    <!-- Leagues selection -->
    <div class="mt-3 max-h-[500px] overflow-auto border border-[var(--border-color)] rounded-md p-[10px]">
      <div class="flex items-center justify-between mb-[10px]">
        <div class="text-sm font-bold text-[#000] text-[1.2em]">Select leagues</div>
        <label class="inline-flex items-center gap-2 text-[#000] text-sm">
          <input
            type="checkbox"
            :checked="leagues.length > 0 && selectedLeagues.length === leagues.length"
            @change="toggleAllLeagues($event.target.checked)"
          />
          <span>Select all</span>
        </label>
      </div>
      <div v-if="leagues.length === 0" class="text-sm text-gray-500">Loading...</div>
      <div v-else class="flex flex-wrap gap-2">
        <label v-for="(league, idx) in leagues" :key="`league-${idx}`" class="inline-flex items-center gap-2 text-[#000] mr-[10px]">
          <input type="checkbox" :value="league" v-model="selectedLeagues" />
          <span>{{ league }}</span>
        </label>
      </div>
    </div>

    <!-- Event Groups selection -->
    <div class="mt-3 max-h-[500px] overflow-auto border border-[var(--border-color)] rounded-md p-[10px]">
      <div class="flex items-center justify-between mb-[10px]">
        <div class="text-sm font-bold text-[#000] text-[1.2em]">Select event groups</div>
        <label class="inline-flex items-center gap-2 text-[#000] text-sm">
          <input
            type="checkbox"
            :checked="eventGroups.length > 0 && selectedEventGroups.length === eventGroups.length"
            @change="toggleAllEventGroups($event.target.checked)"
          />
          <span>Select all</span>
        </label>
      </div>
      <div v-if="eventGroups.length === 0" class="text-sm text-gray-500">Loading...</div>
      <div v-else class="flex flex-wrap gap-2">
        <label v-for="group in eventGroups" :key="group._id" class="inline-flex items-center gap-2 text-[#000] mr-[10px]">
          <input type="checkbox" :value="group" v-model="selectedEventGroups" />
          <span>{{ group.name }}</span>
        </label>
      </div>
    </div>

    <div class="mt-3 text-[#000] text-[1.2em]">Predicts found: {{ matchesCount }}</div>

    <div class="min-h-[20px]"></div>
    <div class="flex items-center justify-end gap-2 mt-4">
      <Button
        label="Cancel"
        size="small"
        severity="secondary"
        icon="pi pi-times"
        @click="$emit('update:modelValue', false)"
      />
      <Button
        label="Download"
        size="small"
        severity="success"
        icon="pi pi-download"
        @click="$emit('confirm', { leagues: selectedLeagues, groups: selectedEventGroups.map(g => g.name) })"
      />
    </div>
  </VueFinalModal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'
import { getLeagues, getGroups } from '@/services/api.service'
import { getUserId } from '@/services/user.service'
export default {
  name: 'DownloadConfirmModal',
  components: { VueFinalModal },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'confirm'],
  data() {
    return {
      leagues: [],
      selectedLeagues: [],
      eventGroups: [],
      selectedEventGroups: [],
      debounceTimer: null,
      initialReady: false,
      matchesCount: 0
    }
  },
  watch: {
    selectedLeagues: {
      deep: true,
      handler() {
        if (!this.initialReady) return
        this.triggerCountDebounced()
      }
    },
    selectedEventGroups: {
      deep: true,
      handler() {
        if (!this.initialReady) return
        this.triggerCountDebounced()
      }
    }
  },
  methods: {
    toggleAllLeagues(checked) {
      this.selectedLeagues = checked ? [...this.leagues] : []
    },
    toggleAllEventGroups(checked) {
      this.selectedEventGroups = checked ? [...this.eventGroups] : []
    },
    triggerCountDebounced() {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer)
      }
      this.debounceTimer = setTimeout(async () => {
        try {
          const res = await fetch(import.meta.env.VITE_BASE_URL + 'predicted/number', {
            method: 'POST',
            headers: {
              Authorization: getUserId(),
              'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
              leagues: this.selectedLeagues,
              groups: this.selectedEventGroups.map(g => g.name)
            })
          })
          let json
          try {
            json = await res.json()
          } catch (e) {
            json = null
          }
          const parsed = Number(json?.data)
          this.matchesCount = Number.isFinite(parsed) ? parsed : 0
        } catch (e) {
          this.matchesCount = 0
        }
      }, 1000)
    }
  },
  async created() {
    try {
      const [groupsResp, leaguesResp] = await Promise.all([
        getGroups(getUserId()),
        getLeagues()
      ])
      this.eventGroups = groupsResp?.data || []
      this.leagues = leaguesResp?.leagues || []
      // Preselect all by default
      this.selectedLeagues = [...this.leagues]
      this.selectedEventGroups = [...this.eventGroups]
      this.initialReady = true
    } catch (e) {
      this.eventGroups = []
      this.leagues = []
      this.initialReady = true
    }
  }
}
</script> 