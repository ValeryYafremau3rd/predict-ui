<template>
  <div class="builder">
    <div class="group-header">
      Group name: <InputText type="text" v-model="groupName" />
      <Button
        class="save-Button"
        @click="save()"
        size="small"
        iconPos="right"
        label="Save"
        icon="pi pi-envelope"
      ></Button>
      <Button
        class="save-Button"
        label="Cancel"
        icon="pi pi-delete-left"
        @click="cancel()"
        size="small"
        severity="contrast"
        iconPos="right"
      ></Button>
    </div>
    <hr />
    <div style="text-align: center; width: 80%; display: inline-block; margin-top: 10px">
      <div class="odd-line" v-bind:key="odd._id" v-for="odd in odds">
        <input type="checkbox" :id="odd._id" name="odd._id" @change="check($event, odd._id)" />
        <label :for="odd._id">{{ odd.name }}</label>
      </div>
    </div>
    <hr />
    <div class="order-list">
      <div class="list-item" v-bind:key="odd._id" v-for="(odd, index) in selectedOdds">
        <div class="arrow" @click="move($event, true, index)">&#8593;</div>
        <div class="arrow" @click="move($event, false, index)">&#8595;</div>
        {{ odd.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  cursor: pointer;
}
.arrow {
  text-align: center;
  display: inline-block;
  height: 30px;
  width: 30px;
  border: 1px solid lightcyan;
  border-radius: 5px;
  cursor: pointer;
  background-color: tan;
  margin-right: 5px;
}
.remove-line {
  float: right;
}
.order-list {
  width: 80%;
  display: inline-block;
}
.list-item {
  text-align: left;
  padding: 10px 20px 10px;
  margin: 3px 10px 3px;
  background-color: var(--card-background-color);
  color: var(--text-color);
  font-size: 16px;
  border-radius: 10px;
}
.builder {
  width: 100%;
  text-align: center;
}
input[type='checkbox'] {
  margin-right: 10px;
  cursor: pointer;
}
.odd-line {
  display: inline-block;
  margin: 2px;
  padding: 5px 15px 5px;
  background-color: var(--tag-color-2nd);
  color: var(--text-color);
  border-radius: 5px;
}
.group-header {
  text-align: left;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  border-radius: 0;
  font-size: 20px;
  color: white;
  margin-bottom: 5px;
}
.save-Button {
  float: right;
  margin-left: 10px;
}
</style>

<script>
import { getUserId } from '@/services/user.service'
import { getGroup, createUpdateGroup, getEvents } from '@/services/api.service'
export default {
  data() {
    return {
      groupName: '',
      odds: null,
      selectedOdds: []
    }
  },
  methods: {
    cancel() {
      if (!window.confirm('Do you want to cancel all changes?')) return
      this.$router.push('/groups')
    },
    async save() {
      await createUpdateGroup(this.id, this.groupName, this.selectedOdds, getUserId())
      this.$router.push('/groups')
    },
    move($event, moveUp, index) {
      const item = { ...this.selectedOdds[index] }
      if (moveUp && index !== 0) {
        this.selectedOdds.splice(index, 1)
        this.selectedOdds.splice(index - 1, 0, item)
      } else if (!moveUp && index !== this.selectedOdds.length - 1) {
        this.selectedOdds.splice(index, 1)
        this.selectedOdds.splice(index + 1, 0, item)
      }
    },
    check($event, id) {
      if ($event.target.checked) {
        this.selectedOdds.push(this.odds.find((odd) => odd._id === id))
      } else {
        this.selectedOdds.splice(
          this.selectedOdds.findIndex((odd) => odd._id === id),
          1
        )
      }
    },
    setOdds(data) {
      this.odds = data
    },
    setEditMode(data) {
      this.groupName = data.name
      this.selectedOdds = [...data.items]
    }
  },
  async beforeRouteEnter(to, from, next) {
    let group = null
    if (to.params.id) {
      group = await getGroup(to.params.id)
    }
    const data = await getEvents(getUserId())
    next((vm) => {
      vm.setOdds(data.data)
      group && vm.setEditMode(group.data)
    })
  }
}
</script>
