import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQueueStore = defineStore('queue', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
