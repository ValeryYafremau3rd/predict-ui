<template>
  <div class="odd-list">
    <div class="create-button">
      <Button
        @click="navigateToCreate"
        iconPos="right"
        icon="pi pi-plus"
        label="New event"
      ></Button>
    </div>
    <div v-bind:key="line._id" v-for="line in customOdds" class="custom-odd">
      <div class="odd-list-item">
        {{ line.name }}
        <Button
          class="remove-button"
          @click="remove($event, line._id)"
          size="small"
          severity="danger"
          label="Remove"
          iconPos="right"
          icon="pi pi-trash"
        ></Button>
        <Button
          class="edit-button"
          @click="edit($event, line._id)"
          size="small"
          icon="pi pi-pen-to-square"
          severity="secondary"
          label="Edit"
          iconPos="right"
        ></Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.odd-list {
  width: 100%;
}
.create-button {
  text-align: center;
  padding: 20px;
  background: transparent;
}
.odd-list-item {
  background-color: var(--card-background-color);
  font-size: 18px;
  padding: 20px;
  margin: 10px;
  color: var(--text-color);
  border-radius: 10px;
}
.custom-odd {
  max-width: 80%;
  margin: auto;
  margin-bottom: 5px;
}
.edit-button {
  float: right;
  margin-right: 10px;
}
.remove-button {
  float: right;
  margin-right: 10px;
}
</style>

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
