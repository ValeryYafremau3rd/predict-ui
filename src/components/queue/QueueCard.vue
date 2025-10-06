<template>
  <div class="p-20 bg-card-100 text-auto-100 text-xl my-20 mx-auto text-left  w-4/5 rounded-[10px]">
    <div>
      <div class="status" v-if="status == 'in_progress'" style="color: green">
        Processing
        <i class="pi pi-spin pi-spinner"></i>
      </div>
      <div class="status failed" v-else-if="status == 'failed'">
        Failed
        <i class="pi pi-times"></i>
      </div>
      <div class="status finished" v-else-if="status == 'finished'">
        Done
        <i class="pi pi-check"></i>
      </div>
      <div class="status queued" v-else>
        Queued
        <i class="pi pi-list"></i>
      </div>
      {{ homeTeam }} - {{ awayTeam }}
      <Button
        class="queue_Button"
        @click="deleteMatch($event, id)"
        severity="danger"
        label="Remove"
        icon="pi pi-trash"
        size="small"
        iconPos="right"
      ></Button>
    </div>
    <hr class="my-10"/>
    <div class="odd-item" v-bind:key="selectedGroup._id" v-for="selectedGroup in selectedGroups">
      {{ selectedGroup.name }}
    </div>
  </div>
</template>

<style scoped>
.failed {
  color: red;
  background-color: darksalmon;
  background: lightcoral;
}
.finished {
  color: green;
  background-color: darkseagreen;
  background: lightgreen;
}
.in-progress {
  background: rgb(241, 239, 149);
}
.queued {
  color: grey;
  background-color: wheat;
}

.status {
  background-color: palegoldenrod;
  font-size: 13px;
  display: inline-block;
  padding: 2px 10px;
  border-radius: 20px;
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
hr {
  margin-top: 10px;
}
.queue_Button {
  margin-left: 20px;
  float: right;
}
</style>

<script>
export default {
  props: ['homeTeam', 'awayTeam', 'deleteMatch', 'selectedGroups', 'id', 'status'],
  data() {
    return {}
  },
  methods: {}
}
</script>
