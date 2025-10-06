<template>
  <div class="w-full ">
    <div class="text-center py-5 bg-transparent">
      <Button
        class="!bg-main-3 !text-main-1 !rounded-none !border-3 !border-b-5 !border-l-5 !border-contrast-2"
        @click="navigateToCreate"
        iconPos="right"
        icon="pi pi-plus"
        label="New event"
      ></Button>
    </div>
    <div class="flex flex-row items-center flex-wrap align-end">
      <div
        v-for="line in customOdds"
        :key="line._id"
        class="w-11/23 relative mb-1 bg-main-3 border-y-contrast-1 text-main-3 b-3 text-lg p-3 pl-17 m-5 flex items-left justify-between border-l-5 border-b-3 [&:nth-child(3n-2)]:border-2 [&:nth-child(3n)]:bg-main-4 [&:nth-child(3n-1)]:border-main-5 [&:nth-child(5n)]:border-main-1 [&:nth-child(5n)]:border-3 [&:nth-child(5n)]:m-[13px] [&:nth-child(5n)]:bg-main-5 [&:nth-child(7n)]:bg-contrast-2 [&:nth-child(3n-2)]:left-7 [&:nth-child(5n-4)]:right-7"
      >
        <span class="text-main-1 font-bold text-[17px]">{{ line.name }}</span>
        <div class="flex gap-2">
          <Button
            class=" mt-1 !bg-transparent !border-none !text-main-1 !border-contrast-1 !rounded-none !border-b-5 !border-l-5"
            @click="edit($event, line._id)"
            size="small"
            icon="pi pi-pen-to-square"
            severity="secondary"
            label="Edit"
            iconPos="right"
          ></Button>
          <Button
            class=" mt-7  !bg-contrast-1 !border-3 !border-main-4 !text-main-1 !rounded-none !border-b-5 !border-l-5"
            @click="remove($event, line._id)"
            size="small"
            severity="danger"
            label="Remove"
            iconPos="right"
            icon="pi pi-trash"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBuilderLine from '../../components/events/EventBuilderLine.vue' // remove?
import PredictionCard from '../../components/predicted/PredictionCard.vue'
import { useRouter } from 'vue-router'
import { getUserId } from '../../services/user.service'
import { deleteEvent, getEvents } from '../../services/api.service'

const router = useRouter()
export default {
  components: { PredictionCard, EventBuilderLine },
  data() {
    return {
      customOdds: []
    }
  },
  methods: {
    navigateToCreate() {
      this.$router.push('/create')
    },
    addLine() {
      this.lines.push(this.defaultLine)
      this.lineId++
    },
    edit(event, id) {
      this.$router.push(`/edit/${id}`)
    },
    saveOdd(ev, lines) {},
    getLine(index, type, value, preffix, operator, stat) {
      line = { type }
      if (index != 0) line.operator = operator
      if (type == 'value') {
        line.value = value
      } else if (type == 'stat') {
        line.preffix = preffix
        line.stat = stat
      }
      return line
    },
    async remove($event, id) {
      if (!window.confirm('Do you want to delete this item?')) return
      const data = await deleteEvent(id, getUserId())
      this.setOddList(data.data)
    },
    setOddList(list) {
      this.customOdds = list
    }
  },
  async beforeRouteEnter(to, from, next) {
    const data = await getEvents(getUserId())
    next((vm) => vm.setOddList(data.data))
  }
}
</script>
