<template>
  <div class="group-list">
    <div class="create-group-Button">
      <Button
        @click="navigateToCreate"
        iconPos="right"
        icon="pi pi-plus"
        label="New group"
      ></Button>
    </div>
    <div v-bind:key="line._id" v-for="line in groups" class="group">
      <div class="group-name">
        <div>
          {{ line.name }}
          <Button
            class="remove-Button"
            @click="remove($event, line._id)"
            size="small"
            iconPos="right"
            label="Remove"
            icon="pi pi-trash"
            severity="danger"
          ></Button>
          <Button
            class="edit-Button"
            @click="edit($event, line._id)"
            size="small"
            iconPos="right"
            icon="pi pi-pen-to-square"
            severity="secondary"
            label="Edit"
            disabled
          ></Button>
        </div>
        <hr />
        <div class="odd-item" v-bind:key="item._id" v-for="item in line.items">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group-list {
  width: 100%;
}
.create-group-Button {
  width: 100%;
  text-align: center;
  padding: 20px;
  background: transparent;
}
.edit-Button {
  float: right;
  margin-right: 10px;
}
.odd-item {
  display: inline-block;
  font-size: 12px;
  padding: 5px 7px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
  margin-left: 5px;
  background-color: var(--tag-color);
  color: initial;
  font-weight: 500;
  border-radius: 5px;
}
.group-name {
  padding: 10px;
  font-size: 18px;
  padding-left: 20px;
  background: var(--card-background-color);
  color: var(--text-color);
  border-radius: 10px;
}
.group {
  width: 80%;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
}
.remove-Button {
  float: right;
  margin-right: 10px;
}
</style>

<script>
import BuilderLineView from '../../components/events/EventBuilderLine.vue'
import PredictionCard from '../../components/predicted/PredictionCard.vue'
import { useRouter } from 'vue-router'
import { getUserId } from '../../services/user.service'
import { getGroups, deleteGroup } from '../../services/api.service'

const router = useRouter()
export default {
  components: { PredictionCard, BuilderLineView },
  data() {
    return {
      groups: []
    }
  },
  methods: {
    edit(event, id) {
      //this.$router.push(`/edit/${id}`)
    },
    navigateToCreate() {
      this.$router.push({ name: 'New group' })
    },
    async remove($event, id) {
      if (!window.confirm('Do you want to delete this item?')) return
      const data = await deleteGroup(id, getUserId())
      this.setGroupList(data.data)
    },
    setGroupList(list) {
      this.groups = list
    }
  },
  async beforeRouteEnter(to, from, next) {
    const data = await getGroups(getUserId())
    next((vm) => vm.setGroupList(data.data))
  }
}
</script>
